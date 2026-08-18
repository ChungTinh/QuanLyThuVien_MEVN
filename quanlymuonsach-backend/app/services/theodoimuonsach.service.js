const { ObjectId } = require("mongodb");

class TheoDoiMuonSachService {
    constructor(client) {
        this.TheoDoi = client.db().collection("theodoimuonsach");
        this.Sach = client.db().collection("sach");
    }

    extractData(payload) {
        const theodoi = {
            MaDocGia: payload.MaDocGia,
            MaSach: payload.MaSach,
            NgayMuon: payload.NgayMuon || new Date().toISOString().split('T')[0],
            NgayTra: payload.NgayTra || null, 
        };
        
        Object.keys(theodoi).forEach(
            (key) => theodoi[key] === undefined && delete theodoi[key]
        );
        return theodoi;
    }

    // Thêm mới (Create)
    // Thêm mới (Create)
    async create(payload) {
        const theodoi = this.extractData(payload);

        // 1. Kiểm tra Sách có tồn tại trong hệ thống
        const sach = await this.Sach.findOne({ MaSach: theodoi.MaSach });
        if (!sach) {
            throw new Error("Mã sách không tồn tại trong hệ thống!");
        }

        // 2. Đếm số lượng người đang mượn cuốn sách này (NgayTra = null)
        const soLuongDangMuon = await this.TheoDoi.countDocuments({
            MaSach: theodoi.MaSach,
            NgayTra: null 
        });

        // 3. Tính toán số sách còn thực tế
        const soSachConLai = sach.SoQuyen - soLuongDangMuon;

        // 4. Chặn nếu hết sách
        if (soSachConLai <= 0) {
            throw new Error("Sách này hiện đã được mượn hết, vui lòng quay lại sau!");
        }

        // 5. Ghi nhận lượt mượn 
        const result = await this.TheoDoi.insertOne(theodoi);
        return await this.TheoDoi.findOne({ _id: result.insertedId });
    }

    // Lấy danh sách (Read all)
    async find(filter) {
        const cursor = await this.TheoDoi.find(filter);
        return await cursor.toArray();
    }

    // Lấy chi tiết 1 lượt mượn theo ID (Read one)
    async findById(id) {
        return await this.TheoDoi.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // Cập nhật (Update) (ghi nhận trả sách)
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractData(payload);
        const result = await this.TheoDoi.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    // Xóa (Delete)
    async delete(id) {
        const result = await this.TheoDoi.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}

module.exports = TheoDoiMuonSachService;