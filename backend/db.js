const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db("librarydb");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Dừng ứng dụng nếu không thể kết nối
    }
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };
