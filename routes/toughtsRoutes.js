const express = require("express")
const router = express.Router()
const ToughtsController = require('../controllers/ToughtController')

//midleware
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtsController.createTought)
router.post('/add', checkAuth, ToughtsController.createToughtPost)
router.get('/dashboard', checkAuth,  ToughtsController.dashboard)
router.get('/', ToughtsController.showToughts)


module.exports = router