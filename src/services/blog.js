
const { Blog } = require('../db/model/index')

/**
 * @description 添加新微博
 * @param {*} content 微博内容
 * @param {*} image 图片地址
 */
async function createBlog({ content, image, id }) {
    const result = await Blog.create({ content, image, userId: id })
    return result.dataValues
}


module.exports = {
    createBlog
}

