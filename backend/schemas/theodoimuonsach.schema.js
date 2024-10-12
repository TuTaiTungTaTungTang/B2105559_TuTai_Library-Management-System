const { getDB } = require("../db");

const THEODOIMUONSACH_COLLECTION = "THEODOIMUONSACH";

async function createTheoDoiMuonSach(theoDoi) {
    const db = getDB();
    return await db.collection(THEODOIMUONSACH_COLLECTION).insertOne(theoDoi);
}

// Thêm các hàm khác cho THEODOIMUONSACH nếu cần thiết

module.exports = { createTheoDoiMuonSach };
