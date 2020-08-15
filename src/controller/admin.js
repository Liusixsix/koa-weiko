const { getBlogListByUser } = require('../services/blog')
const { delBlog,updateBlogConent } = require('../services/admin')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

async function getBlogList(userName, pageIndex, pageSize) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize
    })
    const { blogList, count } = result
    return new SuccessModel({
        blogList,
        pageSize,
        pageIndex,
        count
    })
}

/**
 * 根据id删除博客
 * @param {number} id 博客id
 */
async function delBlogById(id) {
    const result = await delBlog(id)
    if (result) {
        return new SuccessModel()
    } else {
        return new ErrorModel({
            errno: 10001,
            message: '删除失败'
        })
    }
}


async function updataBlog(id,content){
    const result = await updateBlogConent(id,content)
    if(result){
        return new SuccessModel()
    }else{
        return new ErrorModel({
            errno:10001,
            message:'修改失败'
        })
    }
}

module.exports = {
    getBlogList, delBlogById,updataBlog
}
