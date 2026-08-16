<template>
  <div>
    <!-- Tiêu đề & Khung tìm kiếm -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-primary">📚 Quản Lý Sách</h3>

      <div
        class="input-group w-50 shadow-sm rounded-pill overflow-hidden border border-primary"
      >
        <input
          type="text"
          class="form-control border-0 px-4 shadow-none"
          v-model="searchText"
          @keyup.enter="timKiem"
          placeholder="Nhập tên sách để tìm..."
        />
        <button
          v-if="searchText"
          class="btn btn-light text-danger fw-bold border-0 px-3"
          type="button"
          @click="xoaTimKiem"
        >
          Xóa
        </button>
        <button
          class="btn btn-primary px-4 fw-bold border-0"
          type="button"
          @click="timKiem"
        >
          🔍 Tìm
        </button>
      </div>

      <button
        @click="moFormThem"
        class="btn btn-primary text-white fw-bold shadow-sm rounded-pill px-4"
      >
        + Thêm Sách Mới
      </button>
    </div>

    <!-- Bảng danh sách -->
    <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 text-center">
            <thead class="table-light text-secondary">
              <tr>
                <th class="py-3" style="width: 80px">Ảnh</th>
                <th class="py-3">Mã Sách</th>
                <th class="py-3 text-start">Tên Sách</th>
                <th class="py-3">Tác Giả</th>
                <th class="py-3">Giá Tiền</th>
                <th class="py-3">Kho</th>
                <th class="py-3">Hành Động</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <tr v-if="sachs.length === 0">
                <td colspan="7" class="text-center py-5 text-muted">
                  Chưa có dữ liệu sách.
                </td>
              </tr>
              <tr v-for="sach in sachs" :key="sach._id">
                <td>
                  <img
                    :src="
                      sach.HinhAnh
                        ? 'http://localhost:3000' + sach.HinhAnh
                        : 'https://via.placeholder.com/50'
                    "
                    class="rounded shadow-sm"
                    style="width: 50px; height: 70px; object-fit: cover"
                  />
                </td>
                <td class="fw-bold">{{ sach.MaSach }}</td>
                <td class="text-start text-primary fw-bold">
                  {{ sach.TenSach }}
                </td>
                <td>{{ sach.TacGia }}</td>
                <td class="text-danger fw-bold">
                  {{ sach.DonGia.toLocaleString("vi-VN") }}đ
                </td>
                <td>
                  <span
                    class="badge rounded-pill shadow-sm px-3"
                    :class="sach.SoQuyen > 0 ? 'bg-success' : 'bg-danger'"
                  >
                    {{ sach.SoQuyen }} cuốn
                  </span>
                </td>

                <!-- Cột Hành Động mới -->
                <td>
                  <div class="d-flex gap-2 justify-content-center">
                    <button
                      @click="moFormSua(sach)"
                      class="btn btn-sm btn-warning text-dark rounded-pill px-3 fw-medium shadow-sm d-flex align-items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      Sửa
                    </button>
                    <button
                      @click="xoaSach(sach._id, sach.TenSach)"
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

    <!-- MODAL THÊM/SỬA SÁCH -->
    <div class="modal fade" id="sachModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0 rounded-4 shadow">
          <div
            class="modal-header bg-primary text-white border-0 rounded-top-4"
          >
            <h5 class="modal-title fw-bold">
              {{ isEdit ? "✏️ Cập Nhật Sách" : "➕ Thêm Sách Mới" }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="luuSach">
              <div class="row">
                <!-- Cột trái: Thông tin Text -->
                <div class="col-md-8">
                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label fw-bold small text-secondary"
                        >Mã Sách</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="formData.MaSach"
                        :disabled="isEdit"
                        required
                      />
                    </div>
                    <div class="col-6">
                      <label class="form-label fw-bold small text-secondary"
                        >Tên Sách</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="formData.TenSach"
                        required
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label fw-bold small text-secondary"
                        >Tác Giả</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="formData.TacGia"
                        required
                      />
                    </div>
                    <div class="col-6">
                      <label class="form-label fw-bold small text-secondary"
                        >Mã NXB</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="formData.MaNXB"
                        placeholder="VD: NXB01"
                        required
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-4">
                      <label class="form-label fw-bold small text-secondary"
                        >Năm XB</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        v-model="formData.NamXuatBan"
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label class="form-label fw-bold small text-secondary"
                        >Giá Tiền</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        v-model="formData.DonGia"
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label class="form-label fw-bold small text-secondary"
                        >Số Lượng</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        v-model="formData.SoQuyen"
                        required
                      />
                    </div>
                  </div>
                </div>

                <!-- Cột phải: Upload Ảnh -->
                <div
                  class="col-md-4 d-flex flex-column align-items-center justify-content-center border-start"
                >
                  <label class="form-label fw-bold small text-secondary"
                    >Ảnh Bìa</label
                  >
                  <div
                    class="border rounded mb-3 d-flex align-items-center justify-content-center shadow-sm"
                    style="
                      width: 150px;
                      height: 200px;
                      overflow: hidden;
                      background-color: #f8f9fa;
                    "
                  >
                    <img
                      v-if="previewImage"
                      :src="previewImage"
                      alt="Preview"
                      style="width: 100%; height: 100%; object-fit: cover"
                    />
                    <span v-else class="text-muted small">Chưa có ảnh</span>
                  </div>
                  <input
                    type="file"
                    class="form-control form-control-sm"
                    accept="image/*"
                    @change="chonAnh"
                  />
                </div>
              </div>
              <div class="modal-footer px-0 pb-0 mt-3 border-0">
                <button
                  type="button"
                  class="btn btn-light rounded-pill fw-medium px-4"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
                >
                  {{ isEdit ? "Lưu Thay Đổi" : "Thêm Sách" }}
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
// Giữ nguyên toàn bộ logic Script hiện tại của bạn
import SachService from "@/services/sach.service";
import * as bootstrap from "bootstrap";

export default {
  name: "QuanLySach",
  data() {
    return {
      sachs: [],
      searchText: "",
      modalInstance: null,
      isEdit: false,
      editId: null,
      formData: {
        MaSach: "",
        TenSach: "",
        TacGia: "",
        MaNXB: "",
        NamXuatBan: "",
        DonGia: "",
        SoQuyen: "",
      },
      fileAnh: null,
      previewImage: null,
    };
  },
  mounted() {
    this.layDanhSach();
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("sachModal"),
    );
  },
  methods: {
    async layDanhSach() {
      try {
        const params = this.searchText ? { TenSach: this.searchText } : {};
        this.sachs = await SachService.getAll(params);
      } catch (error) {
        console.error(error);
      }
    },
    async xoaSach(id, tenSach) {
      if (confirm(`Xóa sách "${tenSach}"?`)) {
        try {
          await SachService.delete(id);
          this.layDanhSach();
        } catch (error) {
          alert("LỖI: " + (error.response?.data?.message || ""));
        }
      }
    },
    timKiem() {
      this.layDanhSach();
    },
    xoaTimKiem() {
      this.searchText = "";
      this.layDanhSach();
    },
    chonAnh(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileAnh = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },
    moFormThem() {
      this.isEdit = false;
      this.editId = null;
      this.formData = {
        MaSach: "",
        TenSach: "",
        TacGia: "",
        MaNXB: "",
        NamXuatBan: "",
        DonGia: "",
        SoQuyen: "",
      };
      this.fileAnh = null;
      this.previewImage = null;
      this.modalInstance.show();
    },
    moFormSua(sach) {
      this.isEdit = true;
      this.editId = sach._id;
      this.formData = {
        MaSach: sach.MaSach,
        TenSach: sach.TenSach,
        TacGia: sach.TacGia,
        MaNXB: sach.MaNXB,
        NamXuatBan: sach.NamXuatBan,
        DonGia: sach.DonGia,
        SoQuyen: sach.SoQuyen,
      };
      this.fileAnh = null;
      this.previewImage = sach.HinhAnh
        ? "http://localhost:3000" + sach.HinhAnh
        : null;
      this.modalInstance.show();
    },
    async luuSach() {
      try {
        const data = new FormData();
        data.append("MaSach", this.formData.MaSach);
        data.append("TenSach", this.formData.TenSach);
        data.append("TacGia", this.formData.TacGia);
        data.append("MaNXB", this.formData.MaNXB);
        data.append("NamXuatBan", this.formData.NamXuatBan);
        data.append("DonGia", this.formData.DonGia);
        data.append("SoQuyen", this.formData.SoQuyen);
        if (this.fileAnh) data.append("HinhAnh", this.fileAnh);

        if (this.isEdit) {
          await SachService.update(this.editId, data);
          alert("Cập nhật sách thành công!");
        } else {
          await SachService.create(data);
          alert("Thêm sách mới thành công!");
        }

        this.modalInstance.hide();
        this.layDanhSach();
      } catch (error) {
        alert(
          "LỖI: " + (error.response?.data?.message || "Có lỗi xảy ra khi lưu!"),
        );
      }
    },
  },
};
</script>
