const queries = require('../db/prismaQueries');
const fs = require('fs-extra');
const fileconfig = require('./fileconfig');
const uploadFile = require('./uploadFile');
const { promisify } = require('util');

module.exports = {
    get: async (req,res) => {
        const folders = await queries.getFolders(req.user.id);
        let id = null;

        const isRoot = await queries.checkRoot(req.user.id);

        if(!isRoot){
            await queries.addFolder("root", req.user.id);  
            const getRoot = await queries.getRoot(req.user.id, "root");
            id = getRoot.id;  
        }

        if(req.params.id){
            id = req.params.id;
        }else {
            const getRoot = await queries.getRoot(req.user.id, "root");
            id = getRoot.id;
        }

        const subFolders = await queries.getSubFolders(Number(id));
        const files = await queries.getFiles(Number(id));

        const getDatFolder = await queries.getFolderById(Number(req.params.id)) //this gets the folder by its id to check if its user is the same as the user browsing 

        if(getDatFolder.userId == req.user.id){
            await res.render(`home`, {user: req.user, folders: folders, folderId: id, subFolders: subFolders, files: files});
        }
        else {
            res.send("Not Ur Folder");
        } 
    },

    createFolder: async (req, res) => {
        const folderName = req.body.folderName;
        const parent = req.params;    

        await queries.addFolder(folderName, req.user.id, Number(parent.id));
        if(parent.id !== undefined){
            res.redirect(`/home/${parent.id}`);
        } else {
            res.redirect(`/home`);
        }
    },

    createFile: async (req, res) => {
        try{
            await uploadFile(req, res);
            if(req.file == undefined){
                return res.status(400).send({message: "Add File Please"});
            }
            const sizeInKB = Math.round(req.file.size / 1024);
            queries.addFile(req.file.originalname, req.file.buffer, sizeInKB, Number(req.params.id));
            res.redirect(`/home/${req.params.id}`);
        } catch (err) {
            res.status(500).send(
                {message: "Unable to upload file to " + err});
        }
    },

    downloadFile: async (req, res) => {
        try{
            const fileId = req.params.id;

            const files = await queries.getFile(Number(fileId));

            const file = files[0];

            if(!file){
                return res.status(404).send({message: "file not found"});
            }

            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
            res.send(Buffer.from(file.fileData));
        }catch (err) {
            console.error("Error downloading file:", err);
            res.status(500).send({ message: "Unable to download file: " + err.message });
        }
    },

    deleteFile: async (req, res) => {
        const fileId = Number(req.params.id);

        const files = await queries.getFile(fileId);
        const folderId = files[0].folderId;

        await queries.deleteFile(fileId);

        res.redirect(`/home/${folderId}`)
    },

    deleteFolder: async (req, res) => {
        const folderId = Number(req.params.id);

        const files = await queries.getFiles(folderId);
        const folders = await queries.getSubFolders(folderId);
        if(files){
            await queries.deleteManyFiles(folderId);
        }
        if(folders){
            await queries.deleteManyFolders(folderId);
        }
        await queries.deleteFolder(folderId);
        
        res.redirect(`/home/${req.query.folderParent}`);
    }
}