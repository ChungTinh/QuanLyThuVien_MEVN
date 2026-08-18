const TheoDoiMuonSachService = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


// Tạo và lưu 1 lượt mượn sách mới
exports.create = async (req, res, next) => {
    const { MaDocGia, MaSach, NgayMuon } = req.body;
    if (!MaDocGia || !MaSach || !NgayMuon) {
        return next(new ApiError(400, "Lỗi: Vui lòng cung cấp đầy đủ Mã Độc Giả, Mã Sách và Ngày Mượn!"));
    }
    try {
        const theodoiService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theodoiService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(400, error.message || "Đã xảy ra lỗi khi ghi nhận mượn sách"));
    }
};

// Lấy danh sách tất cả lượt mượn sách
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const theodoiService = new TheoDoiMuonSachService(MongoDB.client);
        documents = await theodoiService.find({});
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách mượn sách"));
    }
    return res.send(documents);
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
        return next(new ApiError(400, "Dữ liệu cập nhật không được rỗng"));
    }
    try {
        const theodoiService = new TheoDoiMuonSachService(MongoDB.client);
        const document = await theodoiService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy lượt mượn này"));
        }
        return res.send({ message: "Cập nhật (Trả sách) thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi cập nhật lượt mượn id=${req.params.id}`));
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