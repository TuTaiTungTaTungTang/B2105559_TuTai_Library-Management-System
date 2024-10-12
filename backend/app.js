const express = require("express");
const cors = require("cors");
const route = require("./routes");
const { MongoClient } = require("mongodb");

const app = express();
const uri = "mongodb://localhost:27017/library_management"; // Chuỗi kết nối MongoDB
let db;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        console.error("Kết nối đến MongoDB thất bại:", err);
        return;
    }
    db = client.db("library_management"); // Đặt cơ sở dữ liệu
    console.log("Kết nối đến MongoDB thành công");
});

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    req.db = db; // Gán db cho req để sử dụng trong controller
    next();
});
app.use(route);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to library management application." });
});

const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).send({ message: error.message });
    next();
};

app.use(errorHandler);

module.exports = app;
