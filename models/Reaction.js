const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLentght: 280
        },

        username: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

module.exports = reactionSchema;