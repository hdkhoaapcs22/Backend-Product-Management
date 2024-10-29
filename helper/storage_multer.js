const multer  = require('multer')

module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/')
        },
        filename: function (req, file, cb) {
            const uniqueSPreffix = Date.now();
            cb(null, `${uniqueSPreffix}-${file.originalname}`)
        }
    })

    return storage;
}