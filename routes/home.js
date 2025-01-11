const express = require('express');
const router = express.Router();
const controller = require('../controller/home-controller');
const isAuth = require('./authMiddleware').isAuth;

router.get('/home', isAuth, controller.get)

module.exports = router;