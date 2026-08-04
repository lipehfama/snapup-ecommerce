<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { formatPrice } from "@/utils/helpers";
import type { IProducts } from "@/types/IProducts";

export default defineComponent({
  name: "Product",
  props: {
    product: {
      type: Object as PropType<IProducts>,
      required: true
    }
  },
  setup() {
    return {
      formatPrice
    };
  }
});
</script>

<template>
  <router-link :to="`/product/${product?.id}`" :key="product?.id" class="product-item bg-white">
    <aside class="category">{{ product?.category }}</aside>
    <figure class="product-item-img">
      <img class="img-cover" :src="product?.images[0]" :alt="product?.title" />
    </figure>
    <article class="product-item-info fs-6">
      <section class="brand">
        <span>Brand: </span>
        <span class="fw-medium">{{ product?.brand || product?.category }}</span>
      </section>
      <p class="title py-2">{{ product?.title }}</p>
      <section class="price d-flex align-items-center justify-content-center">
        <span class="old-price">{{ formatPrice(product?.price) }}</span>
        <span class="new-price">{{ formatPrice(product?.discountedPrice) }}</span>
        <span class="discount">({{ product?.discountPercentage }}% Off)</span>
      </section>
    </article>
  </router-link>
</template>

<style scoped lang="scss">
@use "./Product.scss";
</style>
