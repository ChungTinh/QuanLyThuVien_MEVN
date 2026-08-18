<template>
  <div>
    <!-- Tiêu đề trang -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold" style="color: #6a5af9">💳 Quản Lý Mượn Trả</h3>
      <button
        @click="moFormTaoPhieu"
        class="btn text-white fw-bold shadow-sm rounded-pill px-4 custom-add-btn"
      >
        + Tạo Phiếu Mượn
      </button>
    </div>

    <!-- Bảng danh sách phiếu mượn -->
    <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table
            class="table table-hover align-middle mb-0 text-center custom-table"
          >
            <thead class="table-light text-secondary">
              <tr>
                <th class="py-3">Độc Giả</th>
                <th class="py-3">Sách Mượn</th>
                <th class="py-3">Ngày Mượn</th>
                <th class="py-3">Ngày Trả</th>
                <th class="py-3">Trạng Thái</th>
                <th class="py-3">Hành Động</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <tr v-if="phieuMuons.length === 0">
                <td colspan="6" class="text-center py-5 text-muted">
                  Chưa có dữ liệu mượn sách.
                </td>
              </tr>
              <tr v-for="phieu in phieuMuons" :key="phieu._id">
                <td class="fw-bold text-start ps-4">
                  {{ layTenDocGia(phieu.MaDocGia) }}
                </td>
                <td class="text-primary text-start fw-bold">
                  {{ layTenSach(phieu.MaSach) }}
                </td>
                <td>{{ phieu.NgayMuon }}</td>
                <td class="text-muted">{{ phieu.NgayTra || "---" }}</td>
                <td>
                  <span
                    v-if="phieu.NgayTra"
                    class="badge bg-success rounded-pill px-3 shadow-sm"
                    >Đã trả</span
                  >
                  <span
                    v-else
                    class="badge bg-warning text-dark rounded-pill px-3 shadow-sm"
                    >Đang mượn</span
                  >
                </td>

                <!-- CỘT HÀNH ĐỘNG ĐƯỢC CHỈNH LẠI -->
                <td>
                  <div class="d-flex gap-2 justify-content-center">
                    <button
                      v-if="!phieu.NgayTra"
                      @click="xacNhanTra(phieu._id)"
                      class="btn btn-sm btn-primary rounded-pill px-3 fw-medium shadow-sm d-flex align-items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        class="bi bi-check2-circle"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"
                        />
                        <path
                          d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"
                        />
                      </svg>
                      Nhận
                    </button>
                    <span
                      v-else
                      class="badge bg-light text-success border border-success rounded-pill px-3 py-2 fw-medium d-flex align-items-center"
                    >
                      Hoàn tất
                    </span>

                    <button
                      @click="xoaPhieu(phieu._id)"
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

    <!-- MODAL TẠO PHIẾU MƯỢN -->
    <div class="modal fade" id="phieuMuonModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content border-0 rounded-4 shadow">
          <div
            class="modal-header text-white border-0 rounded-top-4"
            style="background-color: #6a5af9"
          >
            <h5 class="modal-title fw-bold">Tạo Phiếu Mượn Mới</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="taoPhieu">
              <!-- Chọn Độc Giả -->
              <div class="mb-3">
                <label class="form-label fw-bold text-secondary small"
                  >Chọn Độc Giả</label
                >
                <select
                  class="form-select"
                  v-model="formData.MaDocGia"
                  required
                >
                  <option value="" disabled selected>
                    -- Vui lòng chọn --
                  </option>
                  <option
                    v-for="dg in docGias"
                    :key="dg._id"
                    :value="dg.MaDocGia"
                  >
                    {{ dg.MaDocGia }} - {{ dg.HoLot }} {{ dg.Ten }}
                  </option>
                </select>
              </div>

              <!-- Chọn Sách -->
              <div class="mb-3">
                <label class="form-label fw-bold text-secondary small"
                  >Chọn Sách Mượn</label
                >
                <select class="form-select" v-model="formData.MaSach" required>
                  <option value="" disabled selected>
                    -- Vui lòng chọn --
                  </option>
                  <option
                    v-for="sach in sachs"
                    :key="sach._id"
                    :value="sach.MaSach"
                    :disabled="sach.SoQuyen <= 0"
                  >
                    {{ sach.MaSach }} - {{ sach.TenSach }}
                    {{
                      sach.SoQuyen <= 0
                        ? "(Hết hàng)"
                        : `(Còn ${sach.SoQuyen} cuốn)`
                    }}
                  </option>
                </select>
              </div>

              <!-- Ngày Mượn -->
              <div class="mb-4">
                <label class="form-label fw-bold text-secondary small"
                  >Ngày Mượn</label
                >
                <input
                  type="text"
                  class="form-control text-muted bg-light"
                  v-model="formData.NgayMuon"
                  readonly
                />
              </div>

              <div class="text-end">
                <button
                  type="button"
                  class="btn btn-light me-2 rounded-pill fw-medium"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  class="btn text-white rounded-pill fw-bold px-4 custom-add-btn"
                >
                  Tạo Phiếu
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
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
import DocGiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service";
import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";

