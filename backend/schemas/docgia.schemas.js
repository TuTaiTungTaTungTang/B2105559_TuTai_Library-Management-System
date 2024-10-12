const { getDB } = require("../db");

const DOCGIA_COLLECTION = "DOCGIA";

async function createDocGia(docGia) {
    const db = getDB();
    return await db.collection(DOCGIA_COLLECTION).insertOne(docGia);
}

async function findDocGia(query) {
    const db = getDB();
    return await db.collection(DOCGIA_COLLECTION).findOne(query);
}

module.exports = { createDocGia, findDocGia };
