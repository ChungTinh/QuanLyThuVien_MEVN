const NhaXuatBanService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


// Tạo và lưu 1 NXB mới
exports.create = async (req, res, next) => {
    const { TenNXB, DiaChi } = req.body;
    if (!TenNXB || !DiaChi) {
        return next(new ApiError(400, "Lỗi: Vui lòng nhập Tên NXB và Địa chỉ!"));
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    req.body.MaNXB = "NXB" + randomNum;

    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const document = await nhaxuatbanService.create(req.body);
        return res.send(document);
    } catch (error) {
        if (error.message.includes("đã tồn tại")) {
            return next(new ApiError(400, "Hệ thống bận, vui lòng thử lại!"));
        }
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo Nhà Xuất Bản."));
    }
};

// Lấy danh sách tất cả NXB
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const nxbService = new NhaXuatBanService(MongoDB.client);
        const { TenNXB } = req.query;
        
        if (TenNXB) {
            documents = await nxbService.find({
                TenNXB: { $regex: new RegExp(TenNXB), $options: "i" }
            });
        } else {
            documents = await nxbService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách NXB"));
    }
    return res.send(documents);
};

// Lấy 1 NXB theo ID
exports.findOne = async (req, res, next) => {
    try {
        const nxbService = new NhaXuatBanService(MongoDB.client);
        const document = await nxbService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Nhà Xuất Bản"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi lấy Nhà Xuất Bản có id=${req.params.id}`));
    }
};

// Cập nhật NXB
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cập nhật không được rỗng"));
    }
    try {
        const nxbService = new NhaXuatBanService(MongoDB.client);
        const document = await nxbService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Nhà Xuất Bản"));
        }
        return res.send({ message: "Cập nhật Nhà Xuất Bản thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi cập nhật Nhà Xuất Bản có id=${req.params.id}`));
    }
};

// Xóa 1 NXB
exports.delete = async (req, res, next) => {
    try {
        const nxbService = new NhaXuatBanService(MongoDB.client);
        const document = await nxbService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Nhà Xuất Bản"));
        }
        return res.send({ message: "Xóa Nhà Xuất Bản thành công" });
    } catch (error) {
        return next(new ApiError(400, error.message || `Không thể xóa Nhà Xuất Bản có id=${req.params.id}`));
    }
};