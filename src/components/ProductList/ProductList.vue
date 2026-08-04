<template>
  <section class="product-lists grid bg-whitesmoke my-3">
    <Product v-for="product in productsWithDiscount" :key="product.id" :product="product" />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Product from "@/components/Product/Product.vue";
import type { IProducts } from "@/types/IProducts";

export default defineComponent({
  name: "ProductList",
  components: {
    Product
  },
  props: {
    products: {
      type: Array as () => IProducts[],
      required: true
    }
  },
  setup(props) {
    const productsWithDiscount = computed(() => {
      return props.products.map((product) => ({
        ...product,
        discountedPrice: product.price - product.price * (product.discountPercentage / 100)
      }));
    });

    return {
      productsWithDiscount
    };
  }
});
</script>

<style lang="scss" scoped>
@use "./ProductList.scss";
</style>
