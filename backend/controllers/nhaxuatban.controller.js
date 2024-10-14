const NhaXuatBan = require("../schemas/nhaxuatban.schema")

class NhaXuatBanController {
    async createPublisher(req, res, next) {
        try {
            const { MANXB, TENNXB, DIACHI } = req.body;

            // Tạo nhà xuất bản mới
            const newPublisher = await NhaXuatBan.create({
                MANXB: MANXB,
                TENNXB: TENNXB,
                DIACHI: DIACHI
            });

            console.log(newPublisher);

            res.json({message: "Nhà xuất bản mới đã được thêm"});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NhaXuatBanController()