const app = require("./app");
const config = require("./app/config");
const bcrypt = require("./utils/bcrypt");
const NhanVienModel = require("./schemas/nhanvien.schemas");

const PORT = config.app.port;

// Kiểm tra và thêm nhân viên mặc định vào cơ sở dữ liệu
async function setupAdmin() {
    const db = require("./db").getDB();
    const numberOfNhanVien = await db.collection("NHANVIEN").countDocuments();

    if (numberOfNhanVien) return;

    const newNhanVien = {
        MSNV: "admin",
        HoTenNV: "admin",
        Password: bcrypt.hashPassword("admin"),
        ChucVu: "Tong Giam Doc",
        DiaChi: "Can Tho",
        SoDienThoai: "0123456789",
    };
    await NhanVienModel.createNhanVien(newNhanVien);
    console.log("Default admin created:", newNhanVien);
}

app.listen(PORT, async () => {
    await setupAdmin();
    console.log(`Server is running on port ${PORT}`);
});
