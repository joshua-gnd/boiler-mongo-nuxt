const express = require('express');
const router = express.Router();
// const Course = require('../models/Course')
// const Student = require('../models/Student')
const Todo = require('../../models/Todo')
// const Priorities = require('../../models/Priority')

// get todos
router.get('/', async (req, res) => {
    let todo = await Todo.find()
    res.send(todo)
})

// get todo
router.get('/:id', async function (req, res) {
    try {
        let todo = await Todo.findOne({ _id: req.params.id })
        res.send(todo)
    } catch (e) {
        res.status(404).send(e.message)
    }
});

// add todo
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create(req.body)
        res.send(todo);

    } catch (e) {
        res.status(442).send(e.message);
    }
})

// update todo
router.put('/:id', async function (req, res) {
    try {
        console.log(req.body)
        let todo = await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body)
        todo = await Todo.findOne({ _id: req.params.id })
        res.send(todo)
    }
    catch (e) {
        res.send(e.message)
    }
});

// delete todo
router.delete('/:id', async (req, res) => {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id })
    res.status(200).send(todo);
})

module.exports = router









// **
// example
// **
router.get('/students', async function (req, res) {
    let student = await Student.find().populate('course', 'name')
    res.send(student)

});

router.get('/courses', async function (req, res) {
    let course = await Course.find().populate('students')
    res.send(course)

});

router.get('/courses/:id', async function (req, res) {
    try {
        let course = await Course.findOne({ _id: req.params.id })
        res.send(course)
    } catch (e) {
        res.status(404).send(e.message)
    }
});

router.post('/courses', async function (req, res,) {
    try {
        const course = await Course.create(req.body)
        res.send(course);

    } catch (e) {
        res.status(442).send(e.message);
    }
});

router.post('/students', async function (req, res,) {
    try {
        const student = await Student.create(req.body)//creates a new student

        const courses = student.course// all the course id's in the student's course field is stored in the "courses" variable as an array


        courses.map(findIds)//uses the map function to carry out the "findIdS" function on each course id in the in the "courses" array

        async function findIds(id) { //function takes in an id parameter
            const course = await Course.findOne({ _id: id })//uses the id to find a course in the course collection. the course is then stored in the "course" variable
            course.students.push(student)// the student is added to the "students" field of the course found in the line above (push is used since "students" is an array field)
            await course.save() // saves the updated course 
        }

        res.send(student);//responds with the created student 

    } catch (e) {
        res.status(442).send(e.message);
    }
});

router.put('/courses/:id', async function (req, res) {
    try {
        let course = await Course.findByIdAndUpdate({ _id: req.params.id }, req.body)
        course = await Course.findOne({ _id: req.params.id })
        res.send(course)
    }
    catch (e) {
        res.send(e.message)
    }

});

router.delete('/courses/:id', async function (req, res) {
    try {
        const course = await Course.findByIdAndRemove({ _id: req.params.id })
        res.send(course)
    } catch (e) {
        res.status(404).send(e.message)
    }

});

router.delete('/students/:id', async function (req, res) {
    try {
        const student = await Student.findByIdAndRemove({ _id: req.params.id })
        res.send(student)
    } catch (e) {
        res.status(404).send(e.message)
    }

});

// module.exports = router;




