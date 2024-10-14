const route = require("express").Router();
const NhaXuatBanController = require("../controllers/nhaxuatban.controller")

route.route("/createpublisher").post(NhaXuatBanController.createPublisher);

module.exports = route;