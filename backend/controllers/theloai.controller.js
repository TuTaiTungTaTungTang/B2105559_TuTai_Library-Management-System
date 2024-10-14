const THELOAI = require("../schemas/theloai.schema")

class TheLoaiController {
    async createCategory(req, res, next) {
        try {
            const { MATL, TENTHELOAI } = req.body;

            // Tạo thể loại mới
            const newCategory = await THELOAI.create({
                MATL: MATL,
                TENTHELOAI: TENTHELOAI
            });

            res.json({message: "Thể loại mới đã được tạo"});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TheLoaiController()