const NhanVienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


// Tạo và lưu 1 Nhân viên mới
exports.create = async (req, res, next) => {
    const { HoTenNV, ChucVu, Password, SoDienThoai } = req.body;
    if (!HoTenNV || !ChucVu || !Password || !SoDienThoai) {
        return next(new ApiError(400, "Lỗi: Vui lòng nhập đầy đủ thông tin bắt buộc (Họ Tên, Chức vụ, Mật khẩu, SĐT)!"));
    }

    // Tạo mã nhân viên ngẫu nhiên
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    req.body.MSNV = "NV" + randomNum;

    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.create(req.body);
        return res.send(document);
    } catch (error) {
        if (error.message.includes("đã tồn tại")) {
            return next(new ApiError(400, "Hệ thống bận, vui lòng thử thêm lại!"));
        }
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo Nhân viên"));
    }
};


// Lấy danh sách tất cả Nhân viên
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        documents = await nhanvienService.find({});
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách Nhân viên"));
    }
    return res.send(documents);
};


// Lấy 1 Nhân viên theo ID
exports.findOne = async (req, res, next) => {
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Nhân viên"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi lấy Nhân viên có id=${req.params.id}`));
    }
};


// Cập nhật thông tin Nhân viên
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không được rỗng"));
    }
    if (req.body.Password) {
        delete req.body.Password;
    }
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Nhân viên"));
        }
        return res.send({ message: "Cập nhật Nhân viên thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi cập nhật Nhân viên có id=${req.params.id}`));
    }
};


// Xóa 1 Nhân viên
exports.delete = async (req, res, next) => {
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const document = await nhanvienService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Nhân viên"));
        }
        return res.send({ message: "Xóa Nhân viên thành công" });
    } catch (error) {
        return next(new ApiError(500, `Không thể xóa Nhân viên có id=${req.params.id}`));
    }
};


// Đăng nhập Nhân viên
exports.login = async (req, res, next) => {
    if (!req.body?.MSNV || !req.body?.Password) {
        return next(new ApiError(400, "Mã nhân viên và mật khẩu không được để trống"));
    }
    
    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        const danhSach = await nhanvienService.find({
            MSNV: req.body.MSNV,
            Password: req.body.Password
        });

        if (danhSach.length > 0) {
            return res.send({ message: "Đăng nhập thành công", user: danhSach[0] });
        } else {
            return next(new ApiError(401, "MSNV hoặc mật khẩu không chính xác!"));
        }
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi đăng nhập"));
    }
};

// Đổi mật khẩu nhân viên
exports.updatePassword = async (req, res, next) => {
    const { OldPassword, NewPassword } = req.body;
    
    if (!OldPassword || !NewPassword) {
        return next(new ApiError(400, "Vui lòng cung cấp cả mật khẩu cũ và mới!"));
    }

    try {
        const nhanvienService = new NhanVienService(MongoDB.client);
        
        const nhanvien = await nhanvienService.findById(req.params.id);
        if (!nhanvien) {
            return next(new ApiError(404, "Không tìm thấy tài khoản."));
        }

        if (nhanvien.Password !== OldPassword) {
            return next(new ApiError(401, "Mật khẩu cũ không chính xác!"));
        }

        await nhanvienService.update(req.params.id, { Password: NewPassword });
        return res.send({ message: "Đổi mật khẩu thành công!" });

    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi đổi mật khẩu."));
    }
};