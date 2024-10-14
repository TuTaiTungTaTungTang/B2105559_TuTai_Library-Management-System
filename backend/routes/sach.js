const route = require("express").Router();
const SachController = require("../controllers/sach.controller")

route.route("/createbook").post(SachController.createBook);
route.route("/findbookbyname").post(SachController.findBooksByName);
route.route("/findbookbyauthor").post(SachController.findBooksByAuthor);
route.route("/findbookbycategory").post(SachController.findBooksByCategory);

module.exports = route;