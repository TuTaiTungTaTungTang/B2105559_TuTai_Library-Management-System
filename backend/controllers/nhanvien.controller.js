const NhanVien = require("../schemas/nhanvien.schema")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt")

class NhanVienController {
    async login(req, res, next) {
        try {
            const {MSNV, Password} = req.body;
            const user = await NhanVien.findOne({MSNV});
            
            if (!user)
                return res.status(400).json({message: "MSNV hoặc mật khẩu không chính xác"});
            if (!bcrypt.comparePassword(user.Password, Password))
                return res.status(400).json({message: "MSNV hoặc mật khẩu không chính xác"});

            const accessToken = jwt.sign({_id: user._id});
            res.json({accessToken});
        } catch (error) {
            next(error);
        }
    }

    async auth(req, res, next) {
        return res.json(req.user);
    }
}

module.exports = new NhanVienController()