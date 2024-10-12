const route = require("express").Router();
const NhanVienController = require("../controllers/nhanvien.controller");
const auth = require("../middleware/auth.middleware");

route.route("/login").post(NhanVienController.login);
route.route("/auth").get(auth.authNhanvien, NhanVienController.auth);

module.exports = route;
