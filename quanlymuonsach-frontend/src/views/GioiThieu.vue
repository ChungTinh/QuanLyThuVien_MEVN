<template>
  <div class="container mt-5 mb-5">
    <!-- PHẦN 1: GIỚI THIỆU THƯ VIỆN -->
    <div class="row justify-content-center mb-5">
      <div class="col-md-10 text-center">
        <h2 class="fw-bold mb-4" style="color: #6a5af9">
          Về Thư Viện Của Chúng Tôi
        </h2>

        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Thư viện"
          class="img-fluid rounded-4 shadow-sm mb-4 custom-img"
        />

        <p class="lead text-dark fw-medium px-md-4">
          Hệ thống Quản Lý Mượn Sách được xây dựng với mục tiêu mang tri thức
          đến gần hơn với mọi độc giả trong thời đại số.
        </p>
        <p class="text-muted px-md-5 lh-lg">
          Chúng tôi cam kết cung cấp một môi trường đọc sách thân thiện, hiện
          đại và dễ dàng truy cập. Dù bạn là học sinh, sinh viên hay người đi
          làm, thư viện luôn có những tựa sách phù hợp với nhu cầu và sở thích
          của bạn. Hãy để chúng tôi đồng hành cùng bạn trên con đường chinh phục
          tri thức!
        </p>
      </div>
    </div>

    <!-- ĐƯỜNG CHIA CẮT TRANG TRÍ -->
    <div class="d-flex justify-content-center align-items-center mb-5">
      <span
        style="
          height: 2px;
          width: 50px;
          background-color: #6a5af9;
          display: inline-block;
        "
      ></span>
      <span class="mx-3 text-muted">✦</span>
      <span
        style="
          height: 2px;
          width: 50px;
          background-color: #6a5af9;
          display: inline-block;
        "
      ></span>
    </div>

    <!-- PHẦN 2: GIỚI THIỆU ĐẠI HỌC CẦN THƠ (CTU) -->
    <div class="row justify-content-center align-items-center g-5">
      <div class="col-md-5 text-center">
        <div class="p-4 bg-white rounded-4 shadow-sm border">
          <!-- Logo CTU lấy từ Wikipedia cho rõ nét -->
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoVthllgZMzzjeooEpcVw8WjGvop8rP_X3-Je53VUz-sZUQ5UFwmfp__4g&s=10"
            alt="Đại học Cần Thơ"
            class="img-fluid"
            style="max-height: 220px; object-fit: contain"
          />
        </div>
      </div>

      <div class="col-md-7">
        <h3 class="fw-bold mb-3" style="color: #6a5af9">
          Về Đại Học Cần Thơ (CTU)
        </h3>
        <p class="text-muted lh-lg text-justify">
          <strong>Đại học Cần Thơ (Can Tho University)</strong> là cơ sở đào tạo
          đại học và sau đại học trọng điểm của vùng Đồng bằng sông Cửu Long. Là
          nơi ươm mầm và nuôi dưỡng những tài năng, dự án thư viện này cũng
          chính là một trong những sản phẩm được ra đời từ tinh thần học hỏi và
          sáng tạo không ngừng của sinh viên nhà trường.
        </p>
        <p class="text-muted lh-lg text-justify">
          Với sứ mệnh đào tạo nguồn nhân lực chất lượng cao, nghiên cứu khoa học
          và chuyển giao công nghệ, CTU luôn tạo điều kiện tốt nhất để sinh viên
          phát triển kỹ năng thực tế, đáp ứng nhu cầu ngày càng khắt khe của xã
          hội và kỷ nguyên công nghệ số hiện đại.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GioiThieu",
};
</script>

<style scoped>
.custom-img {
  max-height: 380px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.custom-img:hover {
  transform: scale(1.01);
}
.text-justify {
  text-align: justify;
}
</style>
