/**
 * @description blog 相关缓存
 * @author shima_lee
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表缓存
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    // 获取缓存
    const cacheResult = await get(key)
    if (cacheResult) {
        return cacheResult
    }

    // 无缓存读取数据库
    const result = await getBlogListByUser(pageIndex, pageSize)

    //设置缓存
    set(key, result, 60)

    return result
}

module.exports = {
    getSquareCacheList
}