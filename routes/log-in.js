const express = require("express");
const router = express.Router();
const controller = require("../controller/log-in-controller");
const passport = require("passport");

router.get('/log-in', controller.get);
router.post('/log-in',
  passport.authenticate('local', { failureRedirect: '/log-in' }),
  function(req, res) {
    res.redirect('/home');
});
  
router.get('/log-out', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});  

module.exports = router;