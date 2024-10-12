const bcrypt = require("../utils/bcrypt");
const DocGiaModel = require("../schemas/docgia.schemas");

async function login(req, res) {
    const { username, password } = req.body;
    const docGia = await DocGiaModel.findDocGia({ username });

    if (!docGia || !bcrypt.comparePassword(docGia.Password, password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", docGia });
}

async function register(req, res) {
    const { username, password, fullName } = req.body;
    const existingDocGia = await DocGiaModel.findDocGia({ username });

    if (existingDocGia) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = bcrypt.hashPassword(password);
    const newDocGia = { username, Password: hashedPassword, fullName };

    await DocGiaModel.createDocGia(newDocGia);
    res.status(201).json({ message: "Registration successful" });
}

module.exports = { login, register };
