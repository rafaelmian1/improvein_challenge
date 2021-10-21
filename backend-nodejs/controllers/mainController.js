const Movie = require('../models/Movie')
const TvShow = require('../models/TvShow')
const jwt = require('jsonwebtoken')

const mainController = {
  signToken: (req, res) => {
    let token = jwt.sign({ ...req.body }, process.env.SECRETORKEY)
    res.json({ success: true, token })
  },

  verifyToken: (req, res) => {
    res.json({ verified: true, username: req.user.name })
  },

  refreshToken: (req, res) => {
    const newToken = jwt.sign({}, process.env.SECRETORKEY)
    res.json({ success: true, token: newToken })
  },

  getMovies: async (req, res) => {
    let { ...query } = require('url').parse(req.url, true).query
    let year = query.year ? { year: parseInt(query.year) } : {}
    try {
      let movies = await Movie.find(year)
      res.json({ success: true, movies })
    } catch (err) {
      res.json({ success: false, error: err.message })
    }
  },

  getEpisode: async (req, res) => {
    const _id = req.params.id
    const query = require('url').parse(req.url, true).query
    let { season, episode } = { ...query }
    try {
      let tvShow = await TvShow.findOne({ _id }).populate({ path: 'seasons.episodes.directors', model: 'director' })
      if (!tvShow) return res.json({ success: false, error: 'TV Show not found' })
      episode = tvShow.seasons.find((s) => s.seasonNumber == season).episodes.find((e) => e.episodeNumber == episode)
      return res.json({ success: true, episode })
    } catch (err) {
      res.json({ success: false, error: err.message })
    }
  },

  addMovie: async (req, res) => {
    const { title, foreword, duration, actors, director } = req.body
    try {
      let newMovie = new Movie({ title, foreword, duration, actors, director })
      await newMovie.save()
      res.json({ success: true, movie: newMovie })
    } catch (err) {
      res.json({ success: false, error: err.message })
    }
  },
}

module.exports = mainController
