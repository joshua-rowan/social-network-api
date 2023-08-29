const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id }},
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with that Id'})
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err){
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});

            if (!thought) {
                res.status(404).json({ message: "No thought with that Id!" });
            }
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async postReaction(req, res) {
        console.log('You are adding a reaction.');
        console.log(req.body);
        try {

            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that Id.' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId});

            if (!reaction) {
                res.status(404).json({ message: "No reaction with that Id!" });
            }
            res.json({ message: 'Reaction deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};