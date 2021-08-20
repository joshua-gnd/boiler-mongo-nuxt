const mongoose = require('mongoose', { useUnifiedTopology: true });
const Schema = mongoose.Schema

const DateSchema = new Schema({
        id: String,
        month: String,
        date: Number,
        day: String
}),

    Date = mongoose.model('date', DateSchema)

module.exports = Date;