<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-primary">👥 Quản Lý Độc Giả</h3>

      <div
        class="input-group w-50 shadow-sm rounded-pill overflow-hidden border border-primary"
      >
        <input
          type="text"
          class="form-control border-0 px-4 shadow-none"
          v-model="searchText"
          @keyup.enter="timKiem"
          placeholder="Nhập tên độc giả để tìm..."
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
        + Thêm Độc Giả
      </button>
    </div>

    <!-- Bảng danh sách độc giả -->
    <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 text-center">
            <thead class="table-light text-secondary">
              <tr>
                <th class="py-3">Mã ĐG</th>
                <th class="py-3 text-start">Họ và Tên</th>
                <th class="py-3">Giới Tính</th>
                <th class="py-3">Điện Thoại</th>
                <th class="py-3 text-start">Địa Chỉ</th>
                <th class="py-3">Hành Động</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <tr v-if="docGias.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  Chưa có dữ liệu độc giả.
                </td>
              </tr>
              <tr v-for="dg in docGias" :key="dg._id">
                <td class="fw-bold">{{ dg.MaDocGia }}</td>
                <td class="text-start text-primary fw-bold">
                  {{ dg.HoLot }} {{ dg.Ten }}
                </td>
                <td>
                  <span
                    class="badge rounded-pill shadow-sm px-3"
                    :class="
                      dg.Phai === 'Nam'
                        ? 'bg-info text-dark'
                        : 'bg-pink text-white'
                    "
                    :style="
                      dg.Phai === 'Nữ' ? 'background-color: #ff66b2;' : ''
                    "
                  >
                    {{ dg.Phai }}
                  </span>
                </td>
                <td class="text-muted">{{ dg.DienThoai }}</td>
                <td class="text-start text-muted">{{ dg.DiaChi }}</td>
                <td>
                  <div class="d-flex justify-content-center">
                    <button
                      @click="xoaDocGia(dg._id, dg.Ten)"
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

    <!-- Modal Thêm Độc Giả -->
    <div class="modal fade" id="docGiaModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content border-0 rounded-4 shadow">
          <div
            class="modal-header bg-primary text-white border-0 rounded-top-4"
          >
            <h5 class="modal-title fw-bold">➕ Thêm Độc Giả Mới</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="luuDocGia">
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Mã Độc Giả</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.MaDocGia"
                    required
                  />
                </div>
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Mật khẩu cấp tạm</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.Password"
                    required
                  />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Họ Lót</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.HoLot"
                    required
                  />
                </div>
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Tên</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.Ten"
                    required
                  />
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Điện Thoại</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.DienThoai"
                    required
                  />
                </div>
                <div class="col-6">
                  <label class="form-label fw-bold small text-secondary"
                    >Giới Tính</label
                  >
                  <select class="form-select" v-model="formData.Phai" required>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
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
import DocGiaService from "@/services/docgia.service";
import * as bootstrap from "bootstrap";

export default {
  name: "QuanLyDocGia",
  data() {
    return {
      docGias: [],
      searchText: "",
      modalInstance: null,
      formData: {
        MaDocGia: "",
        Password: "123",
        HoLot: "",
        Ten: "",
        DienThoai: "",
        Phai: "Nam",
      },
    };
  },
  mounted() {
    this.layDanhSach();
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("docGiaModal"),
    );
  },
  methods: {
    async layDanhSach() {
      try {
        const params = this.searchText ? { Ten: this.searchText } : {};
        this.docGias = await DocGiaService.getAll(params);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    },
    timKiem() {
      this.layDanhSach();
    },
    xoaTimKiem() {
      this.searchText = "";
      this.layDanhSach();
    },
    moFormThem() {
      this.formData = {
        MaDocGia: "",
        Password: "123",
        HoLot: "",
        Ten: "",
        DienThoai: "",
        Phai: "Nam",
      };
      this.modalInstance.show();
    },
    async xoaDocGia(id, tenDocGia) {
      if (
        confirm(
          `Bạn có chắc chắn muốn xóa độc giả "${tenDocGia}" khỏi hệ thống không?`,
        )
      ) {
        try {
          await DocGiaService.delete(id);
          alert("Đã xóa độc giả thành công!");
          this.layDanhSach();
        } catch (error) {
          const loiBackend =
            error.response?.data?.message || "Lỗi khi xóa độc giả này!";
          alert("LỖI: " + loiBackend);
        }
      }
    },
    async luuDocGia() {
      try {
        await DocGiaService.create(this.formData);
        alert("Đã tạo Độc giả thành công!");
        this.modalInstance.hide();
        this.layDanhSach();
      } catch (error) {
        alert(
          "Lỗi: " +
            (error.response?.data?.message ||
              "Trùng mã độc giả hoặc lỗi server!"),
        );
      }
    },
  },
};
</script>
