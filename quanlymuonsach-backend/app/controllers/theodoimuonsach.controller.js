const TheoDoiMuonSachService = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");
const DocGiaService = require("../services/docgia.service");
const ApiError = require("../api-error");


// Tạo và lưu 1 lượt mượn sách mới
exports.create = async (req, res, next) => {
    const { MaDocGia, MaSach, NgayMuon, HanTra } = req.body;

    if (!MaDocGia || !MaSach || !NgayMuon || !HanTra) {
        return next(new ApiError(400, "Lỗi: Vui lòng cung cấp Độc Giả, Sách, Ngày mượn và Ngày hẹn trả!"));
    }

    // Bắt lỗi nếu khách chọn ngày trả nhỏ hơn ngày mượn
    if (new Date(HanTra) < new Date(NgayMuon)) {
        return next(new ApiError(400, "Lỗi: Ngày hẹn trả không được nhỏ hơn ngày mượn!"));
    }

    try {
        const theodoiService = new TheoDoiMuonSachService(MongoDB.client);
        
        // KIỂM TRA MÃ ĐỘC GIẢ CÓ TỒN TẠI KHÔNG
        const docgiaService = new DocGiaService(MongoDB.client);
        const dg = await docgiaService.find({ MaDocGia: MaDocGia });
        if (dg.length === 0) {
            return next(new ApiError(400, "Lỗi: Độc giả không tồn tại!"));
        }

        const document = await theodoiService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(400, error.message || "Xảy ra lỗi khi ghi nhận lịch sử mượn sách"));
    }
};

// Lấy danh sách tất cả lượt mượn sách
exports.findAll = async (req, res, next) => {
    try {
        const theodoiService = new TheoDoiMuonSachService(MongoDB.client);
        
        const homNay = new Date().toISOString().split('T')[0];
        
        await theodoiService.TheoDoi.updateMany(
            {
                NgayTra: null, 
                TrangThai: "Đang mượn", 
                HanTra: { $lt: homNay } 
            },
            {
                $set: { TrangThai: "Quá hạn" } 
            }
        );

        const documents = await theodoiService.find({});
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "Xảy ra lỗi khi lấy danh sách mượn sách"));
    }
};

// Lấy 1 lượt mượn sách theo ID
exports.findOne = async (req, res, next) => {
    try {
        const theodoiService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theodoiService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy lượt mượn này"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi lấy thông tin mượn sách id=${req.params.id}`));
    }
};

// Cập nhật lượt mượn sách (Trả sách)
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không rỗng"));
    }
    try {
        const theodoiService = new TheoDoiMuonSachService(MongoDB.client);
        
        const document = await theodoiService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy phiếu mượn"));
        }
        return res.send({ message: "Cập nhật phiếu thành công", data: document });
    } catch (error) {
        return next(new ApiError(500, `Lỗi cập nhật phiếu id=${req.params.id}`));
    }
};

// Xóa 1 lượt mượn sách
exports.delete = async (req, res, next) => {
    try {
        const theodoiService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theodoiService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy lượt mượn này"));
        }
        return res.send({ message: "Xóa lịch sử mượn thành công" });
    } catch (error) {
        return next(new ApiError(500, `Không thể xóa lượt mượn id=${req.params.id}`));
    }
};