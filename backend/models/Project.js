const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        skills: {
            type: [String],
            default: []
        },

        budget: {
            type: Number,
            required: true
        },

        deadline: {
            type: Date,
            required: true
        },

        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["Open", "In Progress", "Completed"],
            default: "Open"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Project", projectSchema);