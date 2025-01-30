const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addUser(Username, Password, folder){
    await prisma.user.create({
        data: {
            username: Username,
            password: Password,
            folder: folder
        },
    })
}

async function addFolder(name, userid, parentid){
    await prisma.folder.create({
        data: {
            folderName: name,
            userId: userid,
            parentId: parentid
        },
    })
}

async function getFolders(userid) {
    try {
        const folders = await prisma.folder.findMany({
            where: {
                userId: userid,
            },
            orderBy: {
                createdOn: 'asc',
            }
        });

        return folders; // Directly return the folders array
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
}

async function getRoot(userid, name) {
    try {
        const folders = await prisma.folder.findFirst({
            where: {
                userId: userid,
                folderName: name
            },
            orderBy: {
                createdOn: 'desc',
            }
        });

        return folders; // Directly return the folders array
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
}

async function getSubFolders(parentid) {
    try {
        const subFolders = await prisma.folder.findMany({
            where: {
                parentId: parentid,
            },
            orderBy: {
                createdOn: 'desc',
            }
        });

        return subFolders;
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
}

async function addFile(name, fileData, size, folderId) {
    await prisma.files.create({
        data: {
            name: name,
            fileData: fileData,
            size: size,
            folderId: folderId
        }
    });
}

async function getFiles(folderid) {
    try{
        const files = prisma.files.findMany({
            where: {
                folderId: folderid,
            },
            orderBy: {
                createdOn: 'desc',
            }
        });

        return files;

    } catch(err){
        console.log(err);
        return [];
    }
}

async function getFile(folderid) {
    try{
        const file = prisma.files.findMany({
            where: {
                id: folderid,
            }
        });

        return file;

    } catch(err){
        console.log(err);
        return [];
    }
}


async function checkRoot(userId) {
    const folder = await prisma.folder.findFirst({
        where: {
            userId: userId,
            folderName: "root"
        }
    })

    return folder;
}

module.exports = {
    addUser,
    addFolder,
    getFolders,
    getSubFolders,
    addFile,
    getFiles,
    getRoot,
    checkRoot,
    getFile
}