import { createRouter, createWebHistory } from 'vue-router'
// --- IMPORT CÁC TRANG KHÁCH  ---
import TrangChu from '../views/TrangChu.vue'
import TrangSach from '../views/TrangSach.vue'
import GioiThieu from '../views/GioiThieu.vue'
import GopY from '../views/GopY.vue'
import TaiKhoan from '../views/TaiKhoan.vue'
import NotFound from '../views/NotFound.vue'

// --- IMPORT CÁC TRANG ADMIN ---
import AdminLogin from '../views/admin/AdminLogin.vue'

import AdminLayout from '../views/admin/AdminLayout.vue'
import MuonTra from '../views/admin/MuonTra.vue'
import QuanLySach from '../views/admin/QuanLySach.vue'
import QuanLyNXB from '../views/admin/QuanLyNXB.vue'
import QuanLyDocGia from '../views/admin/QuanLyDocGia.vue'
import ThongKe from '../views/admin/ThongKe.vue'
import PhanHoi from '../views/admin/PhanHoi.vue'
import QuanLyNhanVien from '../views/admin/QuanLyNhanVien.vue'
import HoSo from '../views/admin/HoSo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- ROUTE KHÁCH HÀNG ---
    { path: '/', name: 'trangchu', component: TrangChu },
    { path: '/sach', name: 'trangsach', component: TrangSach },
    { path: '/gioi-thieu', name: 'gioithieu', component: GioiThieu },
    { path: '/gop-y', name: 'gopy', component: GopY },
    { path: '/tai-khoan', name: 'taikhoan', component: TaiKhoan },

    { path: '/admin/login', name: 'admin-login', component: AdminLogin },

    // --- ROUTE ADMIN  ---
    {
      path: '/admin',
      component: AdminLayout, 
      meta: { requiresAdmin: true },
      children: [
        { path: '', name: 'admin-muontra', component: MuonTra }, 
        { path: 'sach', name: 'admin-sach', component: QuanLySach },
        { path: 'nxb', name: 'admin-nxb', component: QuanLyNXB },
        { path: 'docgia', name: 'admin-docgia', component: QuanLyDocGia },
        { path: 'thongke', name: 'admin-thongke', component: ThongKe },
        { path: 'gopy', name: 'admin-gopy', component: PhanHoi },
        { path: 'nhanvien', name: 'admin-nhanvien', component: QuanLyNhanVien },
        { path: 'hoso', name: 'admin-hoso', component: HoSo },
      ]
    },

    // --- ROUTE 404 ---
    { 
      path: '/:pathMatch(.*)*', 
      name: 'notfound', 
      component: NotFound 
    }

  ]
})


router.beforeEach((to, from, next) => {
  // Lấy yêu cầu xem trang này có cần thẻ Admin không
  const canTheAdmin = to.matched.some(record => record.meta.requiresAdmin);
  // Tìm thẻ Admin trong bóp (LocalStorage)
  const coTheAdmin = localStorage.getItem("nhanvien_admin");

  if (canTheAdmin && !coTheAdmin) {
    // TH1: Cần thẻ Admin mà không có thẻ -> Đẩy về trang login
    next('/admin/login');
  } else if (to.path === '/admin/login' && coTheAdmin) {
    // TH2: Đang ở trang login mà đã có thẻ Admin -> Đẩy về trang admin
    next('/admin');
  } else if (canTheAdmin && coTheAdmin) {
    // TH3: Cần thẻ Admin mà có thẻ -> Kiểm tra quyền hạn
    const user = JSON.parse(coTheAdmin);
    
    // Nếu cố tình vào trang Quản lý Nhân viên mà không phải Quản Trị Viên
    if (to.path === '/admin/nhanvien' && user.ChucVu !== 'Quản Trị Viên') {
      alert("Cảnh báo: Bạn không có đặc quyền truy cập khu vực này!");
      next('/admin'); // Đẩy về trang chủ admin
    } else {
      next(); // Hợp lệ, cho qua
    }
  } else {
    next();
  }
});

export default router;