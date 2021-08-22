const mongoose = require('mongoose', { useUnifiedTopology: true });
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name: {
        type: String,
        required: [true, "add Task"]
    },
    category: { type: String, default: "Other" },
    ratings: [{
        id: Number,
        rating: Number
    }],
    // createdAt: { type: Date, default: Date.now }
}),

    Task = mongoose.model('task', TaskSchema)

module.exports = Task;