const mongoose = require('mongoose', { useUnifiedTopology: true });
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    rating: {
        type: Number,
        default: 0
    },
    id: Number
}),

    Rating = mongoose.model('rating', RatingSchema)

module.exports = Rating;