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
                <th class="py-3 text-danger">Hạn Trả</th>
                <th class="py-3">Ngày Trả</th>
                <th class="py-3">Trạng Thái</th>
                <th class="py-3">Hành Động</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <tr v-if="phieuMuons.length === 0">
                <td colspan="7" class="text-center py-5 text-muted">
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
                <td class="text-danger fw-medium">{{ phieu.HanTra }}</td>
                <td class="text-muted">{{ phieu.NgayTra || "---" }}</td>

                <!-- TRẠNG THÁI -->
                <td>
                  <span
                    v-if="phieu.TrangThai === 'Đã trả'"
                    class="badge bg-success rounded-pill px-3 shadow-sm"
                    >Đã trả</span
                  >
                  <span
                    v-else-if="phieu.TrangThai === 'Chờ duyệt'"
                    class="badge bg-info text-dark rounded-pill px-3 shadow-sm"
                    >Chờ duyệt</span
                  >
                  <span
                    v-else-if="phieu.TrangThai === 'Quá hạn'"
                    class="badge bg-danger rounded-pill px-3 shadow-sm"
                    >Quá hạn</span
                  >
                  <span
                    v-else
                    class="badge bg-warning text-dark rounded-pill px-3 shadow-sm"
                    >Đang mượn</span
                  >
                </td>

                <!-- HÀNH ĐỘNG -->
                <td>
                  <div class="d-flex gap-2 justify-content-center">
                    <button
                      v-if="phieu.TrangThai === 'Chờ duyệt'"
                      @click="duyetDon(phieu)"
                      class="btn btn-sm btn-info text-dark rounded-pill px-3 fw-bold shadow-sm"
                    >
                      Duyệt
                    </button>

                    <button
                      v-if="
                        phieu.TrangThai === 'Đang mượn' ||
                        phieu.TrangThai === 'Quá hạn'
                      "
                      @click="xacNhanTra(phieu._id)"
                      class="btn btn-sm btn-primary rounded-pill px-3 fw-medium shadow-sm d-flex align-items-center gap-1"
                    >
                      Nhận
                    </button>

                    <span
                      v-if="phieu.TrangThai === 'Đã trả'"
                      class="badge bg-light text-success border border-success rounded-pill px-3 py-2 fw-medium"
                    >
                      Hoàn tất
                    </span>

                    <!-- Nút Xóa -->
                    <button
                      @click="xoaPhieu(phieu._id)"
                      class="btn btn-sm btn-danger rounded-pill px-3 fw-medium shadow-sm d-flex align-items-center gap-1"
                    >
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

              <div class="row mb-4">
                <div class="col-6">
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
                <div class="col-6">
                  <label class="form-label fw-bold text-secondary small"
                    >Hẹn Ngày Trả</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    v-model="formData.HanTra"
                    :min="formData.NgayMuon"
                    required
                  />
                </div>
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
        HanTra: "",
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
        // Sắp xếp đơn mới nhất lên đầu
        this.phieuMuons.reverse();
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
        HanTra: "",
      };
      this.modalInstance.show();
    },

    async taoPhieu() {
      try {
        // Admin tạo thì auto chuyển thành "Đang mượn" luôn, không cần chờ duyệt
        await TheoDoiMuonSachService.create({
          ...this.formData,
          TrangThai: "Đang mượn",
        });
        Swal.fire("Thành công!", "Tạo phiếu mượn thành công!", "success");
        this.modalInstance.hide();
        await this.loadTatCaDuLieu();
      } catch (error) {
        Swal.fire(
          "Lỗi!",
          error.response?.data?.message || "Không thể tạo phiếu",
          "error",
        );
      }
    },

    async duyetDon(phieu) {
      // XỬ LÝ CẠNH TRANH (CONCURRENCY)
      try {
        const checkPhieu = await TheoDoiMuonSachService.get(phieu._id);

        if (!checkPhieu || checkPhieu.TrangThai !== "Chờ duyệt") {
          Swal.fire(
            "Thất bại",
            "Đơn này đã được xử lý bởi người khác hoặc bị khách hủy!",
            "warning",
          );
          this.loadTatCaDuLieu();
          return;
        }

        await TheoDoiMuonSachService.update(phieu._id, {
          TrangThai: "Đang mượn",
        });
        Swal.fire("Đã duyệt!", "Giao sách cho khách thành công.", "success");
        this.loadTatCaDuLieu();
      } catch (error) {
        Swal.fire("Lỗi", "Có lỗi xảy ra khi duyệt đơn!", "error");
      }
    },

    async xacNhanTra(idPhieu) {
      const result = await Swal.fire({
        title: "Xác nhận trả sách?",
        text: "Khách hàng đã trả lại cuốn sách này?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Đã trả!",
        cancelButtonText: "Chưa",
      });

      if (result.isConfirmed) {
        try {
          const ngayTra = new Date().toISOString().split("T")[0];
          await TheoDoiMuonSachService.update(idPhieu, {
            NgayTra: ngayTra,
            TrangThai: "Đã trả",
          });
          Swal.fire(
            "Thành công!",
            "Đã cập nhật trạng thái Trả sách!",
            "success",
          );
          await this.loadTatCaDuLieu();
        } catch (error) {
          Swal.fire("Lỗi!", "Có lỗi khi cập nhật!", "error");
        }
      }
    },

    async xoaPhieu(id) {
      const result = await Swal.fire({
        title: "Xác nhận xóa?",
        text: "Hành động này sẽ xóa vĩnh viễn phiếu mượn. Bạn có chắc chắn muốn xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Xóa ngay!",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        try {
          await TheoDoiMuonSachService.delete(id);
          Swal.fire({
            title: "Đã xóa!",
            text: "Phiếu mượn đã bị xóa thành công.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          await this.loadTatCaDuLieu();
        } catch (error) {
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
