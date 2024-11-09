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


// const jwt = require("../utils/jwt");  // Import file jwt.js của bạn
// const LIBRARIAN = require("../schemas/librarian.schema");
// const MEMBER = require("../schemas/member.schema");

// const authLibrarian = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];  // Lấy token từ header
//         if (!token) return res.status(400).json({ message: "Bạn chưa đăng nhập" });

//         // Kiểm tra tính hợp lệ của token
//         const decodedUser = jwt.verify(token);  // Sử dụng phương thức verify của jwt
//         if (!decodedUser) return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });

//         // Kiểm tra người dùng có tồn tại trong DB không
//         const existUser = await LIBRARIAN.findById(decodedUser._id);
//         if (!existUser) return res.status(404).json({ message: "Không tìm thấy người dùng" });

//         req.user = existUser;  // Gán người dùng vào req.user để sử dụng ở các middleware tiếp theo
//         next();  // Tiếp tục xử lý yêu cầu
//     } catch (error) {
//         console.error(error);  // In lỗi ra console nếu có
//         return res.status(500).json({ message: "Đã xảy ra lỗi khi xác thực" });
//     }
// };

// const authMember = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];  // Lấy token từ header
//         if (!token) return res.status(400).json({ message: "Bạn chưa đăng nhập" });

//         // Kiểm tra tính hợp lệ của token
//         const decodedUser = jwt.verify(token);  // Sử dụng phương thức verify của jwt
//         if (!decodedUser) return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });

//         // Kiểm tra thành viên có tồn tại trong DB không
//         const existUser = await MEMBER.findById(decodedUser._id);
//         if (!existUser) return res.status(404).json({ message: "Không tìm thấy thành viên" });

//         req.user = existUser;  // Gán người dùng vào req.user để sử dụng ở các middleware tiếp theo
//         next();  // Tiếp tục xử lý yêu cầu
//     } catch (error) {
//         console.error(error);  // In lỗi ra console nếu có
//         return res.status(500).json({ message: "Đã xảy ra lỗi khi xác thực" });
//     }
// };

// module.exports = { authLibrarian, authMember };
