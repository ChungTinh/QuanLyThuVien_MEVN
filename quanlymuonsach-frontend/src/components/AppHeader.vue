<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3"
  >
    <div class="container">
      <router-link
        class="navbar-brand fw-bold fs-4 text-primary d-flex align-items-center gap-2"
        to="/"
      >
        <span style="font-size: 1.5rem">📚</span> Thư Viện Sách
      </router-link>

      <!-- Nút toggle cho điện thoại -->
      <button
        class="navbar-toggler border-0 shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu chính -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto fw-medium">
          <li class="nav-item px-2">
            <router-link class="nav-link custom-link" to="/"
              >Trang Chủ</router-link
            >
          </li>
          <li class="nav-item px-2">
            <router-link class="nav-link custom-link" to="/sach"
              >Tủ Sách</router-link
            >
          </li>
          <li class="nav-item px-2">
            <router-link class="nav-link custom-link" to="/gioi-thieu"
              >Giới Thiệu</router-link
            >
          </li>
          <li class="nav-item px-2">
            <router-link class="nav-link custom-link" to="/gop-y"
              >Góp Ý</router-link
            >
          </li>
        </ul>

        <!-- Nút Tài Khoản -->
        <ul class="navbar-nav">
          <li class="nav-item mt-3 mt-lg-0">
            <router-link
              class="btn custom-btn-account rounded-pill px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2"
              to="/tai-khoan"
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
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.custom-link {
  position: relative;
  color: #495057 !important;
  transition: color 0.3s ease;
}

.custom-link:hover {
  color: #1dc0ed !important;
}

.custom-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  display: block;
  margin-top: 5px;
  right: 0;
  background: #6a5af9;
  transition:
    width 0.3s ease,
    right 0.3s ease;
}

.custom-link:hover::after {
  width: 100%;
  left: 0;
}

.router-link-exact-active.custom-link {
  color: #6a5af9 !important;
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
</style>
