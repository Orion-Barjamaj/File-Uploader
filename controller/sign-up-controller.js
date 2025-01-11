const queries = require('../db/prismaQueries');
var bcrypt = require('bcryptjs');
const { body, matchedData, validationResult } = require('express-validator');


module.exports = {
    get: (req, res) => {
        res.render('signup', {errors: {}, username: req.body.username, password: req.body.password, confrimPassword: req.body.confirmPassword});
    },
    post: [ body('username')
            .trim()
            .notEmpty()
            .escape()
            .withMessage("Username cannot be empty!"),
            body('password')
            .trim()
            .isLength({ min: 8})
            .withMessage("Password must be at least 8 characters long!"),
            body("confirmPassword")
            .trim()
            .custom((value, { req }) => {
                if(value !== req.body.password){
                    throw new Error("Passwords must match!")
                }
                return true;
            }), async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const data = matchedData(req);
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if(err){
                    res.redirect('/');
                }else{
                    await queries.addUser(data.username, hashedPassword);
                    res.redirect('/log-in')
                }
            });
        }else {
            console.log(result.mapped());
            res.render('signup', {errors: result.mapped(), username: req.body.username, password: req.body.password, confrimPassword: req.body.confirmPassword});  
        }   
    }]
}