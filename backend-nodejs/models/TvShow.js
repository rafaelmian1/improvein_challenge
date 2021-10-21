const mongoose = require('mongoose')

const episodeSchema = mongoose.Schema({
  episodeNumber: Number,
  title: String,
  description: String,
  duration: Number,
  actors: [{ type: mongoose.Types.ObjectId, ref: 'actor' }],
  directors: [{ type: mongoose.Types.ObjectId, ref: 'director' }],
})

const seasonSchema = mongoose.Schema({
  seasonNumber: Number,
  episodes: [episodeSchema],
  year: Number,
})

const tvShowSchema = mongoose.Schema({
  title: { type: String, required: true },
  foreword: String,
  actors: [{ type: mongoose.Types.ObjectId, ref: 'actor' }],
  director: { type: mongoose.Types.ObjectId, ref: 'director' },
  seasons: [seasonSchema],
})

module.exports = mongoose.model('tv show', tvShowSchema)
