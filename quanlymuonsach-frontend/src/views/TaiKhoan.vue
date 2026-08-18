<template>
  <div class="container mt-5 mb-5">
    <!-- CHƯA ĐĂNG NHẬP -->
    <div v-if="!isLoggedIn" class="row justify-content-center">
      <div class="col-md-5 col-lg-4">
        <div class="card shadow-sm border-0 rounded-4 custom-card">
          <div class="card-body p-4 p-md-5">
            <div class="text-center mb-4">
              <div
                class="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3"
                style="width: 60px; height: 60px"
              >
                <span class="fs-2">👋</span>
              </div>
              <h3 class="fw-bold theme-text">
                {{ isRegistering ? "Đăng Ký Mới" : "Mừng Trở Lại!" }}
              </h3>
              <p class="text-muted small">
                {{
                  isRegistering
                    ? "Điền thông tin để tham gia thư viện"
                    : "Đăng nhập để tiếp tục mượn sách"
                }}
              </p>
            </div>

            <div
              v-if="errorMessage"
              class="alert alert-danger py-2 small border-0 shadow-sm rounded-3"
            >
              {{ errorMessage }}
            </div>

            <!-- Form Đăng Nhập -->
            <form v-if="!isRegistering" @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label fw-medium small text-secondary"
                  >Mã Độc Giả</label
                >
                <input
                  type="text"
                  class="form-control custom-input"
                  v-model="loginData.MaDocGia"
                  placeholder="VD: DG01"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="form-label fw-medium small text-secondary"
                  >Mật khẩu</label
                >
                <input
                  type="password"
                  class="form-control custom-input"
                  v-model="loginData.Password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                class="btn theme-btn w-100 fw-bold rounded-pill"
                :disabled="isLoading"
              >
                {{ isLoading ? "Đang xử lý..." : "Đăng Nhập" }}
              </button>
              <div class="text-center mt-4 pt-3 border-top">
                <span class="text-muted small">Chưa có tài khoản? </span>
                <a
                  href="#"
                  @click.prevent="isRegistering = true"
                  class="text-decoration-none fw-bold theme-text"
                  >Đăng ký ngay</a
                >
              </div>
            </form>

            <!-- Form Đăng Ký -->
            <form v-else @submit.prevent="handleRegister">
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label class="form-label fw-medium small text-secondary"
                    >Họ Lót</label
                  >
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="registerData.HoLot"
                    required
                  />
                </div>
                <div class="col-6">
                  <label class="form-label fw-medium small text-secondary"
                    >Tên</label
                  >
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="registerData.Ten"
                    required
                  />
                </div>
              </div>
              <div class="row g-2 mb-3">
                <div class="col-7">
                  <label class="form-label fw-medium small text-secondary"
                    >Số Điện Thoại</label
                  >
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="registerData.DienThoai"
                    required
                  />
                </div>
                <div class="col-5">
                  <label class="form-label fw-medium small text-secondary"
                    >Giới Tính</label
                  >
                  <select
                    class="form-select custom-input"
                    v-model="registerData.Phai"
                    required
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>
              <div class="row g-2 mb-4">
                <div class="col-6">
                  <label class="form-label fw-medium small text-secondary"
                    >Mã Độc Giả</label
                  >
                  <input
                    type="text"
                    class="form-control custom-input"
                    v-model="registerData.MaDocGia"
                    placeholder="VD: DG09"
                    required
                  />
                </div>
                <div class="col-6">
                  <label class="form-label fw-medium small text-secondary"
                    >Mật Khẩu</label
                  >
                  <input
                    type="password"
                    class="form-control custom-input"
                    v-model="registerData.Password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-success w-100 fw-bold rounded-pill shadow-sm"
                :disabled="isLoading"
              >
                Tạo Tài Khoản
              </button>
              <div class="text-center mt-4 pt-3 border-top">
                <span class="text-muted small">Đã có tài khoản? </span>
                <a
                  href="#"
                  @click.prevent="isRegistering = false"
                  class="text-decoration-none fw-bold theme-text"
                  >Đăng nhập</a
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- ĐÃ ĐĂNG NHẬP -->
    <div v-else class="row justify-content-center">
      <!-- Cột trái: Thông tin Card -->
      <div class="col-md-4 col-lg-3 mb-4">
        <div
          class="card shadow-sm border-0 rounded-4 text-center custom-card overflow-hidden"
        >
          <div class="card-body p-4 pt-5 relative">
            <div
              class="avatar-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 fw-bold shadow"
            >
              {{ currentUser.Ten.charAt(0) }}
            </div>
            <h4 class="fw-bold mb-1">
              {{ currentUser.HoLot }} {{ currentUser.Ten }}
            </h4>
            <p class="text-muted mb-4 small">
              Mã thẻ:
              <span class="fw-bold text-dark">{{ currentUser.MaDocGia }}</span>
            </p>
            <button
              @click="handleLogout"
              class="btn btn-outline-danger w-100 fw-bold rounded-pill"
            >
              Đăng Xuất
            </button>
          </div>
        </div>
      </div>

      <!-- Cột phải: Tabs nội dung -->
      <div class="col-md-8 col-lg-7">
        <div class="card shadow-sm border-0 rounded-4 custom-card">
          <div
            class="card-header bg-white pt-3 pb-0 border-bottom-0 rounded-top-4"
          >
            <ul class="nav custom-tabs" id="myTab" role="tablist">
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
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link fw-bold"
                  data-bs-toggle="tab"
                  data-bs-target="#history"
                  type="button"
                  @click="loadLichSu"
                >
                  Lịch sử mượn sách
                </button>
              </li>
            </ul>
          </div>

          <div class="card-body p-4 p-md-5">
            <div class="tab-content">
              <!-- TAB CẬP NHẬT THÔNG TIN -->
              <div class="tab-pane fade show active" id="info">
                <form @submit.prevent="updateInfo">
                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label text-secondary small fw-medium"
                        >Họ lót</label
                      >
                      <input
                        type="text"
                        class="form-control custom-input"
                        v-model="editUser.HoLot"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label text-secondary small fw-medium"
                        >Tên</label
                      >
                      <input
                        type="text"
                        class="form-control custom-input"
                        v-model="editUser.Ten"
                        required
                      />
                    </div>
                  </div>
                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label text-secondary small fw-medium"
                        >Số điện thoại</label
                      >
                      <input
                        type="text"
                        class="form-control custom-input"
                        v-model="editUser.DienThoai"
                        required
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label text-secondary small fw-medium"
                        >Giới tính</label
                      >
                      <select
                        class="form-select custom-input"
                        v-model="editUser.Phai"
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-4">
                    <label class="form-label text-secondary small fw-medium"
                      >Địa chỉ</label
                    >
                    <input
                      type="text"
                      class="form-control custom-input"
                      v-model="editUser.DiaChi"
                    />
                  </div>
                  <div class="text-end">
                    <button
                      type="submit"
                      class="btn btn-success fw-bold px-4 rounded-pill shadow-sm"
                    >
                      Lưu Thay Đổi
                    </button>
                  </div>
                </form>
              </div>

              <!-- TAB ĐỔI MẬT KHẨU -->
              <div class="tab-pane fade" id="password">
                <form @submit.prevent="updatePassword" class="w-75 mx-auto">
                  <div class="mb-3">
                    <label class="form-label text-secondary small fw-medium"
                      >Mật khẩu mới</label
                    >
                    <input
                      type="password"
                      class="form-control custom-input"
                      v-model="newPassword"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label class="form-label text-secondary small fw-medium"
                      >Xác nhận mật khẩu mới</label
                    >
                    <input
                      type="password"
                      class="form-control custom-input"
                      v-model="confirmPassword"
                      required
                    />
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

              <!-- TAB LỊCH SỬ MƯỢN -->
              <div class="tab-pane fade" id="history">
                <div v-if="loadingHistory" class="text-center py-4">
                  <span
                    class="spinner-border text-primary"
                    style="color: #6a5af9 !important"
                  ></span>
                  <p class="mt-2 text-muted small">Đang tải dữ liệu...</p>
                </div>
                <div v-else>
                  <div v-if="lichSu.length === 0" class="text-center py-5">
                    <div class="fs-1 mb-2">📜</div>
                    <h5 class="text-muted fw-light">
                      Bạn chưa mượn cuốn sách nào.
                    </h5>
                  </div>
                  <div v-else class="table-responsive">
                    <table
                      class="table table-hover align-middle text-center border custom-table rounded overflow-hidden"
                    >
                      <thead class="table-light text-secondary">
                        <tr>
                          <th class="fw-medium">Tên Sách</th>
                          <th class="fw-medium">Ngày Mượn</th>
                          <th class="fw-medium">Ngày Trả</th>
                          <th class="fw-medium">Trạng Thái</th>
                        </tr>
                      </thead>
                      <tbody class="border-top-0">
                        <tr v-for="item in lichSu" :key="item._id">
                          <td class="text-start fw-bold theme-text">
                            {{ item.TenSach }}
                          </td>
                          <td>{{ item.NgayMuon }}</td>
                          <td class="text-muted">
                            {{ item.NgayTra || "---" }}
                          </td>
                          <td>
                            <span
                              v-if="item.NgayTra"
                              class="badge bg-success rounded-pill px-3"
                              >Đã trả</span
                            >
                            <span
                              v-else
                              class="badge bg-warning text-dark rounded-pill px-3"
                              >Đang mượn</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
