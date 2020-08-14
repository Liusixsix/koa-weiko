/**
 * @description 微博缓存层
 */
const { set, get } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')


// redis key前缀
const KEY_PREFIX = 'weibo:square'

async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
    const cacheResult = await get(key)
    if (cacheResult != null) {
        return cacheResult
    }
    // 没有缓存读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })
    // 设置缓存 过期时间 1分钟
    set(key, result, 60)
    return result

}

module.exports = {
    getSquareCacheList
}