export default {
  name: "MuonTra",
  data() {
    return {
      phieuMuons: [],
      docGias: [],
      sachs: [],
      modalInstance: null,
      formData: {
        MaDocGia: "",
        MaSach: "",
        NgayMuon: "",
      },
    };
  },
  async mounted() {
    await this.loadTatCaDuLieu();
    this.modalInstance = new bootstrap.Modal(
      document.getElementById("phieuMuonModal"),
    );
  },
  methods: {
    async loadTatCaDuLieu() {
      try {
        this.docGias = await DocGiaService.getAll();
        this.sachs = await SachService.getAll();
        this.phieuMuons = await TheoDoiMuonSachService.getAll();
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    },
    layTenDocGia(maDocGia) {
      const dg = this.docGias.find((d) => d.MaDocGia === maDocGia);
      return dg ? `${dg.HoLot} ${dg.Ten}` : maDocGia;
    },
    layTenSach(maSach) {
      const sach = this.sachs.find((s) => s.MaSach === maSach);
      return sach ? sach.TenSach : maSach;
    },
    moFormTaoPhieu() {
      const homNay = new Date().toISOString().split("T")[0];
      this.formData = {
        MaDocGia: "",
        MaSach: "",
        NgayMuon: homNay,
      };
      this.modalInstance.show();
    },
    async taoPhieu() {
      try {
        await TheoDoiMuonSachService.create(this.formData);
        alert("Tạo phiếu mượn thành công!");
        this.modalInstance.hide();
        await this.loadTatCaDuLieu();
      } catch (error) {
        alert(
          "Lỗi: " + (error.response?.data?.message || "Không thể tạo phiếu"),
        );
      }
    },
    async xacNhanTra(idPhieu) {
      if (confirm("Xác nhận khách hàng đã trả cuốn sách này?")) {
        try {
          const ngayTra = new Date().toISOString().split("T")[0];
          await TheoDoiMuonSachService.update(idPhieu, { NgayTra: ngayTra });
          alert("Đã cập nhật trạng thái Trả sách!");
          await this.loadTatCaDuLieu();
        } catch (error) {
          alert("Lỗi khi cập nhật!");
        }
      }
    },

    async xoaPhieu(id) {
      // Gọi popup xác nhận xịn xò của SweetAlert2
      const result = await Swal.fire({
        title: "Xóa phiếu mượn?",
        text: "Hành động này sẽ xóa vĩnh viễn phiếu mượn khỏi hệ thống!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Đồng ý, xóa luôn!",
        cancelButtonText: "Hủy thao tác",
      });

      if (result.isConfirmed) {
        try {
          // Gọi API xuống Backend để xóa
          await TheoDoiMuonSachService.delete(id);

          // Thông báo thành công
          Swal.fire({
            title: "Đã xóa!",
            text: "Phiếu mượn đã bị xóa thành công.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          // Load lại danh sách bảng
          await this.loadTatCaDuLieu();
        } catch (error) {
          // Hiện thông báo lỗi nếu có trục trặc
          const loiBackend =
            error.response?.data?.message || "Lỗi khi xóa phiếu mượn này!";
          Swal.fire("LỖI", loiBackend, "error");
        }
      }
    },
  },
};
</script>

<style scoped>
/* Nút Tạo màu tím/xanh */
.custom-add-btn {
  background-color: #2680ee;
  transition: all 0.3s ease;
  border: none;
}
.custom-add-btn:hover {
  background-color: #145783;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(90, 143, 249, 0.3) !important;
}

/* Custom Table */
.custom-table th {
  border-bottom-width: 1px;
}
.custom-table tbody tr {
  transition: background-color 0.2s ease;
}
.custom-table tbody tr:hover {
  background-color: #f8f9fa;
}
</style>
