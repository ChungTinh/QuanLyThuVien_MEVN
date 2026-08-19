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
                  placeholder="VD: DG1234"
                  required
                />
              </div>

              <div class="mb-4">
                <label class="form-label fw-medium small text-secondary"
                  >Mật khẩu</label
                >
                <div class="input-group">
                  <input
                    :type="showPwd1 ? 'text' : 'password'"
                    class="form-control custom-input border-end-0"
                    v-model="loginData.Password"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    class="btn border border-start-0 custom-eye-btn"
                    type="button"
                    @click="showPwd1 = !showPwd1"
                  >
                    <svg
                      v-if="showPwd1"
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
                    minlength="2"
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
                    minlength="2"
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
                    pattern="[0-9]{10}"
                    title="Số điện thoại phải bao gồm 10 chữ số"
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
              <div class="mb-3">
                <label class="form-label fw-medium small text-secondary"
                  >Ngày Sinh</label
                >
                <input
                  type="date"
                  class="form-control custom-input"
                  v-model="registerData.NgaySinh"
                  required
                />
              </div>
              <!-- HIỆN MẬT KHẨU CHO FORM ĐĂNG KÝ -->
              <div class="mb-4">
                <label class="form-label fw-medium small text-secondary"
                  >Mật Khẩu</label
                >
                <div class="input-group">
                  <input
                    :type="showPwd1 ? 'text' : 'password'"
                    class="form-control custom-input border-end-0"
                    v-model="registerData.Password"
                    minlength="6"
                    title="Mật khẩu phải có ít nhất 6 ký tự"
                    required
                  />
                  <button
                    class="btn border border-start-0 custom-eye-btn"
                    type="button"
                    @click="showPwd1 = !showPwd1"
                  >
                    <svg
                      v-if="showPwd1"
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
                        pattern="[0-9]{10}"
                        title="Số điện thoại phải bao gồm 10 chữ số"
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
                  <div class="row g-3 mb-4">
                    <div class="col-md-5">
                      <label class="form-label text-secondary small fw-medium"
                        >Ngày sinh</label
                      >
                      <input
                        type="date"
                        class="form-control custom-input"
                        v-model="editUser.NgaySinh"
                        required
                      />
                    </div>
                    <div class="col-md-7">
                      <label class="form-label text-secondary small fw-medium"
                        >Địa chỉ</label
                      >
                      <input
                        type="text"
                        class="form-control custom-input"
                        v-model="editUser.DiaChi"
                      />
                    </div>
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
                      >Mật khẩu Cũ</label
                    >
                    <div class="input-group">
                      <input
                        :type="showOldPwd ? 'text' : 'password'"
                        class="form-control custom-input border-end-0"
                        v-model="oldPassword"
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
                        minlength="6"
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

              <!-- TAB LỊCH SỬ MƯỢN SÁCH -->
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
import Swal from "sweetalert2";

export default {
  name: "TaiKhoan",
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
      editUser: {},
      loginData: { MaDocGia: "", Password: "" },
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      isLoading: false,

      showPwd1: false,
      showOldPwd: false,
      showNewPwd: false,
      showConfirmPwd: false,

      lichSu: [],
      loadingHistory: false,

      isRegistering: false,
      registerData: {
        HoLot: "",
        Ten: "",
        DienThoai: "",
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
      Swal.fire({
        title: "Xác nhận đăng xuất?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("docgia_khachhang");
          this.isLoggedIn = false;
          this.currentUser = null;
          this.loginData = { MaDocGia: "", Password: "" };
        }
      });
    },
    async updateInfo() {
      try {
        await DocGiaService.update(this.currentUser._id, this.editUser);
        this.currentUser = { ...this.editUser };
        localStorage.setItem(
          "docgia_khachhang",
          JSON.stringify(this.currentUser),
        );
        Swal.fire({
          title: "Thành công!",
          text: "Cập nhật thông tin thành công!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi cập nhật thông tin!", "error");
      }
    },

    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        Swal.fire("Cảnh báo!", "Mật khẩu xác nhận không khớp!", "warning");
        return;
      }
      try {
        await DocGiaService.updatePassword(this.currentUser._id, {
          OldPassword: this.oldPassword,
          NewPassword: this.newPassword,
        });

        Swal.fire({
          title: "Đổi mật khẩu thành công!",
          text: "Vui lòng sử dụng mật khẩu mới cho lần đăng nhập sau.",
          icon: "success",
        });

        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (error) {
        Swal.fire(
          "LỖI",
          error.response?.data?.message || "Lỗi khi đổi mật khẩu!",
          "error",
        );
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
        const response = await DocGiaService.create(this.registerData);
        const maMoiSinh = response.MaDocGia || response.data?.MaDocGia;

        Swal.fire({
          title: "Đăng ký thành công!",
          text: `Mã Độc Giả của bạn là: ${maMoiSinh}\nVui lòng ghi nhớ mã này để đăng nhập.`,
          icon: "success",
        });

        this.isRegistering = false;
        this.loginData.MaDocGia = maMoiSinh;
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

/* CSS CHO NÚT CON MẮT */
.custom-eye-btn {
  border-color: #dee2e6;
  border-radius: 0 8px 8px 0;
  background-color: transparent;
}
.custom-eye-btn svg {
  margin-bottom: 2px;
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
