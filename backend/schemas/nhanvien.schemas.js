const { getDB } = require("../db");

const NHANVIEN_COLLECTION = "NHANVIEN";

async function createNhanVien(nhanVien) {
    const db = getDB();
    return await db.collection(NHANVIEN_COLLECTION).insertOne(nhanVien);
}

async function findNhanVien(query) {
    const db = getDB();
    return await db.collection(NHANVIEN_COLLECTION).findOne(query);
}

// Thêm các hàm khác cho NHANVIEN nếu cần thiết

module.exports = { createNhanVien, findNhanVien };
