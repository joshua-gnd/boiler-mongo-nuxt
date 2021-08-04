const mongoose = require('mongoose', { useUnifiedTopology: true });
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    task: {
        type: String,
        required: [true, "add todo"]
    },
    completed: { type: Boolean, default: false },
    priority: String,
    createdAt: { type: Date, default: Date.now }
}),

    Todo = mongoose.model('todo', TodoSchema)

module.exports = Todo;





// // first example
// const CourseSchema1 = new Schema({
//     name: {
//         type: String,
//         required: [true, "please add a name"]

//     },
//     level: Number,
//     description: String,
//     students: [{
//         type: Schema.Types.ObjectId,
//         ref: 'student'
//     }]

// }),

//     Course = mongoose.model('course', CourseSchema1)

// // module.exports = Course;

// // second example
// const StudentSchema2 = new Schema({
//     first_name: {
//         type: String,
//         required: [true, "please add a name"]

//     },
//     last_name: {
//         type: String,
//         required: [true, "please add a lastname"]

//     },
//     course: [{
//         type: Schema.Types.ObjectId,
//         ref: 'course'
//     }]





// }),

//     Student = mongoose.model('student', StudentSchema2)

// // module.exports = Student;