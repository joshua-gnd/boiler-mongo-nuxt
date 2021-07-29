const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray())
})

// add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    // console.log(new mongodb.ObjectID(`${req.params.id}`))
    await posts.findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) })
    res.status(200).send();
})


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://admin:password100@cluster0.ssyro.mongodb.net/Test?retryWrites=true&w=majority',
        { useNewUrlParser: true }
    )

    return client.db('Test').collection('posts');
}

module.exports = router