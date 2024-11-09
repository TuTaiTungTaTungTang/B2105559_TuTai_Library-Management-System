const route = require("express").Router();
const MemberController = require("../controllers/member.controller")
const auth = require("../middleware/auth.middleware")

route.route("/:type").post(MemberController.handleLoginOrRegister);
// route.route("/register").post(MemberController.register);
route.route("/").get(auth.authMember, MemberController.auth);

module.exports = route;