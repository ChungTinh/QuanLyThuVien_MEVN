<template>
  <div class="d-flex w-100 bg-light" style="height: 100vh">
    <!-- SIDEBAR BÊN TRÁI -->
    <div
      class="bg-white shadow-sm d-flex flex-column position-relative"
      style="width: 260px; z-index: 10"
    >
      <div class="p-4 text-center border-bottom">
        <h4 class="fw-bold mb-0" style="color: #6a5af9">
          <span class="fs-4">⚙️</span> ADMIN PANEL
        </h4>
      </div>

      <!-- Hiển thị Hồ sơ người dùng -->
      <div class="p-4 text-center border-bottom" v-if="currentUser">
        <div
          class="avatar-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2 shadow-sm"
        >
          {{ currentUser.HoTenNV.charAt(0) }}
        </div>
        <div class="fw-bold text-dark fs-6 mt-1">{{ currentUser.HoTenNV }}</div>
        <div class="mb-3 mt-1">
          <span
            :class="{
              'badge bg-danger': currentUser.ChucVu === 'Quản Trị Viên',
              'badge bg-secondary': currentUser.ChucVu !== 'Quản Trị Viên',
            }"
          >
            {{ currentUser.ChucVu }}
          </span>
        </div>
        <router-link
          to="/admin/hoso"
          class="btn btn-outline-primary btn-sm rounded-pill w-100 fw-bold custom-btn-outline"
        >
          Cập Nhật Hồ Sơ
        </router-link>
      </div>

      <!-- Danh sách Menu -->
      <div class="p-3 flex-grow-1 overflow-auto custom-scrollbar">
        <ul class="nav flex-column gap-2">
          <li class="nav-item">
            <router-link
              class="nav-link custom-nav-link rounded-3 fw-medium"
              to="/admin"
              exact-active-class="active"
            >
              💳 Theo Dõi Mượn Trả
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link custom-nav-link rounded-3 fw-medium"
              to="/admin/sach"
              exact-active-class="active"
            >
              📚 Quản Lý Sách
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link custom-nav-link rounded-3 fw-medium"
              to="/admin/nxb"
              exact-active-class="active"
            >
              🏢 Quản Lý NXB
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link custom-nav-link rounded-3 fw-medium"
              to="/admin/docgia"
              exact-active-class="active"
            >
              👥 Quản Lý Độc Giả
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link custom-nav-link rounded-3 fw-medium"
              to="/admin/thongke"
              exact-active-class="active"
            >
              📊 Thống Kê
            </router-link>
          </li>

          <!-- Phân cách menu thường và menu đặc quyền -->
          <hr class="my-2 text-muted" />

          <li class="nav-item">
            <router-link
              class="nav-link custom-nav-link rounded-3 fw-medium"
              to="/admin/gopy"
              exact-active-class="active"
            >
              💬 Phản Hồi Khách
            </router-link>
          </li>

          <!-- MENU ĐẶC QUYỀN: CHỈ QUẢN TRỊ VIÊN MỚI THẤY -->
          <li
            class="nav-item mt-1"
            v-if="currentUser && currentUser.ChucVu === 'Quản Trị Viên'"
          >
            <router-link
              class="nav-link custom-nav-link text-danger rounded-3 fw-bold"
              to="/admin/nhanvien"
              exact-active-class="active-danger"
            >
              👑 Quản Lý Nhân Sự
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Nút Đăng Xuất -->
      <div class="p-3 border-top">
        <button
          @click="dangXuat"
          class="btn btn-light text-danger w-100 fw-bold border-0 shadow-sm custom-logout d-flex justify-content-center align-items-center gap-2"
        >
          🚪 Đăng Xuất
        </button>
      </div>
    </div>

    <!-- NỘI DUNG BÊN PHẢI -->
    <div class="flex-grow-1 p-4 overflow-auto bg-light">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "AdminLayout",
  data() {
    return {
      currentUser: null,
    };
  },
  mounted() {
    const user = localStorage.getItem("nhanvien_admin");
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  },
  methods: {
    dangXuat() {
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
          localStorage.removeItem("nhanvien_admin");
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.avatar-gradient {
  width: 64px;
  height: 64px;
  font-size: 1.8rem;
  background: linear-gradient(135deg, #6a5af9 0%, #d66efd 100%);
}

.custom-btn-outline {
  color: #5abcf9;
  border-color: #25a4f9;
  transition: all 0.3s ease;
}
.custom-btn-outline:hover {
  background-color: #2595f6;
  color: #464343;
  box-shadow: 0 4px 10px rgba(15, 136, 250, 0.3);
}

.custom-nav-link {
  color: #495057;
  transition: all 0.2s ease;
  padding: 0.75rem 1rem;
}
.custom-nav-link:hover {
  background-color: #f8f9fa;
  color: #39393a;
  transform: translateX(4px);
}
.custom-nav-link.active {
  background-color: rgba(45, 152, 240, 0.1);
  color: #1ebbfe;
  border-left: 4px solid #136bc4;
}

.custom-nav-link.active-danger {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545 !important;
  border-left: 4px solid #dc3545;
}

.custom-logout {
  transition: all 0.3s ease;
}
.custom-logout:hover {
  background-color: #dc3545 !important;
  color: #fff !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
