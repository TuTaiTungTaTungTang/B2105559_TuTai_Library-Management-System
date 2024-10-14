const route = require("express").Router();
const TheLoaiController = require("../controllers/theloai.controller")

route.route("/createcategory").post(TheLoaiController.createCategory);

module.exports = route;