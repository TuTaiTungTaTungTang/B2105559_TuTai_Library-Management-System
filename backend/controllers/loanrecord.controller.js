const theodoimuonsach = require("../schemas/loanrecord.schema")
const BOOK = require = require("../schemas/book.schema")
class LoanRecordController {
    async loanBook(req, res, next) {
        const {
            DOCGIA,
            SACH,
            NGAYMUON,
            NGAYTRA,
            TRANGTHAI
        } = req.body;

        let book = await BOOK.findById(SACH);
        if(book.SOQUYEN == 0){
            return res.status(400).json({message: "Số lượng sách còn lại bằng 0, không thể mượn!"})
        }

        const check = await theodoimuonsach.findOne({DOCGIA:DOCGIA, SACH: SACH})
        console.log(check)
        if(check){
            if(check.TRANGTHAI != 2){
            return res.status(400).json({message: "Bạn đang mượn quyển sách này, không thể mượn thêm!"})

            }
        }

        const newLoanRecord = await theodoimuonsach.create({ DOCGIA: DOCGIA, SACH: SACH, NGAYMUON: NGAYMUON, NGAYTRA: NGAYTRA });
        console.log(newLoanRecord);

        // let book = await BOOK.findById(SACH);
        book.SOQUYEN = book.SOQUYEN - 1
        await BOOK.findByIdAndUpdate(SACH, book)

        res.json({ message: "Phiếu mượn sách đã được tạo" });
    }

    async getLoanRecordById(req, res, next) {
        try {
            const today = new Date()
            const { id } = req.params;
            console.log("id ne " + id)
            const loanRecords = await theodoimuonsach.find({ DOCGIA: id }).populate('DOCGIA').populate('SACH')
            console.log(loanRecords)
            for (let index = 0; index < loanRecords.length; index++) {
                // const element = array[index];
                if (today > loanRecords[index].NGAYTRA) {
                    const tmp = loanRecords[index]
                    tmp.TRANGTHAI = 3
                    await theodoimuonsach.findByIdAndUpdate(tmp.id, tmp)
                }
            }
            const newLoanRecords = theodoimuonsach.find({ DOCGIA: id }).populate('DOCGIA').populate('SACH')
            console.log(newLoanRecords)
            res.json(loanRecords.reverse())

        } catch (error) {

        }
    }

    async getAllLoanRecord(req, res, next) {
        try {
            const today = new Date()
            const loadRecords = await theodoimuonsach.find().populate('DOCGIA').populate('SACH')
            for (let index = 0; index < loadRecords.length; index++) {
                // const element = array[index];
                if (today > loadRecords[index].NGAYTRA) {
                    const tmp = loadRecords[index]
                    tmp.TRANGTHAI = 3
                    await theodoimuonsach.findByIdAndUpdate(tmp.id, tmp)
                }
            }
            const newLoanRecords = await theodoimuonsach.find().populate('DOCGIA').populate('SACH')
            res.json(newLoanRecords.reverse())
        } catch (error) {

        }
    }

    async updateStatusLoanRecord(req, res, next) {
        const {
            _id,
            TRANGTHAI
        } = req.body;

        let loanRecord = await theodoimuonsach.findById(_id);
        if (!loanRecord) {
            return res.status(404).json({ message: 'Phiếu mượn không tồn tại.' });
        }
        loanRecord.TRANGTHAI = TRANGTHAI;
        loanRecord = await theodoimuonsach.findByIdAndUpdate(_id, loanRecord);
        if (TRANGTHAI == 2) {
            console.log("cong them nè")
            let book = await BOOK.findById(loanRecord.SACH)
            book.SOQUYEN = book.SOQUYEN + 1
            await BOOK.findByIdAndUpdate(loanRecord.SACH, book)
        }
        res.json({ message: 'Thông tin phiếu đã được cập nhật thành công.' });

    }
}

module.exports = new LoanRecordController()