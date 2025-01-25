const multer = require('multer');
const util = require('util');
const fileconfig = require('./fileconfig');
const maxSize = 2 * 1024 * 1024;
let storage = multer.memoryStorage();

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;