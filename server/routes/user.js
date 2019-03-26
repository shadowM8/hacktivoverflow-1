const router = require('express').Router()
const Controller = require('../controllers/user')

router.post('/register',Controller.register)
router.post('/login', Controller.login)
router.get('/', Controller.findAll)
module.exports = router