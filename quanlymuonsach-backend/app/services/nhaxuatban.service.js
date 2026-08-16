const { ObjectId } = require("mongodb");

class NhaXuatBanService {
    constructor(client) {
        this.NhaXuatBan = client.db().collection("nhaxuatban");
        this.Sach = client.db().collection("sach"); 
    }

    extractNhaXuatBanData(payload) {
        const nhaxuatban = {
            MaNXB: payload.MaNXB,
            TenNXB: payload.TenNXB,
            DiaChi: payload.DiaChi,
        };
        
        Object.keys(nhaxuatban).forEach(
            (key) => nhaxuatban[key] === undefined && delete nhaxuatban[key]
        );
        return nhaxuatban;
    }

    // Thêm mới (Create)
    async create(payload) {
        const nhaxuatban = this.extractNhaXuatBanData(payload);
        const result = await this.NhaXuatBan.findOneAndUpdate(
            { MaNXB: nhaxuatban.MaNXB },
            { $set: nhaxuatban },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // Lấy danh sách (Read all)
    async find(filter) {
        const cursor = await this.NhaXuatBan.find(filter);
        return await cursor.toArray();
    }

    // Lấy chi tiết 1 NXB theo ID (Read one)
    async findById(id) {
        return await this.NhaXuatBan.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // Cập nhật (Update)
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhaXuatBanData(payload);
        const result = await this.NhaXuatBan.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    // Xóa (Delete)
    async delete(id) {
        const nxb = await this.NhaXuatBan.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        if (!nxb) return null; 

        const soSachLienQuan = await this.Sach.countDocuments({ MaNXB: nxb.MaNXB });

        if (soSachLienQuan > 0) {
            throw new Error(`Không thể xóa! Đang có ${soSachLienQuan} cuốn sách thuộc Nhà Xuất Bản này.`);
        }

        const result = await this.NhaXuatBan.findOneAndDelete({ _id: nxb._id });
        return result;
    }
}

module.exports = NhaXuatBanService;