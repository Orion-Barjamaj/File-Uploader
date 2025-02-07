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
router.post('/download/:id', isAuth, controller.downloadFile);
router.post('/delete/:id', isAuth, controller.deleteFile);
router.post('/deleteFolder/:id', isAuth, controller.deleteFolder);

module.exports = router;