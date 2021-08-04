const mongoose = require('mongoose', { useUnifiedTopology: true });
const Schema = mongoose.Schema

const PrioritySchema = new Schema({
    1: [Array, 'do task now; it is urgent and important'],
    // 2: [Array, 'schedule a time to do task; it is not urgent, but important'],
    // 3: [Array, 'delegate task to someone else; it is urgent, but not important'],
    // 4: [Array, 'delete task; it is neither urgent nor important']
    task1: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    task2: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    task3: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    task4: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
}),

    Priority = mongoose.model('priority', PrioritySchema)

module.exports = Priority;