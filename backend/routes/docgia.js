const DocGiaController = require("../controllers/docgia.controller")
const auth = require("../middleware/auth.middleware")

route.route("/login").post(DocGiaController.login);
route.route("/register").post(DocGiaController.register);
route.route("/auth").get(auth.authDocGia, DocGiaController.auth);

module.exports = route;