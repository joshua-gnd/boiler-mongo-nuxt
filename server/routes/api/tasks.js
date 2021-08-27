const express = require('express');
const router = express.Router();
const Task = require('../../models/Task')
const Rating = require('../../models/Task')

// get tasks
router.get('/', async (req, res) => {
    let task = await Task.find()
    res.send(task)
})

// get task
router.get('/:id', async function (req, res) {
    try {
        let task = await Task.findOne({ _id: req.params.id })
        res.send(task)
    } catch (e) {
        res.status(404).send(e.message)
    }
});

// add task
router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.send(task);

    } catch (e) {
        res.status(442).send(e.message);
    }
})

// update task
router.put('/:id', async function (req, res) {
    try {
        let task = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body)
        task = await Task.findOne({ _id: req.params.id })
        res.send(task)
    }
    catch (e) {
        res.send(e.message)
    }
});

// delete task
router.delete('/:id', async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id })
    res.status(200).send(task);
})

module.exports = router