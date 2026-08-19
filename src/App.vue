<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import Footer from "./components/Footer/Footer.vue";
</script>

<template>
  <Header />
  <Sidebar />
  <router-view />
  <Footer />
</template>
