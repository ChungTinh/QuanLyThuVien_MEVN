const express = require("express");
const cors = require("cors");
const app = express();

const ApiError = require("./app/api-error");
const nhaxuatbanRouter = require("./app/routes/nhaxuatban.route");
const docgiaRouter = require("./app/routes/docgia.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const sachRouter = require("./app/routes/sach.route");
const theodoimuonsachRouter = require("./app/routes/theodoimuonsach.route");


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/nhaxuatban", nhaxuatbanRouter);
app.use("/api/docgia", docgiaRouter);
app.use("/api/sach", sachRouter);
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/theodoimuonsach", theodoimuonsachRouter);


// API test
app.get("/", (req, res) => {
    res.json({ message: "Chào mừng đến với hệ thống Quản lý mượn sách!" });
});



app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});


app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;