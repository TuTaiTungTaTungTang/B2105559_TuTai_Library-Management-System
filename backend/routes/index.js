const route = require("express").Router();

route.use("/nhanvien", require("./nhanvien"));
route.use("/docgia", require("./docgia"));
route.use("/sach", require("./sach"));
route.use("/nhaxuatban", require("./nhaxuatban"));
route.use("/theloai", require("./theloai"));

module.exports = route;