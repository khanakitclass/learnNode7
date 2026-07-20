const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    
    const filePath = path.join("public", file.fieldname)

    console.log(filePath);
    
    fs.mkdir(filePath, {recursive: true}, (error) => {
        console.log(error);
        
        if (error) {
            cb(error?.message, null)
        }
    })

    cb(null, filePath)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload
