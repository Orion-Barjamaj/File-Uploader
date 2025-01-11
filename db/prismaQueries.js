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

module.exports = {
    addUser,
}