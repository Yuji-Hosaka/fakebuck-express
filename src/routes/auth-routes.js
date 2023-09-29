const express = require('express')
const authController = require('../controller/auth-controller')
const authenticatedMiddleware = require('../middlewares/authenticate')
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
// router.use(authenticatedMiddleware)
router.get('/me', authenticatedMiddleware, authController.getMe)

module.exports = router