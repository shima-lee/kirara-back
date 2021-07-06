/**
 * @description utils controller
 * @author shima_lee
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 文件最大体积 1M
const MAX_SIZE =1024 * 1024 * 1024
 
/**
 * 保存文件
 * @param {string} name 
 * @param {string} filePath 
 * @param {string} type 
 * @param {number} size 
 * @returns 
 */
async function saveFile({ name, filePath, type, size }) {
    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 移动文件
    const fileName = Date.now() + '.' + name //! 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 移动目录
    await fse.move(filePath, distFilePath)

    // 返回信息
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}