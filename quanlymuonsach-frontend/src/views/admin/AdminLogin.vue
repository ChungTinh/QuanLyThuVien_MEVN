<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100 admin-login-bg w-100"
  >
    <div
      class="card shadow-lg border-0 rounded-4 overflow-hidden"
      style="width: 420px; max-width: 90%"
    >
      <div class="card-header bg-dark text-center py-4 border-0">
        <div
          class="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle mb-3 shadow"
          style="width: 60px; height: 60px"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#212529"
            class="bi bi-shield-lock-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c7.159 4.382 16.815-2.73 20.684-13.114C19.303 1.325 18.225 1 17.535 1c-1.115 0-2.268.265-3.353.56C13.112 1.87 12.008 2.226 11.35 2.441a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c1.509.92 3.107 1.558 4.713 1.968zM8.5 7.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm-1.5 1.5v2.5a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0z"
            />
          </svg>
        </div>
        <h3 class="fw-bold text-white mb-0">HỆ THỐNG QUẢN TRỊ</h3>
        <p class="text-white-50 small mt-1 mb-0">
          Vui lòng đăng nhập để tiếp tục
        </p>
      </div>

      <!-- Body nhập liệu -->
      <div class="card-body p-4 p-md-5 bg-white">
        <div
          v-if="error"
          class="alert alert-danger py-2 small border-0 shadow-sm rounded-3 text-center"
        >
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="form-label fw-medium small text-secondary"
              >Mã Nhân Viên</label
            >
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-badge"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                  />
                  <path
                    d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"
                  />
                </svg>
              </span>
              <input
                type="text"
                class="form-control custom-input border-start-0 ps-0"
                v-model="loginData.MSNV"
                placeholder="VD: NV01"
                required
              />
            </div>
          </div>

          <div class="mb-5">
            <label class="form-label fw-medium small text-secondary"
              >Mật Khẩu</label
            >
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0 text-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-key"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
                  />
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </span>
              <input
                type="password"
                class="form-control custom-input border-start-0 ps-0"
                v-model="loginData.Password"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-warning w-100 fw-bold rounded-pill py-2 shadow-sm text-dark custom-btn"
          >
            ĐĂNG NHẬP
          </button>
        </form>

        <div class="text-center mt-4 pt-3 border-top">
          <router-link
            to="/"
            class="text-muted text-decoration-none small custom-link-back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              class="bi bi-arrow-left me-1"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            Quay về trang Khách
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NhanVienService from "@/services/nhanvien.service";

export default {
  name: "AdminLogin",
  data() {
    return { loginData: { MSNV: "", Password: "" }, error: "" };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await NhanVienService.login(this.loginData);
        // Lưu chìa khóa riêng biệt tên là "nhanvien_admin"
        localStorage.setItem("nhanvien_admin", JSON.stringify(response.user));
        this.$router.push("/admin");
      } catch (err) {
        this.error = err.response?.data?.message || "Lỗi đăng nhập!";
      }
    },
  },
};
</script>

<style scoped>
.admin-login-bg {
  background: linear-gradient(135deg, #1c1e22 0%, #3a3f47 100%);
}

.custom-input {
  background-color: #f8f9fa;
  border-color: #e9ecef;
}
.custom-input:focus {
  background-color: #fff;
  border-color: #ffc107;
  box-shadow: none;
}

.input-group-text {
  background-color: #f8f9fa;
  border-color: #e9ecef;
}

.input-group:focus-within .input-group-text {
  color: #ffc107 !important;
  background-color: #fff;
  border-color: #ffc107;
}
.input-group:focus-within .custom-input {
  border-color: #ffc107;
}

.custom-btn {
  transition: all 0.3s ease;
}
.custom-btn:hover {
  background-color: #ffca2c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.4) !important;
}

.custom-link-back {
  transition: color 0.3s ease;
}
.custom-link-back:hover {
  color: #ffc107 !important;
}
</style>
