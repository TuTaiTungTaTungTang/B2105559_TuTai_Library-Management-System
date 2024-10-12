const jwt = require("../utils/jwt");

const authNhanvien = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        
        const decodeUser = jwt.decode(token);
        if (!decodeUser) {
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        }

        const existUser = await req.db.collection('nhanvien').findOne({ _id: decodeUser._id });
        if (!existUser) {
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        }
        
        req.user = existUser;
        next();
    } catch (error) {
        next(error);
    }
};

const authDocGia = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        
        const decodeUser = jwt.decode(token);
        if (!decodeUser) {
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        }

        const existUser = await req.db.collection('docgia').findOne({ _id: decodeUser._id });
        if (!existUser) {
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        }
        
        req.user = existUser;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { authNhanvien, authDocGia };
