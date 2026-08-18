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
                <form @submit.prevent="updatePassword">
                  <div class="mb-3">
                    <label class="form-label">Mật khẩu mới</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="newPassword"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label class="form-label">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="confirmPassword"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-warning px-4 fw-bold">
                    Đổi Mật Khẩu
                  </button>
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
      newPassword: "",
      confirmPassword: "",
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
        // Chỉ bóc lấy các trường được phép sửa, loại bỏ MSNV và ChucVu
        const updateData = {
          HoTenNV: this.editUser.HoTenNV,
          SoDienThoai: this.editUser.SoDienThoai,
          DiaChi: this.editUser.DiaChi,
        };

        // Cập nhật Database
        await NhanVienService.update(this.currentUser._id, updateData);

        // Cập nhật lại LocalStorage và giao diện
        this.currentUser = { ...this.currentUser, ...updateData };
        localStorage.setItem(
          "nhanvien_admin",
          JSON.stringify(this.currentUser),
        );

        alert("Cập nhật thông tin thành công!");

        // Load lại trang để cập nhật tên mới trên thẻ Sidebar góc trái
        window.location.reload();
      } catch (error) {
        alert("Lỗi khi cập nhật thông tin!");
      }
    },

    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }
      try {
        await NhanVienService.update(this.currentUser._id, {
          Password: this.newPassword,
        });
        alert(
          "Đổi mật khẩu thành công! Vui lòng dùng mật khẩu này cho lần đăng nhập tới.",
        );
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (error) {
        alert("Lỗi khi đổi mật khẩu!");
      }
    },
  },
};
</script>
