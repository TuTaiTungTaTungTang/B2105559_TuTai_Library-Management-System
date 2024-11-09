require("dotenv").config();
const app = require("./app");
const config = require("./app/config");
const LIBRARIAN = require("./schemas/librarian.schema")
const bcrypt = require("./utils/bcrypt")

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/librarydb").then(async ()=>{
    const numberOfLibrarian = await LIBRARIAN.countDocuments();
    if (numberOfLibrarian)
        return;
    const newLibrarian = await LIBRARIAN.create({
        MSNV: "admin", 
        HOTENNV: "Huynh Tu Tai", 
        MATKHAU: bcrypt.hashPassword("admin"), 
        CHUCVU: "Quản lý",
        DIACHI: "An Giang",
        SODIENTHOAI: "0939554486"
    })
    console.log(newLibrarian);
});

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});