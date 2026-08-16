const express = require("express");
const theodoimuonsach = require("../controllers/theodoimuonsach.controller");

const router = express.Router();

router.route("/")
    .get(theodoimuonsach.findAll)
    .post(theodoimuonsach.create);

router.route("/:id")
    .get(theodoimuonsach.findOne)
    .put(theodoimuonsach.update)
    .delete(theodoimuonsach.delete);

module.exports = router;