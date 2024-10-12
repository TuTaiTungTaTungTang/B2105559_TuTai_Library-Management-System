const bcrypt = require("../utils/bcrypt");
const NhanVienModel = require("../schemas/nhanvien.schemas");

async function login(req, res) {
    const { MSNV, Password } = req.body;
    const nhanVien = await NhanVienModel.findNhanVien({ MSNV });

    if (!nhanVien || !bcrypt.comparePassword(nhanVien.Password, Password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", nhanVien });
}

module.exports = { login };
