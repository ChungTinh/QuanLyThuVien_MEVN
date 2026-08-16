const multer = require("multer");

// Dùng bộ nhớ tạm (RAM) thay vì lưu vào ổ cứng
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;