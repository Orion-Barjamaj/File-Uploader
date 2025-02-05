const express = require('express');
const router = express.Router();
const controller = require('../controller/home-controller');
const isAuth = require('./authMiddleware').isAuth;

router.get('/home', isAuth, controller.get);
router.get('/home/:id', isAuth, controller.get);
router.post('/home/:id', isAuth, controller.createFolder);
router.post('/home', isAuth, controller.createFolder);
router.post('/home/:id/file', isAuth, controller.createFile);
router.post('/home/file', isAuth, controller.createFile);
router.post('/home/download/:id', isAuth, controller.downloadFile);
router.post('/home/delete/:id', isAuth, controller.deleteFile);

module.exports = router;