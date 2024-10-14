const DOCGIA = require("../schemas/docgia.schema")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt")

class DocGiaController {
    async register(req, res, next) {
        try {
            const {MADOCGIA, Password, HOLOT, TEN, NGAYSINH, PHAI, DIACHI, SODIENTHOAI} = req.body;
            const user = await DOCGIA.findOne({MADOCGIA});
            
            if (user)
                return res.status(400).json({message: "Mã độc giả đã tồn tại"});
            
            const newDocGia = await DOCGIA.create({
                MADOCGIA: MADOCGIA,
                Password: bcrypt.hashPassword(Password),
                HOLOT: HOLOT,
                TEN: TEN,
                NGAYSINH: NGAYSINH,
                PHAI: PHAI,
                DIACHI: DIACHI,
                SODIENTHOAI: SODIENTHOAI
            }) 
            console.log(newDocGia)
            
            const accessToken = jwt.sign({_id: newDocGia._id});
            res.json({accessToken});
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {MADOCGIA, Password} = req.body;
            const user = await DOCGIA.findOne({MADOCGIA});
            
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

module.exports = new DocGiaController()