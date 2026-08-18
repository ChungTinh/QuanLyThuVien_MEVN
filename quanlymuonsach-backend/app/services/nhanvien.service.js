const { ObjectId } = require("mongodb");

class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection("nhanvien");
    }

    extractNhanVienData(payload) {
        const nhanvien = {
            MSNV: payload.MSNV,
            HoTenNV: payload.HoTenNV,
            Password: payload.Password,
            ChucVu: payload.ChucVu,
            DiaChi: payload.DiaChi,
            SoDienThoai: payload.SoDienThoai,
        };
        
        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] === undefined && delete nhanvien[key]
        );
        return nhanvien;
    }

    // Thêm mới (Create)
    async create(payload) {
        const nhanvien = this.extractNhanVienData(payload);
        
        // Kiểm tra xem MSNV đã tồn tại trong cơ sở dữ liệu hay chưa
        const tonTai = await this.NhanVien.findOne({ MSNV: nhanvien.MSNV });
        if (tonTai) {
            throw new Error("Mã Nhân viên này đã tồn tại trong hệ thống!");
        }

        const result = await this.NhanVien.insertOne(nhanvien);
        return await this.NhanVien.findOne({ _id: result.insertedId });
    }

    // Lấy danh sách (Read all)
    async find(filter) {
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }

    // Lấy chi tiết 1 Nhân viên theo ID (Read one)
    async findById(id) {
        return await this.NhanVien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // Cập nhật (Update)
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhanVienData(payload);
        const result = await this.NhanVien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    // Xóa (Delete)
    async delete(id) {
        const result = await this.NhanVien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}

module.exports = NhanVienService;