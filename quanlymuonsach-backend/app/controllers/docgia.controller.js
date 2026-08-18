const DocGiaService = require("../services/docgia.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


// Tạo và lưu 1 Độc giả mới
exports.create = async (req, res, next) => {
    const { HoLot, Ten, Phai, DienThoai, Password } = req.body;
    if (!HoLot || !Ten || !Phai || !DienThoai || !Password) {
        return next(new ApiError(400, "Lỗi: Không được bỏ trống thông tin bắt buộc (Họ lót, Tên, Giới tính, SĐT, Mật khẩu)!"));
    }

    // Tạo mã độc giả ngẫu nhiên
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    req.body.MaDocGia = "DG" + randomNum;

    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.create(req.body);
        return res.send(document);
    } catch (error) {
        if (error.message.includes("đã tồn tại")) {
            return next(new ApiError(400, "Hệ thống bận, vui lòng bấm đăng ký lại!")); 
        }
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo Độc giả."));
    }
};

// Lấy danh sách tất cả Độc giả
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const { Ten } = req.query; 
        
        if (Ten) {
            documents = await docgiaService.find({
                Ten: { $regex: new RegExp(Ten), $options: "i" }
            });
        } else {
            documents = await docgiaService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách Độc giả"));
    }
    return res.send(documents);
};

// Lấy 1 Độc giả theo ID
exports.findOne = async (req, res, next) => {
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Độc giả"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi lấy Độc giả có id=${req.params.id}`));
    }
};

// Cập nhật thông tin Độc giả
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không được rỗng"));
    }
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Độc giả"));
        }
        return res.send({ message: "Cập nhật Độc giả thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi cập nhật Độc giả có id=${req.params.id}`));
    }
};

// Xóa 1 Độc giả
exports.delete = async (req, res, next) => {
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Độc giả"));
        }
        return res.send({ message: "Xóa Độc giả thành công" });
    } catch (error) {
        return next(new ApiError(400, error.message || `Không thể xóa Độc giả có id=${req.params.id}`));
    }
};

// Đăng nhập Độc giả
exports.login = async (req, res, next) => {
    if (!req.body?.MaDocGia || !req.body?.Password) {
        return next(new ApiError(400, "Mã độc giả và mật khẩu không được để trống"));
    }
    
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const danhSach = await docgiaService.find({
            MaDocGia: req.body.MaDocGia,
            Password: req.body.Password
        });

        if (danhSach.length > 0) {
            return res.send({ message: "Đăng nhập thành công", user: danhSach[0] });
        } else {
            return next(new ApiError(401, "Mã độc giả hoặc mật khẩu không chính xác!"));
        }
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi đăng nhập"));
    }
};


// Đổi mật khẩu Độc giả
exports.updatePassword = async (req, res, next) => {
    const { OldPassword, NewPassword } = req.body;
    
    if (!OldPassword || !NewPassword) {
        return next(new ApiError(400, "Vui lòng cung cấp cả mật khẩu cũ và mới!"));
    }

    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        
        const docgia = await docgiaService.findById(req.params.id);
        if (!docgia) {
            return next(new ApiError(404, "Không tìm thấy tài khoản."));
        }

        // Kiểm tra mật khẩu cũ (OldPassword) có khớp với mật khẩu hiện tại không
        if (docgia.Password !== OldPassword) {
            return next(new ApiError(401, "Mật khẩu cũ không chính xác!"));
        }

        // Cập nhật mật khẩu mới
        await docgiaService.update(req.params.id, { Password: NewPassword });
        return res.send({ message: "Đổi mật khẩu thành công!" });

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi đổi mật khẩu."));
    }
};