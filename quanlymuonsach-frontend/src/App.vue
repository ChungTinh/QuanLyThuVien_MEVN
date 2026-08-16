<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppHeader v-if="!isAdminRoute" />

    <main class="flex-grow-1 d-flex">
      <router-view />
    </main>

    <AppFooter v-if="!isAdminRoute" />
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
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith("/admin");
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f4f6f9;
}
</style>
