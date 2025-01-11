const express = require('express');
const router = express.Router();
const controller = require('../controller/sign-up-controller');

router.get('/sign-up', controller.get);
router.post('/sign-up', controller.post);

module.exports = router;