module.exports = {
    get: (req,res) => {
        console.log("User ->>>>>>", req.user);
        res.render('home', {user: req.user});
    }
}