<template>
  <div>
    <h3 class="fw-bold text-primary mb-4">📊 Bảng Điều Khiển (Dashboard)</h3>

    <!-- Thẻ Summary -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div
          class="card bg-primary text-white shadow-sm border-0 rounded-4 h-100"
        >
          <div
            class="card-body d-flex align-items-center justify-content-between p-4"
          >
            <div>
              <h6 class="text-uppercase text-white-50 fw-bold mb-2">
                Tổng Tựa Sách
              </h6>
              <h2 class="fw-bold mb-0">{{ tongSach }}</h2>
            </div>
            <h1 class="display-5 opacity-50 mb-0">📚</h1>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div
          class="card bg-success text-white shadow-sm border-0 rounded-4 h-100"
        >
          <div
            class="card-body d-flex align-items-center justify-content-between p-4"
          >
            <div>
              <h6 class="text-uppercase text-white-50 fw-bold mb-2">Độc Giả</h6>
              <h2 class="fw-bold mb-0">{{ tongDocGia }}</h2>
            </div>
            <h1 class="display-5 opacity-50 mb-0">👥</h1>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div
          class="card bg-warning text-dark shadow-sm border-0 rounded-4 h-100"
        >
          <div
            class="card-body d-flex align-items-center justify-content-between p-4"
          >
            <div>
              <h6 class="text-uppercase opacity-75 fw-bold mb-2">Lượt Mượn</h6>
              <h2 class="fw-bold mb-0">{{ tongMuon }}</h2>
            </div>
            <h1 class="display-5 opacity-50 mb-0">💳</h1>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div
          class="card bg-danger text-white shadow-sm border-0 rounded-4 h-100"
        >
          <div
            class="card-body d-flex align-items-center justify-content-between p-4"
          >
            <div>
              <h6 class="text-uppercase text-white-50 fw-bold mb-2">
                Đang Mượn
              </h6>
              <h2 class="fw-bold mb-0">{{ tongDangMuon }}</h2>
            </div>
            <h1 class="display-5 opacity-50 mb-0">⏳</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Hàng Biểu đồ thứ 1 -->
    <div class="row g-4 mb-4">
      <!-- Biểu đồ Đường: Xu hướng mượn sách -->
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-4 h-100">
          <div class="card-header bg-white pt-4 pb-2 border-bottom-0">
            <h6 class="fw-bold text-secondary text-uppercase">
              📈 Xu hướng mượn sách theo ngày
            </h6>
          </div>
          <div
            class="card-body d-flex justify-content-center"
            style="height: 350px"
          >
            <Line
              v-if="chartDataLine.labels.length > 0"
              :data="chartDataLine"
              :options="chartOptions"
            />
            <div v-else class="text-muted text-center pt-5 w-100">
              Đang tải dữ liệu...
            </div>
          </div>
        </div>
      </div>

      <!-- Biểu đồ Tròn: Tỷ lệ mượn trả -->
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 rounded-4 h-100">
          <div class="card-header bg-white pt-4 pb-2 border-bottom-0">
            <h6 class="fw-bold text-secondary text-uppercase">
              🥧 Tỷ lệ Phiếu Mượn
            </h6>
          </div>
          <div
            class="card-body d-flex justify-content-center"
            style="height: 350px"
          >
            <Pie
              v-if="chartDataPie.labels.length > 0"
              :data="chartDataPie"
              :options="chartOptionsPie"
            />
            <div v-else class="text-muted text-center pt-5 w-100">
              Đang tải dữ liệu...
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hàng Biểu đồ thứ 2 -->
    <div class="row">
      <!-- Biểu đồ Cột: Top sách -->
      <div class="col-12">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-white pt-4 pb-2 border-bottom-0">
            <h6 class="fw-bold text-secondary text-uppercase">
              📊 Top 5 tựa sách có số lượng lớn nhất
            </h6>
          </div>
          <div
            class="card-body d-flex justify-content-center"
            style="height: 400px"
          >
            <Bar
              v-if="chartDataBar.labels.length > 0"
              :data="chartDataBar"
              :options="chartOptions"
            />
            <div v-else class="text-muted text-center pt-5 w-100">
              Đang tải dữ liệu...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SachService from "@/services/sach.service";
