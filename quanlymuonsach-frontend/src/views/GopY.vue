<template>
  <div
    class="container mt-5 mb-5 text-center d-flex flex-column justify-content-center"
    style="min-height: 50vh"
  >
    <div class="py-5">
      <h1 class="display-1 mb-4">🛠️</h1>
      <h2 class="fw-bold text-dark">Trang Đang Phát Triển</h2>
      <p class="lead text-muted mx-auto mt-3" style="max-width: 600px">
        Tính năng Gửi Góp ý hiện đang được đội ngũ kỹ thuật xây dựng và hoàn
        thiện để mang lại trải nghiệm tốt nhất. Vui lòng quay lại sau nhé!
      </p>
      <router-link
        to="/"
        class="btn btn-outline-secondary px-4 mt-3 rounded-pill"
      >
        Quay về Trang Chủ
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GopY",
};
</script>
