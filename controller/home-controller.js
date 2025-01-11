const queries = require('../db/prismaQueries');

module.exports = {
    get: async (req,res) => {
        const folders = await queries.getFolders(req.user.id);
        console.log(folders);
        res.render('home', {user: req.user, folders: folders});
    },

    createFolder: async (req, res) => {
        const folderName = req.body.folderName;
        await queries.addFolder(folderName, req.user.id);
        res.redirect('/home');
    }
}