import DocGiaService from "@/services/docgia.service";
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
import { Bar, Pie, Line } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
);

export default {
  name: "ThongKe",
  components: { Bar, Pie, Line },
  data() {
    return {
      tongSach: 0,
      tongDocGia: 0,
      tongMuon: 0,
      tongDangMuon: 0,

      // Biểu đồ Cột (Bar)
      chartDataBar: {
        labels: [],
        datasets: [
          {
            label: "Số quyển trong kho",
            backgroundColor: "#0d6efd",
            borderRadius: 4,
            data: [],
          },
        ],
      },

      // Biểu đồ Tròn (Pie)
      chartDataPie: {
        labels: ["Đã Trả", "Đang Mượn"],
        datasets: [
          {
            backgroundColor: ["#198754", "#dc3545"],
            data: [],
          },
        ],
      },

      // Biểu đồ Đường (Line)
      chartDataLine: {
        labels: [],
        datasets: [
          {
            label: "Lượt mượn sách",
            borderColor: "#ffc107",
            backgroundColor: "#ffc107",
            tension: 0.3,
            fill: false,
            data: [],
          },
        ],
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      chartOptionsPie: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    };
  },
  async mounted() {
    await this.layDuLieuThongKe();
  },
  methods: {
    async layDuLieuThongKe() {
      try {
        const danhSachSach = await SachService.getAll();
        const danhSachDocGia = await DocGiaService.getAll();
        const danhSachMuon = await TheoDoiMuonSachService.getAll();

        // --- TÍNH TOÁN SUMMARY CARDS ---
        this.tongSach = danhSachSach.length;
        this.tongDocGia = danhSachDocGia.length;
        this.tongMuon = danhSachMuon.length;
        const cacPhieuDangMuon = danhSachMuon.filter((p) => !p.NgayTra);
        this.tongDangMuon = cacPhieuDangMuon.length;

        // --- DATA BIỂU ĐỒ TRÒN (PIE) ---
        const soDaTra = this.tongMuon - this.tongDangMuon;
        this.chartDataPie = {
          labels: ["Đã Trả", "Đang Mượn"],
          datasets: [
            {
              backgroundColor: ["#198754", "#dc3545"],
              data: [soDaTra, this.tongDangMuon],
            },
          ],
        };

        // --- DATA BIỂU ĐỒ CỘT (BAR) ---
        const top5Sach = [...danhSachSach]
          .sort((a, b) => b.SoQuyen - a.SoQuyen)
          .slice(0, 5);
        this.chartDataBar = {
          labels: top5Sach.map((s) => s.TenSach),
          datasets: [
            {
              label: "Số quyển trong kho",
              backgroundColor: "#0d6efd",
              borderRadius: 4,
              data: top5Sach.map((s) => s.SoQuyen),
            },
          ],
        };

        // --- DATA BIỂU ĐỒ ĐƯỜNG (LINE) ---
        const thongKeTheoNgay = {};
        danhSachMuon.forEach((phieu) => {
          thongKeTheoNgay[phieu.NgayMuon] =
            (thongKeTheoNgay[phieu.NgayMuon] || 0) + 1;
        });

        const cacNgay = Object.keys(thongKeTheoNgay).sort();
        this.chartDataLine = {
          labels: cacNgay,
          datasets: [
            {
              label: "Lượt mượn sách",
              borderColor: "#ffc107",
              backgroundColor: "#ffc107",
              tension: 0.3,
              fill: false,
              data: cacNgay.map((ngay) => thongKeTheoNgay[ngay]),
            },
          ],
        };
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thống kê:", error);
      }
    },
  },
};
</script>
