<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-primary">👑 Quản Lý Nhân Sự</h3>
      <!-- Nút thêm nhân viên -->
      <button
        @click="moFormThem"
        class="btn btn-primary text-white fw-bold shadow-sm rounded-pill px-4"
      >
        + Thêm Nhân Viên
      </button>
    </div>

    <!-- Bảng danh sách -->
    <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 text-center">
            <thead class="table-light text-secondary">
              <tr>
                <th class="py-3">MSNV</th>
                <th class="py-3 text-start">Họ Tên</th>
                <th class="py-3">Chức Vụ</th>
                <th class="py-3">Điện Thoại</th>
                <th class="py-3 text-start">Địa Chỉ</th>
                <!-- Đã bổ sung cột Địa Chỉ -->
                <th class="py-3">Hành Động</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <tr v-if="nhanViens.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  Chưa có dữ liệu.
                </td>
              </tr>
              <tr v-for="nv in nhanViens" :key="nv._id">
                <td class="fw-bold">{{ nv.MSNV }}</td>
                <td class="text-start fw-bold text-primary">
                  {{ nv.HoTenNV }}
                </td>
                <td>
                  <span
                    class="badge rounded-pill px-3 shadow-sm"
                    :class="
                      nv.ChucVu === 'Quản Trị Viên'
                        ? 'bg-danger'
                        : 'bg-secondary'
                    "
                  >
                    {{ nv.ChucVu }}
                  </span>
                </td>
                <td class="text-muted">{{ nv.SoDienThoai }}</td>
                <td class="text-start text-muted">{{ nv.DiaChi }}</td>
                <!-- Hiển thị dữ liệu Địa Chỉ -->
                <td>
                  <div class="d-flex justify-content-center">
                    <button
                      @click="xoaNhanVien(nv._id, nv.HoTenNV)"
                      class="btn btn-sm btn-danger rounded-pill px-3 fw-medium shadow-sm d-flex align-items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        class="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.813 1H3.188l.836 10.42a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92l.836-10.42ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v8.5a.5.5 0 0 0 1 0V5Zm-6 0a.5.5 0 0 0-1 0v8.5a.5.5 0 0 0 1 0V5Z"
                        />
                      </svg>
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Thêm Nhân Viên -->
    <div class="modal fade" id="nhanVienModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content border-0 rounded-4 shadow">
          <div
            class="modal-header bg-primary text-white border-0 rounded-top-4"
          >
            <h5 class="modal-title fw-bold">➕ Thêm Nhân Sự Mới</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="luuNhanVien">
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Mã Số (MSNV)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.MSNV"
                    required
                  />
                </div>
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Mật khẩu</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.Password"
                    required
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold small text-secondary"
                  >Họ Tên</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.HoTenNV"
                  required
                />
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Chức Vụ</label
                  >
                  <select class="form-select" v-model="formData.ChucVu">
                    <option value="Nhân Viên">Nhân Viên</option>
                    <option value="Quản Trị Viên">Quản Trị Viên</option>
                  </select>
                </div>
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Điện Thoại</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.SoDienThoai"
                    required
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="form-label fw-bold small text-secondary"
                  >Địa Chỉ</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.DiaChi"
                  required
                />
              </div>
              <div class="text-end">
                <button
                  type="button"
                  class="btn btn-light rounded-pill fw-medium px-4 me-2"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  class="btn btn-primary rounded-pill fw-bold shadow-sm px-4"
                >
                  Tạo Tài Khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NhanVienService from "@/services/nhanvien.service";
import * as bootstrap from "bootstrap";

export default {
  name: "QuanLyNhanVien",
  data() {
    return {
      nhanViens: [],
      modalInstance: null,
      formData: {
        MSNV: "",
        Password: "123",
        HoTenNV: "",
        ChucVu: "Nhân Viên",
        DiaChi: "",
        SoDienThoai: "",
      },
    };
  },
  mounted() {
    this.layDanhSach();
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("nhanVienModal"),
    );
  },
  methods: {
    async layDanhSach() {
      try {
        this.nhanViens = await NhanVienService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    moFormThem() {
      this.formData = {
        MSNV: "",
        Password: "123",
        HoTenNV: "",
        ChucVu: "Nhân Viên",
        DiaChi: "",
        SoDienThoai: "",
      };
      this.modalInstance.show();
    },
    async luuNhanVien() {
      try {
        await NhanVienService.create(this.formData);
        alert("Đã thêm nhân sự thành công!");
        this.modalInstance.hide();
        this.layDanhSach();
      } catch (error) {
        alert("Lỗi: " + (error.response?.data?.message || "Trùng MSNV!"));
      }
    },
    async xoaNhanVien(id, ten) {
      const nguoiDangDangNhap = JSON.parse(
        localStorage.getItem("nhanvien_admin"),
      );
      if (nguoiDangDangNhap._id === id) {
        alert("LỖI BẢO MẬT: Bạn không thể tự xóa tài khoản của chính mình!");
        return;
      }
      if (confirm(`Chắc chắn muốn xóa tài khoản của "${ten}"?`)) {
        try {
          await NhanVienService.delete(id);
          this.layDanhSach();
          alert("Xóa nhân viên thành công!");
        } catch (error) {
          alert("Lỗi khi xóa!");
        }
      }
    },
  },
};
</script>
