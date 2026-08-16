const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu trữ và đổi tên file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        // Đổi tên file thành "thời gian hiện tại" + "đuôi file gốc" 
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });
module.exports = upload;