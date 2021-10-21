const mongoose = require('mongoose')

const actorDirectorSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  male: Boolean,
  birthDate: String,
})

module.exports = {
  director: mongoose.model('director', actorDirectorSchema),
  actor: mongoose.model('director', actorDirectorSchema),
}
