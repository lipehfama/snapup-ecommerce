<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Transition name="back-to-top">
    <button
      v-if="isVisible"
      class="back-to-top-button"
      type="button"
      aria-label="Back to top"
      title="Back to top"
      @click="scrollToTop"
    >
      <i class="bi bi-arrow-up" aria-hidden="true"></i>
    </button>
  </Transition>
</template>

<style scoped lang="scss">
@use "./BackToTopButton.scss";
</style>
