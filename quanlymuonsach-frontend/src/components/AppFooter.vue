<template>
  <footer class="custom-footer text-white pt-5 pb-3 mt-auto">
    <div class="container">
      <div class="row mb-4">
        <!-- Cột 1: Thông tin thư viện -->
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5
            class="text-uppercase fw-bold mb-3 d-flex align-items-center gap-2"
            style="color: #6a5af9"
          >
            <span class="fs-4">📚</span> Thư Viện Sách
          </h5>
          <p class="custom-text-light small lh-lg pe-lg-4">
            Điểm đến lý tưởng cho những người đam mê đọc sách. Chúng tôi cung
            cấp kho tàng tri thức phong phú, quản lý mượn trả hiện đại và thân
            thiện với mọi độc giả.
          </p>
        </div>

        <!-- Cột 2: Liên kết nhanh -->
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase fw-bold mb-3">Liên Kết Nhanh</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-decoration-none footer-link"
                >Trang Chủ</router-link
              >
            </li>
            <li class="mb-2">
              <router-link to="/sach" class="text-decoration-none footer-link"
                >Tủ Sách</router-link
              >
            </li>
            <li class="mb-2">
              <router-link
                to="/gioi-thieu"
                class="text-decoration-none footer-link"
                >Về Chúng Tôi</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Cột 3: Liên hệ -->
        <div class="col-lg-4 col-md-12">
          <h5 class="text-uppercase fw-bold mb-3">Thông Tin Liên Hệ</h5>
          <ul class="list-unstyled custom-text-light small">
            <li class="mb-2 d-flex align-items-center gap-2">
              <span>📍</span> Vĩnh Phong, An Giang, Việt Nam
            </li>
            <li class="mb-2 d-flex align-items-center gap-2">
              <span>📞</span> Hotline: 0988.888.888
            </li>
            <li class="mb-2 d-flex align-items-center gap-2">
              <span>✉</span> Email:
              <a href="mailto:tinhb2306643@student.ctu.edu.vn">
                tinhb2306643@student.ctu.edu.vn
              </a>
            </li>
            <li class="mb-2 d-flex align-items-center gap-2">
              <span>f</span>
              Facebook:
              <a
                href="https://www.facebook.com/chung.tinh.78793"
                target="_blank"
              >
                chungtinh
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr class="border-secondary mb-4" style="opacity: 0.3" />

      <!-- Bản quyền -->
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
          <small class="custom-text-light"
            >&copy; 2026 - Bản quyền thuộc về Hệ thống Quản Lý Mượn Sách.</small
          >
        </div>
        <div class="col-md-6 text-center text-md-end mt-2 mt-md-0">
          <small class="custom-text-light"
            >Thiết kế bởi
            <span class="fw-bold text-white">Chung Tình</span></small
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.custom-footer {
  --footer-bg: #2d3138;
  background-color: var(--footer-bg);
}

.custom-text-light {
  color: rgba(255, 255, 255, 0.65) !important;
}

.footer-link {
  color: rgba(255, 255, 255, 0.65) !important;
  transition:
    color 0.3s ease,
    padding-left 0.3s ease;
}

.footer-link:hover {
  color: #6a5af9 !important;
  padding-left: 5px;
}
</style>
