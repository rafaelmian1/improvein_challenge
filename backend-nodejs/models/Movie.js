const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  foreword: String,
  duration: Number,
  actors: [{ type: mongoose.Types.ObjectId, ref: 'actor' }],
  director: { type: mongoose.Types.ObjectId, ref: 'director' },
})

module.exports = mongoose.model('movie', movieSchema)
