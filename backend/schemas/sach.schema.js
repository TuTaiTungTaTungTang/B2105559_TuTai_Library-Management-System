const { getDB } = require("../db");

const SACH_COLLECTION = "SACH";

async function createSach(sach) {
    const db = getDB();
    return await db.collection(SACH_COLLECTION).insertOne(sach);
}

// Thêm các hàm khác cho SACH nếu cần thiết

module.exports = { createSach };
