const express = require('express');
const router = express.Router();
const Priority = require('../../models/Priority')



//add priority
router.post('/', async (req, res) => {
    try {
        const priority = await Priority.create(req.body)

        const priorities = priority.priority
        priorities.map(findIds)


        // async function findIds(id) { //function takes in an id parameter
        //     const course = await Course.findOne({ _id: id })//uses the id to find a course in the course collection. the course is then stored in the "course" variable
        //     course.students.push(student)// the student is added to the "students" field of the course found in the line above (push is used since "students" is an array field)
        //     await course.save() // saves the updated course 
        // }


        res.send(priority);

    } catch (e) {
        res.status(442).send(e.message);
    }
})

module.exports = router