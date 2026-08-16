const express = require("express");
const sach = require("../controllers/sach.controller");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.route("/")
    .get(sach.findAll)
    .post(upload.single("HinhAnh"), sach.create);

router.route("/:id")
    .get(sach.findOne)
    .put(upload.single("HinhAnh"), sach.update)
    .delete(sach.delete);

module.exports = router;