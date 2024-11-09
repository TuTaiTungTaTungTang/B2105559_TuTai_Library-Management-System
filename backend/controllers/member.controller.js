const MEMBER = require("../schemas/member.schema")
const bcrypt = require("../utils/bcrypt")
const jwt = require("../utils/jwt")

class MemberController {
    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.handleLoginOrRegister = this.handleLoginOrRegister.bind(this);
        this.auth = this.auth.bind(this);
    }
    async register(req, res, next) {
        console.log("Đây nè")
        try {
            const {
                MADOCGIA,
                MATKHAU, 
                HOLOT, 
                TEN, 
                NGAYSINH, 
                PHAI, 
                DIACHI, 
                SODIENTHOAI
            } = req.body;
            
            console.log(HOLOT)

            const member = await MEMBER.findOne({MADOCGIA});
            
            if (member)
                return res.status(400).json({message: "Mã độc giả đã tồn tại"});
            
            const newMember = await MEMBER.create({
                MADOCGIA: MADOCGIA,
                MATKHAU: bcrypt.hashPassword(MATKHAU),
                HOLOT: HOLOT,
                TEN: TEN,
                NGAYSINH: NGAYSINH,
                PHAI: PHAI,
                DIACHI: DIACHI,
                SODIENTHOAI: SODIENTHOAI
            }) 
            // console.log(newDocGia)
            
            const accessToken = jwt.sign({_id: newMember._id});
            res.json({accessToken});
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        console.log("đăng nhập á")
        try {
            const {MADOCGIA, MATKHAU} = req.body;
            console.log(MADOCGIA, MATKHAU)
            const member = await MEMBER.findOne({MADOCGIA});
            
            if (!member)
                return res.status(400).json({message: "Mã độc giả không tồn tại"});
            if (!bcrypt.comparePassword(member.MATKHAU, MATKHAU))
                return res.status(400).json({message: "Mật khẩu không chính xác"});
            console.log("ok nè")
            console.log(member)
            const accessToken = jwt.sign({_id: member._id});
            res.json({accessToken});
        } catch (error) {
            next(error);
        }
    }

    async handleLoginOrRegister(req, res, next) {
        try {
            const { type } = req.params;
            if (type == 'reg'){
                await this.register(req, res, next)
            }
            else if (type == 'log'){
                await this.login(req, res, next)
            }
        } catch (error) {
            next(error);
        }
    }

    async auth(req, res, next) {
        return res.json(req.user);
    }
}

module.exports = new MemberController()