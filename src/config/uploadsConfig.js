const path = require('path')
const crypto = require('crypto')
const multer = require("multer")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "TMP")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")
const UPLOADS_FOLDER_DISH = path.resolve(TMP_FOLDER, "uploadsDish")

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

const MULTER_DISH = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `image_dish-${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
    UPLOADS_FOLDER_DISH,
    MULTER_DISH
}