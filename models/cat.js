const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    contents: { type: String, required: false },
    link: { type: String, required: false },
    views: { type: Number, required: false, default: 0 },
    date: { type: Date, required: false },
    image: { type: String }
}, { versionKey: false })

module.exports = mongoose.model('Cat', catSchema, 'cats')