<script lang="ts">
import { shopping_cart } from "@/utils/images";
import { formatPrice } from "@/utils/helpers";
//import type { IProducts } from "@/types/IProducts";
import { defineComponent } from "vue";
import type { ICartItems } from "@/types/ICarts";
/*
defineProps({
  carts: {
    type: Array as PropType<IProducts[]>,
    required: true
  }
});
*/

export default defineComponent({
  props: {
    carts: {
      type: Array as () => ICartItems[],
      required: true
    }
  },
  setup() {
    return { formatPrice, shopping_cart };
  }
});
</script>

<template>
  <section class="cart-modal">
    <h5 class="cart-modal-title fw-medium fs-5 font-manrope text-center">Recently Added Products</h5>

    <div v-if="carts?.length > 0" class="cart-modal-list grid">
      <article
        v-for="cart in carts"
        :key="cart.id"
        class="cart-modal-item grid align-items-center font-manrope py-2"
      >
        <figure class="cart-modal-item-img">
          <img :src="cart.thumbnail" alt="" class="img-cover" />
        </figure>
        <div class="cart-modal-item-title fs-3 font-manrope text-capitalize">
          {{ cart.title }}
        </div>
        <div class="cart-modal-item-price text-orange fs-4 fw-semibold">
          {{ formatPrice(cart.discountedPrice) }}
        </div>
      </article>

      <p class="text-capitalize view-cart-btn bg-orange fs-5 font-manrope text-center w-100">
        view my shopping cart
      </p>
    </div>

    <figure v-else class="d-flex flex-column align-content-center justify-content-center cart-modal-empty">
      <img :src="shopping_cart" alt="shopping cart" />
      <h6 class="text-dark fw-normal">No products yet</h6>
    </figure>
  </section>
</template>

<style scoped lang="scss">
@use "./CartModal.scss";
</style>
