const mongoose = require('mongoose', { useUnifiedTopology: true });
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name: {
        type: String,
        required: [true, "add Task"]
    },
    category: { type: String, default: "Other" },
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: 'rating',
        autopopulate: true
    }]
}).plugin(require('mongoose-autopopulate'));

Task = mongoose.model('task', TaskSchema)

module.exports = Task;