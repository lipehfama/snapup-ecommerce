<template>
  <div class="cart-message text-center">
    <figure class="cart-message-icon">
      <img :src="correct" alt="correct" />
    </figure>
    <h6 class="text-white fs-14 fw-15">An item has been added to your shopping cart</h6>
  </div>
</template>

<script lang="ts">
import { correct } from "@/utils/images";

export default {
  data() {
    return {
      correct
    };
  }
};
</script>

<style lang="scss" scoped>
@use "./CartMessage.scss";
</style>
