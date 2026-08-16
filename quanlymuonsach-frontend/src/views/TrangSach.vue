<template>
  <div class="container mt-4 mb-5">
    <h2 class="text-center mb-4 fw-bold" style="color: #6a5af9">
      📚 Tủ Sách Của Chúng Tôi
    </h2>

    <!-- KHUNG TÌM KIẾM -->
    <div class="row justify-content-center mb-5">
      <div class="col-md-8 col-lg-6">
        <div
          class="input-group shadow-sm custom-search-bar rounded-pill overflow-hidden border"
        >
          <input
            type="text"
            class="form-control form-control-lg border-0 shadow-none px-4"
            v-model="searchText"
            @keyup.enter="timKiem"
            placeholder="Bạn muốn tìm sách gì hôm nay?"
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
            class="btn custom-btn-search px-4 fw-bold border-0"
            type="button"
            @click="timKiem"
          >
            🔍 Tìm Sách
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" style="color: #6a5af9" role="status"></div>
      <p class="mt-3 text-muted fw-medium">Đang tải sách...</p>
    </div>

    <!-- Danh sách sách -->
    <div v-else class="row g-4">
      <div v-if="sachs.length === 0" class="col-12 text-center text-muted py-5">
        <h4 class="fw-light">Không tìm thấy tựa sách nào phù hợp.</h4>
      </div>

      <div
        class="col-lg-3 col-md-4 col-sm-6"
        v-for="sach in sachs"
        :key="sach._id"
      >
        <div class="card h-100 shadow-sm border-0 custom-book-card rounded-4">
          <div class="card-img-wrapper position-relative">
            <img
              :src="
                sach.HinhAnh
                  ? sach.HinhAnh
                  : 'https://via.placeholder.com/250x350?text=Chưa+Có+Ảnh'
              "
            />
            <span
              class="badge custom-badge position-absolute top-0 end-0 m-2 shadow-sm"
              :class="sach.SoQuyen > 0 ? 'bg-success' : 'bg-danger'"
            >
              {{ sach.SoQuyen > 0 ? `Còn ${sach.SoQuyen} cuốn` : "Tạm hết" }}
            </span>
          </div>

          <div class="card-body d-flex flex-column p-4">
            <h5
              class="card-title fw-bold text-dark text-truncate-2 mb-2"
              :title="sach.TenSach"
            >
              {{ sach.TenSach }}
            </h5>

            <p class="card-text text-muted small mb-1">
              <span class="fw-medium text-secondary">✍️ Tác giả:</span>
              {{ sach.TacGia }}
            </p>
            <p class="card-text text-muted small mb-3">
              <span class="fw-medium text-secondary">📅 Năm XB:</span>
              {{ sach.NamXuatBan || "---" }}
            </p>

            <div
              class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center"
            >
              <span class="text-muted small fw-medium">Giá bìa:</span>
              <span class="text-danger fw-bold fs-5">
                {{ sach.DonGia.toLocaleString("vi-VN") }}đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SachService from "@/services/sach.service";

export default {
  name: "TrangSach",
  data() {
    return {
      sachs: [],
      isLoading: true,
      searchText: "",
    };
  },
  async mounted() {
    await this.layDanhSach();
  },
  methods: {
    async layDanhSach() {
      this.isLoading = true;
      try {
        const params = this.searchText ? { TenSach: this.searchText } : {};
        this.sachs = await SachService.getAll(params);
      } catch (error) {
        console.error("Lỗi lấy danh sách sách:", error);
      } finally {
        this.isLoading = false;
      }
    },
    timKiem() {
      this.layDanhSach();
    },
    xoaTimKiem() {
      this.searchText = "";
      this.layDanhSach();
    },
  },
};
</script>

<style scoped>
.custom-search-bar {
  border-color: rgba(32, 144, 219, 0.3) !important;
  background-color: #fff;
}

.custom-btn-search {
  background-color: #44c9fe;
  color: #fff;
  transition: all 0.3s ease;
}

.custom-btn-search:hover {
  background-color: #048fdf;
}

.custom-book-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  overflow: hidden;
}

.custom-book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(106, 90, 249, 0.15) !important;
}

.card-img-wrapper {
  height: 280px;
  overflow: hidden;
  background-color: #f8f9fa;
}

.custom-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.custom-book-card:hover .custom-img {
  transform: scale(1.05);
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 48px;
}

.custom-badge {
  font-size: 0.75rem;
  padding: 0.4em 0.8em;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}
</style>
