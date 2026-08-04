<template>
  <footer class="footer bg-orange">
    <div class="container py-4 text-center">
      <div class="d-flex align-items-center justify-content-center text-white fw-light fs-6">
        <RouterLink to="/" class="text-uppercase">privacy policy</RouterLink>
        <div class="vert-line"></div>
        <RouterLink to="/" class="text-uppercase">term of service</RouterLink>
        <div class="vert-line"></div>
        <RouterLink to="/" class="text-uppercase">About SnapUp.</RouterLink>
      </div>
      <span class="text-white d-block copyright-text text-manrope fs-6 fw-light">
        &copy; 2022 SnapUp. All Rights Reserved.
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use "./Footer.scss";
</style>
