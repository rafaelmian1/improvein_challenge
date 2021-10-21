const express = require('express')
const router = express.Router()
const passport = require('passport').authenticate('jwt', { session: false })
const mainController = require('../controllers/mainController')

router.route('/signToken').post(mainController.signToken)
router.route('/authenticate').get(passport, mainController.verifyToken)
router.route('/refresh-token').get(passport, mainController.refreshToken)
router.route('/episodes').get(passport, mainController.getEpisode)
router.route('/movies').get(passport, mainController.getMovies)
router.route('/add-actor').post(passport, mainController.addMovie)

module.exports = router
