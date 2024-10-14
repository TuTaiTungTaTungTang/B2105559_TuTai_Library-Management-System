const Sach = require("../schemas/sach.schema")
const THELOAI = require("../schemas/theloai.schema")

class SachController {
    async createBook(req, res, next) {
        const { TENSACH, THELOAI, DONGIA, SOQUYEN, NAMXUATBAN, NHAXUATBAN, TACGIA, MOTASACH, HINHANH } = req.body;
        
        const newBook = await Sach.create({
            TENSACH: TENSACH,
            DONGIA: DONGIA,
            THELOAI: THELOAI,
            SOQUYEN: SOQUYEN,
            NAMXUATBAN: NAMXUATBAN,
            NHAXUATBAN: NHAXUATBAN,
            TACGIA: TACGIA,
            MOTASACH: MOTASACH,
            HINHANH: HINHANH
        });

        console.log(newBook);
        res.json({message: "Sách mới đã được tạo"});
    }

    async findBooksByName(req, res, next) {
        try {
            const { TENSACH } = req.body;

            // Tìm sách theo tên sách chứa chuỗi tìm kiếm
            const foundBooks = await Sach.find({ TENSACH: { $regex: TENSACH, $options: 'i' } }).populate('THELOAI').populate('NHAXUATBAN');
            
            if (foundBooks.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy sách.' });
            }

            res.json(foundBooks);
        } catch (error) {
            next(error);
        }
    }

    async findBooksByAuthor(req, res, next) {
        try {
            const { TACGIA } = req.body;

            // Tìm sách theo tên sách chứa chuỗi tìm kiếm
            const foundBooks = await Sach.find({ TACGIA: { $regex: TACGIA, $options: 'i' } }).populate('THELOAI').populate('NHAXUATBAN');
            
            if (foundBooks.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy sách.' });
            }

            res.json(foundBooks);
        } catch (error) {
            next(error);
        }
    }

    async findBooksByCategory(req, res, next) {
        try {
            const { TENTHELOAI } = req.body;

            // Tìm sách theo tên sách chứa chuỗi tìm kiếm
            const foundCategory = await THELOAI.findOne({TENTHELOAI: TENTHELOAI});
            
            if (!foundCategory) {
                return res.status(404).json({ message: 'Không tìm thấy thể loại này.' });
            }

            const foundBooks = await Sach.find({ THELOAI: foundCategory._id }).populate('THELOAI').populate('NHAXUATBAN');

            if (foundBooks.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy sách.' });
            }

            res.json(foundBooks);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SachController()