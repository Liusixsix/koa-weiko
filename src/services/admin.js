
const { Blog } = require('../db/model/index')

/**
 * 根据博客id删除博客
 * @param {number} id
 */
async function delBlog(id){
    const result = await Blog.destroy({
        where:{
            id
        }
    })
    // 删除的行数
    return result > 0
}

async function updateBlogConent(id,content){
    const result = await Blog.update({
        content
    },{
        where:{
            id
        }
    })

    return result > 0
}


module.exports = {
    delBlog,updateBlogConent
}
