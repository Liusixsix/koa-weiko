const xss = require('xss')
const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 
 * @param {string} content 微博内容
 * @param {string} image 图片地址
 */
async function create(content, image, userId) {
    try {
        const result = await createBlog({ content: xss(content), image, userId })
        return new SuccessModel()
    } catch (e) {
        console.error(e)
        return new ErrorModel({
            errno: 10001,
            message: '创建微博失败'
        })
    }

}

module.exports = {
    create
}