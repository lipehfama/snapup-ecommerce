<script lang="ts">
import { defineComponent } from "vue";
import { sliderImgs } from "@/utils/images";

export default defineComponent({
  name: "BootstrapCarousel",
  setup() {
    return { sliderImgs };
  }
});
</script>

<template>
  <article
    id="carouselExampleInterval"
    class="carousel slide container slider"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <!-- Loop through the imported images array -->
      <figure
        v-for="(img, index) in sliderImgs"
        :key="index"
        :class="['carousel-item slider-item', { active: index === 0 }]"
        data-bs-interval="1000"
      >
        <img :src="img" class="d-block" alt="slider image" />
      </figure>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use "./HeaderSlider.scss";
</style>
