const router = require('express').Router()
const Controller = require('../controllers/user')
const auth = require('../middlewares/auth')

router.post('/register',Controller.register)
router.post('/login', Controller.login)
router.get('/', Controller.findAll)
router.use(auth)
router.get('/user-info', Controller.getProfile)
router.get('/see-watched-tags', Controller.seeWatchedTags)
router.patch('/edit-tags', Controller.editwatchedTags)
module.exports = router