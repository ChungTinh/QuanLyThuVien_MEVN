<template>
  <!-- Sửa vh-100 thành w-100 flex-grow-1 và thêm padding -->
  <div
    class="d-flex flex-column align-items-center justify-content-center bg-light w-100 text-center py-5 flex-grow-1"
  >
    <h1 class="display-1 fw-bold" style="color: #6a5af9">404</h1>
    <h2 class="mb-4 text-dark">Ôi hỏng! Không tìm thấy trang.</h2>
    <p class="text-muted mb-4">
      Đường dẫn bạn vừa truy cập không tồn tại hoặc đã bị xóa.
    </p>
    <button
      @click="$router.push('/')"
      class="btn text-white px-5 py-2 rounded-pill fw-bold shadow-sm custom-btn"
      style="background-color: #6a5af9"
    >
      Quay Về Trang Chủ
    </button>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.custom-btn {
  transition: all 0.3s ease;
}
.custom-btn:hover {
  background-color: #594ae2 !important;
  transform: translateY(-2px);
}
</style>
