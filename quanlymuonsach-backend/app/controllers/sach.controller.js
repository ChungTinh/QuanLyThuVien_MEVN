const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);



// Tạo và lưu 1 Sách mới
exports.create = async (req, res, next) => {
    if (!req.body?.MaSach) {
        return next(new ApiError(400, "Mã Sách không được để trống"));
    }

    if (req.file) {
    // Tạo tên file độc nhất 
    const fileName = Date.now() + "-" + req.file.originalname.replace(/\s+/g, '-');
    
    // push file lên mây Supabase
    const { data, error } = await supabase.storage
        .from('quanlythuvien') // Tên bucket 
        .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
        });

    if (error) {
        throw new Error("Lỗi khi upload ảnh lên đám mây!");
    }

    const { data: publicUrlData } = supabase.storage
        .from('quanlythuvien')
        .getPublicUrl(fileName);

    req.body.HinhAnh = publicUrlData.publicUrl;
}
    
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "Đã xảy ra lỗi khi tạo Sách"));
    }
};

// Lấy danh sách tất cả Sách
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
        return next(new ApiError(500, "Đã xảy ra lỗi khi lấy danh sách Sách"));
    }
    return res.send(documents);
};

// Lấy 1 Sách theo ID
exports.findOne = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Sách"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Lỗi khi lấy Sách có id=${req.params.id}`));
    }
};

// Cập nhật Sách
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0 && !req.file) {
        return next(new ApiError(400, "Dữ liệu cập nhật không được rỗng"));
    }

    if (req.file) {
    // Tạo tên file độc nhất 
    const fileName = Date.now() + "-" + req.file.originalname.replace(/\s+/g, '-');
    
    // push file lên mây Supabase
    const { data, error } = await supabase.storage
        .from('quanlythuvien') // Tên bucket 
        .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
        });

    if (error) {
        throw new Error("Lỗi khi upload ảnh lên đám mây!");
    }

    const { data: publicUrlData } = supabase.storage
        .from('quanlythuvien')
        .getPublicUrl(fileName);

    req.body.HinhAnh = publicUrlData.publicUrl;
}

    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Sách"));
        }
        return res.send({ message: "Cập nhật Sách thành công" });
    } catch (error) {
        return next(new ApiError(500, `Lỗi cập nhật Sách có id=${req.params.id}`));
    }
};

// Xóa 1 Sách
exports.delete = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Sách"));
        }
        return res.send({ message: "Xóa Sách thành công" });
    } catch (error) {
        return next(new ApiError(400, error.message || `Không thể xóa Sách có id=${req.params.id}`));
    }
};