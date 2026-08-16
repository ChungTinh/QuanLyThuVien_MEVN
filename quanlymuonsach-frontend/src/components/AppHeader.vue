<template>
  <nav class="navbar navbar-expand-lg shadow-sm sticky-top py-3 custom-navbar">
    <div class="container">
      <router-link
        class="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
        to="/"
        style="color: var(--primary-color)"
      >
        <span style="font-size: 1.5rem">📚</span> Thư Viện Sách
      </router-link>

      <!-- Nút toggle cho điện thoại (Bỏ thuộc tính của Bootstrap, dùng Vue @click) -->
      <button
        class="navbar-toggler border-0 shadow-none"
        type="button"
        @click="toggleMenu"
      >
        <!-- Icon 3 gạch -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="var(--text-color-main)"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      <!-- Menu chính (Dùng Vue :class để ép thêm class 'show' khi mở) -->
      <div
        class="collapse navbar-collapse"
        :class="{ show: isMenuOpen }"
        id="navbarNav"
      >
        <ul
          class="navbar-nav mx-auto fw-medium text-center text-lg-start mt-3 mt-lg-0"
        >
          <li class="nav-item px-2 border-bottom border-lg-0">
            <router-link
              class="nav-link custom-link py-3 py-lg-2"
              to="/"
              @click="closeMenu"
              >Trang Chủ</router-link
            >
          </li>
          <li class="nav-item px-2 border-bottom border-lg-0">
            <router-link
              class="nav-link custom-link py-3 py-lg-2"
              to="/sach"
              @click="closeMenu"
              >Tủ Sách</router-link
            >
          </li>
          <li class="nav-item px-2 border-bottom border-lg-0">
            <router-link
              class="nav-link custom-link py-3 py-lg-2"
              to="/gioi-thieu"
              @click="closeMenu"
              >Giới Thiệu</router-link
            >
          </li>
          <li class="nav-item px-2 border-bottom border-lg-0">
            <router-link
              class="nav-link custom-link py-3 py-lg-2"
              to="/gop-y"
              @click="closeMenu"
              >Góp Ý</router-link
            >
          </li>
        </ul>

        <!-- Cụm Nút Tài Khoản & Chế Độ Màu -->
        <div
          class="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0"
        >
          <!-- NÚT ĐỔI MÀU (DARK MODE) -->
          <button
            @click="toggleTheme"
            class="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center theme-toggle-btn"
            style="width: 42px; height: 42px"
          >
            <svg
              v-if="currentTheme === 'light'"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="#495057"
              class="bi bi-moon-stars-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#ffc107"
              class="bi bi-brightness-high-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .708-.708l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
              />
            </svg>
          </button>

          <!-- NÚT TÀI KHOẢN -->
          <router-link
            class="btn custom-btn-account w-100 rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
            to="/tai-khoan"
            @click="closeMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            Tài Khoản
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      currentTheme: "light",
      isMenuOpen: false, // Cờ kiểm soát menu bằng Vue
    };
  },
  mounted() {
    const savedTheme = localStorage.getItem("app-theme") || "light";
    this.currentTheme = savedTheme;
    document.documentElement.setAttribute("data-theme", savedTheme);
  },
  methods: {
    toggleMenu() {
      // Đảo ngược trạng thái mở/đóng menu khi bấm nút 3 gạch
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      // Thu gọn menu khi click vào bất kỳ link nào
      this.isMenuOpen = false;
    },
    toggleTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", this.currentTheme);
      localStorage.setItem("app-theme", this.currentTheme);
    },
  },
};
</script>

<style scoped>
/* CSS giữ nguyên như bản trước */
.custom-navbar {
  background-color: var(--nav-bg) !important;
  transition: background-color 0.3s ease;
}
.custom-link {
  position: relative;
  color: var(--nav-text) !important;
  transition: color 0.3s ease;
}
.custom-link:hover {
  color: var(--primary-color) !important;
}
.custom-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  display: block;
  margin-top: 5px;
  right: 0;
  background: var(--primary-color);
  transition:
    width 0.3s ease,
    right 0.3s ease;
}
.custom-link:hover::after {
  width: 100%;
  left: 0;
}
.router-link-exact-active.custom-link {
  color: var(--primary-color) !important;
  font-weight: 700;
}
.router-link-exact-active.custom-link::after {
  width: 100%;
  left: 0;
}
.custom-btn-account {
  background-color: #4fb3e6;
  color: #ffffff !important;
  border: none;
  transition: all 0.3s ease;
}
.custom-btn-account:hover {
  background-color: #0095ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(54, 85, 108, 0.4) !important;
}
.theme-toggle-btn {
  background-color: var(--bg-color-card);
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease;
}
.theme-toggle-btn:active {
  transform: scale(0.9);
}
@media (max-width: 991px) {
  html[data-theme="dark"] .border-bottom {
    border-color: #333 !important;
  }
}
</style>
