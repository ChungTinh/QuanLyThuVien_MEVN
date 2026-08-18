const express = require("express");
const nhanvien = require("../controllers/nhanvien.controller");

const router = express.Router();

router.route("/login")
    .post(nhanvien.login);

router.route("/")
    .get(nhanvien.findAll)
    .post(nhanvien.create);

router.route("/:id")
    .get(nhanvien.findOne)
    .put(nhanvien.update)
    .delete(nhanvien.delete);

router.route("/:id/password")
    .put(nhanvien.updatePassword);
    
module.exports = router;