<script setup lang="ts">
import { onMounted } from "vue";
import Header from "./components/Header/Header.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import Footer from "./components/Footer/Footer.vue";
import BackToTopButton from "./components/BackToTopButton/BackToTopButton.vue";

import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

onMounted(() => {
  authStore.restoreSession();
});
</script>

<template>
  <Header />
  <Sidebar />
  <router-view />
  <Footer />
  <BackToTopButton />
</template>
