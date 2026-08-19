<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <div
      v-if="!isAdminRoute"
      class="theme-container d-flex flex-column min-vh-100 w-100"
      :data-theme="currentTheme"
    >
      <AppHeader :currentTheme="currentTheme" @toggleTheme="toggleTheme" />
      <main class="flex-grow-1 d-flex flex-column">
        <router-view />
      </main>
      <AppFooter />
    </div>
    <div v-else class="d-flex flex-column min-vh-100 w-100">
      <main class="flex-grow-1 d-flex flex-column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      currentTheme: "light",
    };
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith("/admin");
    },
  },
  mounted() {
    // Tải trạng thái theme khi khởi động
    const savedTheme = localStorage.getItem("app-theme") || "light";
    this.currentTheme = savedTheme;
  },
  methods: {
    toggleTheme() {
      // Đảo theme
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      localStorage.setItem("app-theme", this.currentTheme);
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
