/**
 * @description 个人主页 api路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex',loginCheck,async(ctx,next)=>{

})

module.exports = router