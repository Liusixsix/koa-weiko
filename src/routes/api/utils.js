/**
 * @description utils api 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const koaFrom = require('formidable-upload-koa')
const { saveFile,upload } = require('../../controller/utils')
router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, upload.single('file'), async (ctx, next) => {
    const file = ctx.req.file
    ctx.body = await saveFile(file)
})

module.exports = router