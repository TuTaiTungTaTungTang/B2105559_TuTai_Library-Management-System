const { getDB } = require("../db");

const NHAXUATBAN_COLLECTION = "NHAXUATBAN";

async function createNhaXuatBan(nhaXuatBan) {
    const db = getDB();
    return await db.collection(NHAXUATBAN_COLLECTION).insertOne(nhaXuatBan);
}

// Thêm các hàm khác cho NHAXUATBAN nếu cần thiết

module.exports = { createNhaXuatBan };
