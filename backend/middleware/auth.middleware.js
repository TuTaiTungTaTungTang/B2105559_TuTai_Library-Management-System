const jwt = require("../utils/jwt")
const NhanVien = require("../schemas/nhanvien.schema")
const DocGia = require("../schemas/docgia.schema")

const authNhanvien = async (req, res, next) => {
	try {
        const token = req.headers.authorization?.split(" ")[1];
		if (!token)
            return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});

        const decodeUser = jwt.decode(token);

		if (!decodeUser) {
			return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});
		}

		const existUser = await NhanVien.findById(decodeUser._id);

		if (!existUser) {
			return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});
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
            return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});

        const decodeUser = jwt.decode(token);

		if (!decodeUser) {
			return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});
		}

		const existUser = await DocGia.findById(decodeUser._id);

		if (!existUser) {
			return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});
		}
        req.user = existUser;
        next();
	} catch (error) {
		next(error);
	}
};

module.exports = {authNhanvien, authDocGia}