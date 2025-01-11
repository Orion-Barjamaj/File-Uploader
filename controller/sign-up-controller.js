const queries = require('../db/prismaQueries');
var bcrypt = require('bcryptjs');

module.exports = {
    get: (req, res) => {
        res.render('signup');
    },
    post: async (req, res) => {
        const { username } = req.body;
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if(err){
                res.redirect('/');
            }else{
                await queries.addUser(username, hashedPassword);
                res.redirect('/log-in')
            }
        });
    }
}