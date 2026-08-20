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
            HanTra: payload.HanTra, 
            TrangThai: payload.TrangThai || 'Chờ duyệt', 
        };
        
        Object.keys(theodoi).forEach(
            (key) => theodoi[key] === undefined && delete theodoi[key]
        );
        return theodoi;
    }

    // Tạo (Create)
    async create(payload) {
        const theodoi = this.extractData(payload);
        const sach = await this.Sach.findOne({ MaSach: theodoi.MaSach });
        if (!sach) {
            throw new Error("Mã sách không tồn tại trong hệ thống!");
        }

        // --- BẮT ĐẦU ĐOẠN KIỂM TRA PHẠT QUÁ HẠN 3 LẦN ---
        const danhSachViPham = await this.TheoDoi.find({
            MaDocGia: theodoi.MaDocGia,
            TrangThai: { $in: ['Quá hạn', 'Đã trả (Trễ)'] }
        }).toArray();

        if (danhSachViPham.length >= 3) {
            let thoiGianGanNhat = 0;
            danhSachViPham.forEach(p => {
                // Nếu chưa trả (đang quá hạn) thì lấy ngày hôm nay làm mốc, nếu trả trễ thì lấy ngày trả thực tế
                const tg = p.NgayTra ? new Date(p.NgayTra).getTime() : new Date().getTime();
                if (tg > thoiGianGanNhat) thoiGianGanNhat = tg;
            });
            
            const ngayMoKhoa = new Date(thoiGianGanNhat);
            ngayMoKhoa.setDate(ngayMoKhoa.getDate() + 3);

            if (new Date() < ngayMoKhoa) {
                const dateStr = ngayMoKhoa.toISOString().split('T')[0];
                throw new Error(`Tài khoản bị tạm khóa mượn sách đến ${dateStr} do vi phạm quá hạn từ 3 lần trở lên!`);
            }
        }

        // Những người đang giữ sách (bao gồm Chờ duyệt, Đang mượn, Quá hạn)
        const soSachKhachDangMuon = await this.TheoDoi.countDocuments({
            MaDocGia: theodoi.MaDocGia,
            TrangThai: { $in: ['Chờ duyệt', 'Đang mượn', 'Quá hạn'] } 
        });

        if (soSachKhachDangMuon >= 5) {
            throw new Error("Bạn đã đạt giới hạn mượn tối đa 5 cuốn sách (chưa trả). Vui lòng trả bớt sách trước khi mượn thêm!");
        }

        // Tính toán sách còn trống
        const soLuongDangMuon = await this.TheoDoi.countDocuments({
            MaSach: theodoi.MaSach,
            TrangThai: { $in: ['Chờ duyệt', 'Đang mượn', 'Quá hạn'] } 
        });

        const soSachConLai = sach.SoQuyen - soLuongDangMuon;
        if (soSachConLai <= 0) {
            throw new Error("Sách này hiện đã hết, vui lòng quay lại sau!");
        }

        const result = await this.TheoDoi.insertOne(theodoi);
        return await this.TheoDoi.findOne({ _id: result.insertedId });
    }

    // Lấy danh sách (Read all)
    async find(filter) {
        const cursor = await this.TheoDoi.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.TheoDoi.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

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

    async delete(id) {
        const result = await this.TheoDoi.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }
}
module.exports = TheoDoiMuonSachService;