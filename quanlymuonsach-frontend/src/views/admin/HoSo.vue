<template>
  <div>
    <h3 class="fw-bold text-primary mb-4">👤 Hồ Sơ Cá Nhân</h3>

    <div class="row">
      <!-- Cột trái: Hiển thị tóm tắt -->
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4 text-center">
            <div
              class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 fw-bold"
              style="width: 80px; height: 80px; font-size: 2.5rem"
            >
              {{ currentUser.HoTenNV ? currentUser.HoTenNV.charAt(0) : "U" }}
            </div>
            <h4 class="fw-bold">{{ currentUser.HoTenNV }}</h4>
            <p class="text-muted mb-2">
              MSNV:
              <span class="fw-bold text-dark">{{ currentUser.MSNV }}</span>
            </p>
            <span
              :class="{
                'badge bg-danger': currentUser.ChucVu === 'Quản Trị Viên',
                'badge bg-secondary': currentUser.ChucVu !== 'Quản Trị Viên',
              }"
            >
              {{ currentUser.ChucVu }}
            </span>
          </div>
        </div>
      </div>

      <!-- Cột phải: Form cập nhật 2 Tab -->
      <div class="col-md-8">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white pt-3 pb-0 border-bottom-0">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active fw-bold"
                  data-bs-toggle="tab"
                  data-bs-target="#info"
                  type="button"
                >
                  Cập nhật thông tin
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link fw-bold"
                  data-bs-toggle="tab"
                  data-bs-target="#password"
                  type="button"
                >
                  Đổi mật khẩu
                </button>
              </li>
            </ul>
          </div>

          <div class="card-body p-4">
            <div class="tab-content">
              <!-- TAB CẬP NHẬT THÔNG TIN -->
              <div class="tab-pane fade show active" id="info">
                <form @submit.prevent="updateInfo">
                  <div class="mb-3">
                    <label class="form-label">Họ và Tên</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="editUser.HoTenNV"
                      minlength="2"
                      required
                    />
                  </div>
                  <div class="row mb-3">
                    <div class="col-6">
                      <label class="form-label">Chức vụ (Không thể đổi)</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="editUser.ChucVu"
                        disabled
                      />
                    </div>
                    <div class="col-6">
                      <label class="form-label">Số Điện Thoại</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="editUser.SoDienThoai"
                        pattern="[0-9]{10}"
                        title="Số điện thoại phải gồm 10 chữ số"
                        required
                      />
                    </div>
                  </div>
                  <div class="mb-4">
                    <label class="form-label">Địa Chỉ</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="editUser.DiaChi"
                    />
                  </div>
                  <button type="submit" class="btn btn-success px-4 fw-bold">
                    Lưu Thay Đổi
                  </button>
                </form>
              </div>

              <!-- TAB ĐỔI MẬT KHẨU -->
              <div class="tab-pane fade" id="password">
                <form @submit.prevent="updatePassword" class="w-75 mx-auto">
                  <div class="mb-3">
                    <label class="form-label text-secondary small fw-medium"
                      >Mật khẩu Cũ</label
                    >
                    <div class="input-group">
                      <input
                        :type="showOldPwd ? 'text' : 'password'"
                        class="form-control custom-input border-end-0"
                        v-model="oldPassword"
                        minlength="6"
                        title="Mật khẩu phải có ít nhất 6 ký tự"
                        required
                      />
                      <button
                        class="btn border border-start-0 custom-eye-btn"
                        type="button"
                        @click="showOldPwd = !showOldPwd"
                      >
                        <svg
                          v-if="showOldPwd"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-eye text-muted"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-eye-slash text-muted"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                          />
                          <path
                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                          />
                          <path
                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label text-secondary small fw-medium"
                      >Mật khẩu Mới</label
                    >
                    <div class="input-group">
                      <input
                        :type="showNewPwd ? 'text' : 'password'"
                        class="form-control custom-input border-end-0"
                        v-model="newPassword"
                        required
                      />
                      <button
                        class="btn border border-start-0 custom-eye-btn"
                        type="button"
                        @click="showNewPwd = !showNewPwd"
                      >
                        <svg
                          v-if="showNewPwd"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-eye text-muted"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-eye-slash text-muted"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                          />
                          <path
                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                          />
                          <path
                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="form-label text-secondary small fw-medium"
                      >Xác nhận mật khẩu mới</label
                    >
                    <div class="input-group">
                      <input
                        :type="showConfirmPwd ? 'text' : 'password'"
                        class="form-control custom-input border-end-0"
                        v-model="confirmPassword"
                        required
                      />
                      <button
                        class="btn border border-start-0 custom-eye-btn"
                        type="button"
                        @click="showConfirmPwd = !showConfirmPwd"
                      >
                        <svg
                          v-if="showConfirmPwd"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-eye text-muted"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                          />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-eye-slash text-muted"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                          />
                          <path
                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                          />
                          <path
                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="text-center">
                    <button
                      type="submit"
                      class="btn btn-warning fw-bold px-4 rounded-pill shadow-sm"
                    >
                      Đổi Mật Khẩu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NhanVienService from "@/services/nhanvien.service";

export default {
  name: "HoSo",
  data() {
    return {
      currentUser: {},
      editUser: {},
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",

      // --- BIẾN ĐIỀU KHIỂN MẮT ---
      showOldPwd: false,
      showNewPwd: false,
      showConfirmPwd: false,
    };
  },
  mounted() {
    // Đọc thông tin từ localStorage lên
    const user = localStorage.getItem("nhanvien_admin");
    if (user) {
      this.currentUser = JSON.parse(user);
      this.editUser = { ...this.currentUser };
    }
  },
  methods: {
    async updateInfo() {
      try {
        const updateData = {
          HoTenNV: this.editUser.HoTenNV,
          SoDienThoai: this.editUser.SoDienThoai,
          DiaChi: this.editUser.DiaChi,
        };

        await NhanVienService.update(this.currentUser._id, updateData);

        this.currentUser = { ...this.currentUser, ...updateData };
        localStorage.setItem(
          "nhanvien_admin",
          JSON.stringify(this.currentUser),
        );

        Swal.fire({
          title: "Thành công!",
          text: "Cập nhật thông tin thành công!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire("Lỗi!", "Lỗi khi cập nhật thông tin!", "error");
      }
    },

    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        Swal.fire("Cảnh báo!", "Mật khẩu xác nhận không khớp!", "warning");
        return;
      }
      try {
        await NhanVienService.updatePassword(this.currentUser._id, {
          OldPassword: this.oldPassword,
          NewPassword: this.newPassword,
        });

        Swal.fire(
          "Thành công!",
          "Đổi mật khẩu thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập sau.",
          "success",
        );
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (error) {
        Swal.fire(
          "Lỗi!",
          error.response?.data?.message || "Lỗi khi đổi mật khẩu!",
          "error",
        );
      }
    },
  },
};
</script>

<style scoped>
.custom-input {
  border-radius: 8px;
  border: 1px solid #dee2e6;
  padding: 0.6rem 1rem;
  transition: border-color 0.2s;
}
.custom-input:focus {
  border-color: #6a5af9;
  box-shadow: 0 0 0 0.25rem rgba(106, 90, 249, 0.15);
}

/* CSS CHO NÚT CON MẮT */
.custom-eye-btn {
  border-color: #dee2e6;
  border-radius: 0 8px 8px 0;
  background-color: transparent;
}
.custom-eye-btn svg {
  margin-bottom: 2px;
}
</style>
