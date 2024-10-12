const route = require("express").Router();

route.use("/nhanvien", require("./nhanvien"));
route.use("/docgia", require("./docgia"));

module.exports = route;