import SachService from "@/services/sach.service";

export default {
  name: "TaiKhoan",
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
      editUser: {},
      loginData: { MaDocGia: "", Password: "" },
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      isLoading: false,

      lichSu: [],
      loadingHistory: false,

      isRegistering: false,
      registerData: {
        HoLot: "",
        Ten: "",
        DienThoai: "",
        MaDocGia: "",
        Password: "",
        Phai: "Nam",
        DiaChi: "Chưa cập nhật",
        NgaySinh: "",
      },
    };
  },
  mounted() {
    const user = localStorage.getItem("docgia_khachhang");
    if (user) {
      this.currentUser = JSON.parse(user);
      this.editUser = { ...this.currentUser };
      this.isLoggedIn = true;
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        const response = await DocGiaService.login(this.loginData);
        localStorage.setItem("docgia_khachhang", JSON.stringify(response.user));
        this.currentUser = response.user;
        this.editUser = { ...response.user };
        this.isLoggedIn = true;
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Đăng nhập thất bại!";
      } finally {
        this.isLoading = false;
      }
    },
    handleLogout() {
      localStorage.removeItem("docgia_khachhang");
      this.isLoggedIn = false;
      this.currentUser = null;
      this.loginData = { MaDocGia: "", Password: "" };
    },
    async updateInfo() {
      try {
        await DocGiaService.update(this.currentUser._id, this.editUser);
        this.currentUser = { ...this.editUser };
        localStorage.setItem(
          "docgia_khachhang",
          JSON.stringify(this.currentUser),
        );
        alert("Cập nhật thông tin thành công!");
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
        await DocGiaService.update(this.currentUser._id, {
          Password: this.newPassword,
        });
        alert(
          "Đổi mật khẩu thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập sau.",
        );
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (error) {
        alert("Lỗi khi đổi mật khẩu!");
      }
    },
    async loadLichSu() {
      this.loadingHistory = true;
      try {
        const tatCaLichSu = await TheoDoiMuonSachService.getAll();
        const tatCaSach = await SachService.getAll();
        const lichSuCuaToi = tatCaLichSu.filter(
          (item) => item.MaDocGia === this.currentUser.MaDocGia,
        );
        this.lichSu = lichSuCuaToi.map((item) => {
          const sach = tatCaSach.find((s) => s.MaSach === item.MaSach);
          return {
            ...item,
            TenSach: sach ? sach.TenSach : "Sách không còn tồn tại",
          };
        });
      } catch (error) {
        console.error("Lỗi tải lịch sử", error);
      } finally {
        this.loadingHistory = false;
      }
    },
    async handleRegister() {
      this.isLoading = true;
      this.errorMessage = "";
      try {
        await DocGiaService.create(this.registerData);
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        this.isRegistering = false;
        this.loginData.MaDocGia = this.registerData.MaDocGia;
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Lỗi khi đăng ký tài khoản!";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.theme-text {
  color: #57b1fb !important;
}
.theme-btn {
  background-color: #5ad1f9;
  color: #ffffff;
  transition: all 0.3s ease;
  border: none;
}
.theme-btn:hover {
  background-color: #00b3ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(106, 90, 249, 0.3);
  color: #ffffff;
}

.avatar-gradient {
  width: 90px;
  height: 90px;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #6a5af9 0%, #d66efd 100%);
}

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

.custom-tabs {
  border-bottom: 2px solid #f1f3f5;
  gap: 1rem;
}
.custom-tabs .nav-link {
  color: #6c757d;
  border: none;
  border-bottom: 3px solid transparent;
  padding: 1rem 0.5rem;
  background: transparent;
  transition: all 0.3s ease;
}
.custom-tabs .nav-link:hover {
  color: #6a5af9;
}
.custom-tabs .nav-link.active {
  color: #6a5af9;
  border-bottom-color: #6a5af9;
  background: transparent;
}

.custom-card {
  transition: box-shadow 0.3s ease;
}
.custom-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05) !important;
}

.custom-table th {
  border-bottom-width: 1px;
}
</style>
