const express = require('express');
const router = express.Router();
const Rating = require('../../models/Rating')
const Task = require('../../models/Task')

// get ratings
router.get('/', async (req, res) => {
    let rating = await Rating.find()
    res.send(rating)
})

// get rating
router.get('/:id', async function (req, res) {
    try {
        let rating = await Rating.findOne({ _id: req.params.id })
        res.send(rating)
    } catch (e) {
        res.status(404).send(e.message)
    }
});

// add rating
// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body)
//         const rating = await Rating.create(req.body)
//         res.send(rating);

//     } catch (e) {
//         res.status(442).send(e.message);
//     }
// })

// add rating
router.post('/:id', async (req, res) => {
    try {
        let rating = await Rating.create(req.body)
        let task = await Task.findOne({ _id: req.params.id })
        task.ratings.push(rating.populate('rating'))
        await task.save()
        task = await Task.findOne({ _id: req.params.id })
        res.send(task)
    } catch (e) {
        res.status(442).send(e.message);
    }
})

// update rating
router.put('/:id', async function (req, res) {
    try {
        let rating = await Rating.findByIdAndUpdate({ _id: req.params.id }, req.body)
        rating = await Rating.findOne({ _id: req.params.id })
        res.send(rating)
    }
    catch (e) {
        res.send(e.message)
    }
});

// delete rating
router.delete('/:id', async (req, res) => {
    const rating = await Rating.findOneAndDelete({ _id: req.params.id })
    res.status(200).send(rating);
})

module.exports = router