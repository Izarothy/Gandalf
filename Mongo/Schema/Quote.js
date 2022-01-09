const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Quote',
  new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
  })
);
