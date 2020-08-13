
const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 
 * @param {string} content 微博内容
 * @param {string} image 图片地址
 */
async function create(content, image, userId) {
    const result = await createBlog({ content, image, id: userId })
    if (result) {
        return new SuccessModel()
    } else {
        return new ErrorModel({
            errno: 10001,
            message: '创建失败'
        })
    }
}

module.exports = {
    create
}