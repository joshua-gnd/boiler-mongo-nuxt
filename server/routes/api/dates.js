const express = require('express');
const router = express.Router();
const Date = require('../../models/Date')

// get dates
router.get('/', async (req, res) => {
    let date = await Date.find()
    res.send(date)
})

// get date
router.get('/:id', async function (req, res) {
    try {
        let date = await Date.findOne({ _id: req.params.id })
        res.send(date)
    } catch (e) {
        res.status(404).send(e.message)
    }
});

// add date
router.post('/', async (req, res) => {
    try {
        const date = await Date.create(req.body)
        res.send(date);

    } catch (e) {
        res.status(442).send(e.message);
    }
})

// update date
router.put('/:id', async function (req, res) {
    try {
        let date = await Date.findByIdAndUpdate({ _id: req.params.id }, req.body)
        date = await Date.findOne({ _id: req.params.id })
        res.send(date)
    }
    catch (e) {
        res.send(e.message)
    }
});

// delete date
router.delete('/:id', async (req, res) => {
    const date = await Date.findOneAndDelete({ _id: req.params.id })
    res.status(200).send(date);
})

module.exports = router