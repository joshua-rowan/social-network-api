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
            maxLength: 280
        },

        userName: [
            {
            type: String,
            required: true,
            ref: "User"
        }
    ],

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