const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addUser(Username, Password){
    await prisma.user.create({
        data: {
            username: Username,
            password: Password
        },
    })
}

async function addFolder(name, userid){
    await prisma.folder.create({
        data: {
            folderName: name,
            userId: userid
        },
    })
}

async function getFolders(userid) {
    try {
        const folders = await prisma.folder.findMany({
            where: {
                userId: userid,
            }
        });

        return folders; // Directly return the folders array
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
}

module.exports = {
    addUser,
    addFolder,
    getFolders
}