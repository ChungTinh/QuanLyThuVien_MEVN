<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-primary">🏢 Quản Lý Nhà Xuất Bản</h3>

      <div
        class="input-group w-50 shadow-sm rounded-pill overflow-hidden border border-primary"
      >
        <input
          type="text"
          class="form-control border-0 px-4 shadow-none"
          v-model="searchText"
          @keyup.enter="timKiem"
          placeholder="Nhập tên NXB để tìm..."
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
        + Thêm NXB
      </button>
    </div>

    <!-- Bảng danh sách -->
    <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 text-center">
            <thead class="table-light text-secondary">
              <tr>
                <th class="py-3">Mã NXB</th>
                <th class="py-3">Tên Nhà Xuất Bản</th>
                <th class="py-3 text-start">Địa Chỉ</th>
                <th class="py-3">Hành Động</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <tr v-if="nxbs.length === 0">
                <td colspan="4" class="text-center py-5 text-muted">
                  Chưa có dữ liệu.
                </td>
              </tr>
              <tr v-for="nxb in nxbs" :key="nxb._id">
                <td class="fw-bold">{{ nxb.MaNXB }}</td>
                <td class="text-primary fw-bold">{{ nxb.TenNXB }}</td>
                <td class="text-start text-muted">{{ nxb.DiaChi }}</td>
                <td>
                  <div class="d-flex gap-2 justify-content-center">
                    <button
                      @click="moFormSua(nxb)"
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
                      @click="xoaNXB(nxb._id, nxb.TenNXB)"
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

    <!-- Modal Form -->
    <div class="modal fade" id="nxbModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content border-0 rounded-4 shadow">
          <div
            class="modal-header bg-primary text-white border-0 rounded-top-4"
          >
            <h5 class="modal-title fw-bold">
              {{ isEdit ? "✏️ Sửa NXB" : "➕ Thêm NXB" }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="luuNXB">
              <div class="mb-3">
                <label class="form-label fw-bold small text-secondary"
                  >Tên Nhà Xuất Bản</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.TenNXB"
                  required
                />
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
                  Lưu
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
import NhaXuatBanService from "@/services/nhaxuatban.service";
import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";

export default {
  name: "QuanLyNXB",
  data() {
    return {
      nxbs: [],
      modalInstance: null,
      isEdit: false,
      editId: null,
      searchText: "",
      formData: { TenNXB: "", DiaChi: "" },
    };
  },
  mounted() {
    this.layDanhSach();
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("nxbModal"),
    );
  },
  methods: {
    async layDanhSach() {
      try {
        const params = this.searchText ? { TenNXB: this.searchText } : {};
        this.nxbs = await NhaXuatBanService.getAll(params);
      } catch (error) {
        console.error(error);
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
      this.isEdit = false;
      this.formData = { TenNXB: "", DiaChi: "" };
      this.modalInstance.show();
    },

    moFormSua(nxb) {
      this.isEdit = true;
      this.editId = nxb._id;
      this.formData = {
        TenNXB: nxb.TenNXB,
        DiaChi: nxb.DiaChi,
      };
      this.modalInstance.show();
    },

    async luuNXB() {
      try {
        if (this.isEdit) {
          await NhaXuatBanService.update(this.editId, this.formData);
          Swal.fire(
            "Thành công!",
            "Cập nhật Nhà xuất bản thành công!",
            "success",
          );
        } else {
          const response = await NhaXuatBanService.create(this.formData);
          const maMoiSinh = response.MaNXB || response.data?.MaNXB;
          Swal.fire(
            "Thành công!",
            `Thêm Nhà xuất bản thành công!\nMã NXB mới: ${maMoiSinh}`,
            "success",
          );
        }
        this.modalInstance.hide();
        this.layDanhSach();
      } catch (error) {
        Swal.fire(
          "LỖI",
          error.response?.data?.message || "Lỗi khi lưu NXB",
          "error",
        );
      }
    },

    async xoaNXB(id, ten) {
      const result = await Swal.fire({
        title: "Xác nhận xóa?",
        text: `Bạn có chắc chắn muốn xóa NXB "${ten}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Xóa ngay!",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        try {
          await NhaXuatBanService.delete(id);
          Swal.fire({
            title: "Đã xóa!",
            text: "Xóa NXB thành công.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          this.layDanhSach();
        } catch (error) {
          Swal.fire(
            "LỖI",
            error.response?.data?.message || "Không thể xóa NXB!",
            "error",
          );
        }
      }
    },
  },
};
</script>
