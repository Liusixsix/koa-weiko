/**
 * @description utils
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const fse = require('fs-extra')
const multer = require('koa-multer')
// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积 1m
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

const storage = multer.diskStorage({
    // 文件保存路径
    destination: (req, file, cb) => {
        cb(null, DIST_FOLDER_PATH)
    },
    filename: (req, file, cb) => {
        var fileFormat = (file.originalname).split('.')
        cb(null, Date.now().toString(16) + '.' + fileFormat[fileFormat.length - 1])
    }
})

const upload = multer({
    storage
})
/**
 * 保存文件
 * @param {string} name  文件名
 * @param {string} type  文件类型
 * @param {number} size  文件大小
 * @param {string} filePath  文件路径
 */
async function saveFile(file) {
    return new SuccessModel({
        url: '/' + file.filename
    })
}

module.exports = {
    saveFile, upload
}