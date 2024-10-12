const jwt = require("../utils/jwt");
const NhanVien = require("../schemas/nhanvien.schemas"); // Cập nhật đường dẫn nếu cần
const DocGia = require("../schemas/docgia.schemas"); // Cập nhật đường dẫn nếu cần

const authNhanVien = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        
        const decodeUser = jwt.decode(token);
        if (!decodeUser) {
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        }

        const existUser = await NhanVien.findNhanVien({ _id: decodeUser._id }); // Sử dụng hàm từ schema
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

        const existUser = await DocGia.findDocGia({ _id: decodeUser._id }); // Sử dụng hàm từ schema
        if (!existUser) {
            return res.status(400).json({ message: "Tài khoản chưa đăng nhập trên hệ thống" });
        }

        req.user = existUser;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { authNhanVien, authDocGia };
