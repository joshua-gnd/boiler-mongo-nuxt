const mongoose = require('mongoose', { useUnifiedTopology: true });
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    rating: {
        type: Number,
        default: 0
    },
    id: Number,
    date: {
        type: Schema.Types.ObjectId,
        ref: 'date',
        autopopulate: true
    }
}).plugin(require('mongoose-autopopulate'));

    Rating = mongoose.model('rating', RatingSchema)

module.exports = Rating;