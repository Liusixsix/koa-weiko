const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constrant')
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

/**
 * 获取首页微博
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
    const {count,blogList} = result
    return new SuccessModel({
        isEmpty:blogList.length === 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,getHomeBlogList
}