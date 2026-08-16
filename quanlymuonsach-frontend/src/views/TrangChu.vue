<template>
  <div class="container mt-4 mb-5">
    <!-- Banner chính (Hero Section) -->
    <div
      class="p-5 mb-4 rounded-4 shadow-sm text-center hero-section position-relative overflow-hidden"
    >
      <div class="container-fluid py-5 position-relative z-1 text-white">
        <h1 class="display-4 fw-bold mb-3">Khám Phá Kho Tàng Tri Thức</h1>
        <p class="col-md-8 mx-auto fs-5 fw-light mb-4 custom-text-light">
          Hàng ngàn đầu sách đa dạng đang chờ đón bạn. Mở ra những chân trời mới
          và bắt đầu hành trình đọc sách ngay hôm nay!
        </p>
        <router-link
          to="/sach"
          class="btn custom-btn-hero btn-lg px-5 rounded-pill shadow-sm fw-bold d-inline-flex align-items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-journal-bookmark-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
            />
            <path
              d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"
            />
            <path
              d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"
            />
          </svg>
          Khám Phá Tủ Sách
        </router-link>
      </div>
      <!-- Lớp phủ màu gradient -->
      <div class="hero-bg-overlay"></div>
    </div>

    <!-- 3 Thẻ Tính Năng (Features) -->
    <div class="row align-items-md-stretch text-center mt-5 g-4">
      <div class="col-md-4">
        <div
          class="h-100 p-4 bg-white border-0 rounded-4 shadow-sm feature-card d-flex flex-column align-items-center"
        >
          <div class="icon-wrapper mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-stars"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
              />
            </svg>
          </div>
          <h5 class="fw-bold text-dark">Sách Mới Mỗi Ngày</h5>
          <p class="text-muted small mb-0 mt-2">
            Liên tục cập nhật những tựa sách mới nhất trên thị trường để bạn
            không bao giờ nhàm chán.
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div
          class="h-100 p-4 bg-white border-0 rounded-4 shadow-sm feature-card d-flex flex-column align-items-center"
        >
          <div class="icon-wrapper mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-lightning-charge-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
              />
            </svg>
          </div>
          <h5 class="fw-bold text-dark">Mượn Sách Dễ Dàng</h5>
          <p class="text-muted small mb-0 mt-2">
            Thủ tục mượn trả trực tuyến cực kỳ nhanh chóng, tiện lợi, tiết kiệm
            thời gian tối đa.
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div
          class="h-100 p-4 bg-white border-0 rounded-4 shadow-sm feature-card d-flex flex-column align-items-center"
        >
          <div class="icon-wrapper mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-headset"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"
              />
            </svg>
          </div>
          <h5 class="fw-bold text-dark">Hỗ Trợ Tận Tình</h5>
          <p class="text-muted small mb-0 mt-2">
            Đội ngũ thủ thư tận tâm luôn sẵn sàng lắng nghe, tư vấn và hỗ trợ
            bạn 24/7.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrangChu",
};
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #5bb4e8 0%, #268de8 100%);
}

.hero-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://www.transparenttextures.com/patterns/cubes.png");
  opacity: 0.1;
  pointer-events: none;
}

.custom-text-light {
  color: rgba(255, 255, 255, 0.85) !important;
}

.custom-btn-hero {
  background-color: #ffffff;
  color: #1a8cf8;
  transition: all 0.3s ease;
}

.custom-btn-hero:hover {
  background-color: #f8f9fa;
  color: #000000;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15) !important;
}

.feature-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(106, 90, 249, 0.15) !important;
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(106, 90, 249, 0.1);
  color: #5ab9f9;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.feature-card:hover .icon-wrapper {
  background-color: #6a5af9;
  color: #ffffff;
}
</style>
