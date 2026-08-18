const { ObjectId } = require("mongodb");

class DocGiaService {
    constructor(client) {
        this.DocGia = client.db().collection("docgia");
        this.TheoDoi = client.db().collection("theodoimuonsach"); 
    }

    extractDocGiaData(payload) {
        const docgia = {
            MaDocGia: payload.MaDocGia,
            Password: payload.Password,
            HoLot: payload.HoLot,
            Ten: payload.Ten,
            NgaySinh: payload.NgaySinh,
            Phai: payload.Phai,
            DiaChi: payload.DiaChi,
            DienThoai: payload.DienThoai,
        };
        
        Object.keys(docgia).forEach(
            (key) => docgia[key] === undefined && delete docgia[key]
        );
        return docgia;
    }

    // Thêm mới (Create)
    async create(payload) {
    const docgia = this.extractDocGiaData(payload);

    const tonTai = await this.DocGia.findOne({ MaDocGia: docgia.MaDocGia });
    if (tonTai) {
        throw new Error("Mã Độc giả này đã tồn tại trong hệ thống!");
    }

    const result = await this.DocGia.insertOne(docgia);
    return await this.DocGia.findOne({ _id: result.insertedId });
}

    // Lấy danh sách (Read all)
    async find(filter) {
        const cursor = await this.DocGia.find(filter);
        return await cursor.toArray();
    }

    // Lấy chi tiết 1 Độc giả theo ID (Read one)
    async findById(id) {
        return await this.DocGia.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // Cập nhật (Update)
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractDocGiaData(payload);
        const result = await this.DocGia.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    // Xóa (Delete)
    async delete(id) {
        const docgia = await this.DocGia.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        if (!docgia) return null;

        const lichSuMuon = await this.TheoDoi.countDocuments({ MaDocGia: docgia.MaDocGia });
        if (lichSuMuon > 0) {
            throw new Error(`Không thể xóa! Độc giả này đang có ${lichSuMuon} lượt giao dịch mượn/trả sách.`);
        }

        return await this.DocGia.findOneAndDelete({ _id: docgia._id });
    }
}

module.exports = DocGiaService;