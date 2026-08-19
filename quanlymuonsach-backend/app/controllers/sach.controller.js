const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Khởi tạo Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Helper function: Tách đuôi file và đổi tên để tránh lỗi ký tự đặc biệt
const generateSafeFileName = (originalName) => {
    const ext = originalName.split('.').pop();
    return `${Date.now()}.${ext}`;
};


// Tạo và lưu 1 Sách mới
exports.create = async (req, res, next) => {
    const { TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia } = req.body;
    if (!TenSach || !DonGia || !SoQuyen || !NamXuatBan || !MaNXB || !TacGia) {
        return next(new ApiError(400, "Lỗi: Thiếu thông tin bắt buộc (Tên sách, Giá, Số lượng, Năm XB, Mã NXB, Tác giả)!"));
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    req.body.MaSach = "S" + randomNum;

    // Xử lý upload ảnh 
    if (req.file) {
        // Kiểm tra xem file đã vào được RAM chưa 
        if (!req.file.buffer) {
            return next(new ApiError(400, "[Lỗi Hệ Thống]: Bộ đệm file trống. Vui lòng kiểm tra lại upload.middleware.js."));
        }

        const fileName = generateSafeFileName(req.file.originalname);
        
        try {
            // Đẩy file lên Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('quanlythuvien')
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                });

            if (uploadError) {
                return next(new ApiError(400, `[Supabase Upload Error]: ${uploadError.message}`));
            }

            // Lấy link ảnh công khai từ Supabase Storage
            const { data: publicUrlData } = supabase.storage
                .from('quanlythuvien')
                .getPublicUrl(fileName);

            // Gán link ảnh vào dữ liệu trước khi lưu vào MongoDB
            req.body.HinhAnh = publicUrlData.publicUrl;

        } catch (error) {
            return next(new ApiError(500, `[Supabase System Error]: ${error.message}`));
        }
    }
    
    // Lưu thông tin sách vào MongoDB
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.create(req.body);
        return res.send(document);
    } catch (error) {
        if (error.message.includes("đã tồn tại")) {
            return next(new ApiError(400, error.message));
        }
        return next(new ApiError(500, "Hệ thống gặp sự cố khi lưu Sách vào Cơ sở dữ liệu."));
    }
};

// Lấy danh sách tất cả Sách (có thể lọc theo tên sách)
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const sachService = new SachService(MongoDB.client);
        const { TenSach } = req.query; 
        
        if (TenSach) {
            documents = await sachService.find({
                TenSach: { $regex: new RegExp(TenSach), $options: "i" }
            });
        } else {
            documents = await sachService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "Lỗi truy xuất danh sách sách từ Cơ sở dữ liệu."));
    }
    return res.send(documents);
};

// Lấy 1 Sách theo ID
exports.findOne = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, `Không tìm thấy Sách với ID: ${req.params.id}`));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Lỗi truy xuất thông tin Sách."));
    }
};

// Cập nhật thông tin Sách
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0 && !req.file) {
        return next(new ApiError(400, "Form gửi lên trống, không có dữ liệu nào để cập nhật!"));
    }

    // Xử lý upload ảnh nếu có file gửi lên
    if (req.file) {
        if (!req.file.buffer) {
            return next(new ApiError(400, "[Lỗi Hệ Thống]: Bộ đệm file trống. Vui lòng kiểm tra lại upload.middleware.js."));
        }

        const fileName = generateSafeFileName(req.file.originalname);
        try {
            const { error: uploadError } = await supabase.storage
                .from('quanlythuvien')
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                });
            if (uploadError) {
                return next(new ApiError(400, `[Supabase Upload Error]: ${uploadError.message}`));
            }

            const { data: publicUrlData } = supabase.storage
                .from('quanlythuvien')
                .getPublicUrl(fileName);
            req.body.HinhAnh = publicUrlData.publicUrl;

        } catch (error) {
            return next(new ApiError(500, `[Supabase System Error]: ${error.message}`));
        }
    }

    // Cập nhật thông tin sách vào MongoDB
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, `Không tìm thấy Sách với ID: ${req.params.id} để cập nhật.`));
        }
        return res.send({ message: "Cập nhật thông tin Sách thành công!" });
    } catch (error) {
        return next(new ApiError(500, "Hệ thống gặp sự cố khi cập nhật Cơ sở dữ liệu."));
    }
};

// Xóa 1 Sách
exports.delete = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, `Không tìm thấy Sách với ID: ${req.params.id} để xóa.`));
        }
        return res.send({ message: "Xóa Sách khỏi hệ thống thành công!" });
    } catch (error) {
        // Bắt lỗi khi Sách đang có người mượn (Lỗi do service throw ra)
        return next(new ApiError(400, error.message || "Không thể thực hiện lệnh xóa."));
    }
};