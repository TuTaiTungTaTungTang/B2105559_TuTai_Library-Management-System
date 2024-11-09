const jwt = require("../utils/jwt")
const LIBRARIAN = require("../schemas/librarian.schema")
const MEMBER = require("../schemas/member.schema")

const authLibrarian = async (req, res, next) => {
	try {
        const token = req.headers.authorization?.split(" ")[1];
		if (!token)
            return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});

        const decodeUser = jwt.decode(token);

		if (!decodeUser) {
			return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});
		}

		const existUser = await LIBRARIAN.findById(decodeUser._id);

		if (!existUser) {
			return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});
		}
        req.user = existUser;
        next();
	} catch (error) {
		next(error);
	}
};

const authMember = async (req, res, next) => {
	console.log("Hello")
	try {
        const token = req.headers.authorization?.split(" ")[1];
		console.log(token)
		if (!token)
            return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});

        const decodeUser = jwt.decode(token);

		if (!decodeUser) {
			return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});
		}

		const existUser = await MEMBER.findById(decodeUser._id);

		if (!existUser) {
			return res.status(400).json({message: "Tai khoan chua dang nhap tren he thong"});
		}
        req.user = existUser;
        next();
	} catch (error) {
		next(error);
	}
};

module.exports = {authLibrarian, authMember}