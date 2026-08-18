const { ObjectId } = require("mongodb");

class SachService {
    constructor(client) {
        this.Sach = client.db().collection("sach");
        this.TheoDoi = client.db().collection("theodoimuonsach");
    }

    extractSachData(payload) {
        const sach = {
            MaSach: payload.MaSach,
            TenSach: payload.TenSach,
            DonGia: payload.DonGia,
            SoQuyen: payload.SoQuyen,
            NamXuatBan: payload.NamXuatBan,
            MaNXB: payload.MaNXB,
            TacGia: payload.TacGia,
            HinhAnh: payload.HinhAnh,
        };
        
        Object.keys(sach).forEach(
            (key) => sach[key] === undefined && delete sach[key]
        );
        return sach;
    }

    // Thêm mới (Create)
    // Thêm mới (Create)
    async create(payload) {
        const sach = this.extractSachData(payload);
        
        // Kiểm tra xem MaSach đã tồn tại chưa
        const tonTai = await this.Sach.findOne({ MaSach: sach.MaSach });
        if (tonTai) {
            throw new Error("Mã Sách này đã tồn tại trong kho!");
        }

        // Tạo mới nếu chưa tồn tại
        const result = await this.Sach.insertOne(sach);
        return await this.Sach.findOne({ _id: result.insertedId });
    }

    // Lấy danh sách (Read all)
    async find(filter) {
        const cursor = await this.Sach.find(filter);
        return await cursor.toArray();
    }

    // Lấy chi tiết 1 Sách theo ID (Read one)
    async findById(id) {
        return await this.Sach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // Cập nhật (Update)
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractSachData(payload);
        const result = await this.Sach.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    // Xóa (Delete)
    async delete(id) {
        const sach = await this.Sach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        if (!sach) return null;

        const danhSachMuon = await this.TheoDoi.find({ MaSach: sach.MaSach }).toArray();

        if (danhSachMuon.length > 0) {
            const chiTiet = danhSachMuon.slice(0, 3).map(
                (item) => `[ĐG: ${item.MaDocGia} - Ngày: ${item.NgayMuon}]`
            );
            
            let thongBaoError = `Không thể xóa Sách! Sách này đang dính ${danhSachMuon.length} lịch sử mượn/trả.\nChi tiết: ${chiTiet.join(", ")}`;
            if (danhSachMuon.length > 3) thongBaoError += `...`;

            throw new Error(thongBaoError);
        }
        
        return await this.Sach.findOneAndDelete({ _id: sach._id });
    }
}

module.exports = SachService;