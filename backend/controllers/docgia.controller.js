const jwt = require("../utils/jwt");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await req.db.collection('docgia').findOne({ email, password });
    if (!user) return res.status(400).json({ message: "Sai thông tin đăng nhập" });
    
    const token = jwt.encode({ _id: user._id });
    res.json({ token });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await req.db.collection('docgia').findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email đã tồn tại" });

    const newUser = { name, email, password };
    await req.db.collection('docgia').insertOne(newUser);
    res.status(201).json({ message: "Đăng ký thành công" });
};

const auth = (req, res) => {
    res.json({ user: req.user });
};

module.exports = { login, register, auth };
