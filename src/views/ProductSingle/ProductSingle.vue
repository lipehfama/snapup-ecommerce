<template>
  <main class="py-5 bg-whitesmoke">
    <Loader v-if="productStatus === STATUS.LOADING" />
    <section class="product-single" v-else>
      <div class="container">
        <article class="product-single-content bg-white grid">
          <section class="product-single-l">
            <article class="product-img">
              <figure class="product-img-zoom">
                <img
                  :src="product?.images?.[0] || ''"
                  :alt="product?.title || 'Product image'"
                  class="img-cover"
                />
              </figure>
              <section class="product-img-thumbs d-flex align-items-center my-2">
                <figure v-for="(thumb, index) in thumbItems" :key="index" class="thumb-item">
                  <img
                    :src="thumb"
                    :alt="product?.title || 'Product thumbnail image'"
                    class="img-cover"
                  />
                </figure>
              </section>
            </article>
          </section>

          <section class="product-single-r">
            <article class="product-details font-manrope">
              <h3 class="title fs-1 fw-medium">{{ product?.title }}</h3>
              <p class="para fw-normal fs-6">{{ product?.description }}</p>
              <aside class="info d-flex align-items-center fs-6">
                <div class="rating d-flex align-items-center">
                  <h6 class="text-orange fw-medium">Rating:</h6>
                  <span class="mx-1">{{ product?.rating }}</span>
                </div>
                <div class="vert-line"></div>
                <div class="brand d-flex align-items-center">
                  <h6 class="text-orange fw-medium">Brand:</h6>
                  <span class="mx-1">{{ product?.brand || product?.category }}</span>
                </div>
                <div class="vert-line"></div>
                <div class="brand d-flex align-items-center">
                  <h6 class="text-orange fw-medium">Category:</h6>
                  <span class="mx-1 text-capitalize">
                    {{ product?.category ? product?.category.replace("-", " ") : "" }}
                  </span>
                </div>
              </aside>

              <aside class="price">
                <div class="d-flex align-items-center">
                  <p class="old-price text-gray">
                    {{ formatPrice(product?.price) }}
                  </p>
                  <p class="fs-6 mx-2 text-dark">Inclusive of all taxes</p>
                </div>
                <div class="d-flex align-items-center my-1">
                  <p class="new-price fw-normal font-poppins fs-1 text-orange">
                    {{ formatPrice(discountedPrice) }}
                  </p>
                  <p class="discount bg-orange fs-6 text-white fw-normal font-poppins">
                    {{ product?.discountPercentage }}% OFF
                  </p>
                </div>
              </aside>

              <aside class="qty d-flex align-items-center my-4">
                <h6 class="qty-text">Quantity:</h6>
                <div class="qty-change d-flex align-items-center mx-3">
                  <button
                    class="qty-decrease d-flex align-items-center justify-content-center"
                    @click="decreaseQty()"
                  >
                    <i class="bi bi-dash"></i>
                  </button>
                  <div class="qty-value d-flex align-items-center justify-content-center">
                    {{ quantity }}
                  </div>
                  <button
                    class="qty-decrease d-flex align-items-center justify-content-center"
                    @click="increaseQty()"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
                <div
                  v-if="outOfStock"
                  class="qty-error text-uppercase bg-danger text-white fs-6 ls-1 mx-2 fw-medium"
                >
                  out of stock
                </div>
              </aside>
              <aside class="btns">
                <button
                  type="button"
                  class="add-to-cart-btn btn"
                  @click="addToCartHandler(product)"
                >
                  <i class="bi bi-cart-fill"></i>
                  <span class="btn-text mx-2">add to cart</span>
                </button>
                <button type="button" class="buy-now btn mx-3">
                  <span class="btn-text">buy now</span>
                </button>
              </aside>
            </article>
          </section>
        </article>
      </div>
    </section>
  </main>
  <CartMessage v-if="cartMessageStatus" />
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import { STATUS } from "@/utils/status";
import { formatPrice } from "@/utils/helpers";
import Loader from "@/components/Loader/Loader.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import CartMessage from "@/components/CartMessage/CartMessage.vue";
import type { IProducts } from "@/types/IProducts";

const route = useRoute();

const id = route.params.id as string;
const productStore = useProductStore();
const cartStore = useCartStore();
const product = computed(() => productStore.productSingle);
const productStatus = computed(() => productStore.productSingleStatus);
const quantity = ref(1);
const cartMessageStatus = computed(() => cartStore.getCartMessageStatus);
//console.log(cartMessageStatus.value);
onMounted(async () => {
  productStore.fetchProductSingle(id);
});

const thumbItems = computed(() => {
  return product.value?.images?.slice(1, 4) || [];
});

let discountedPrice = computed(() => {
  return product.value.price - product.value.price * (product.value.discountPercentage / 100);
});

let outOfStock = computed(() => {
  return product.value.stock === 0 || "";
});

// Increase quantity
const increaseQty = () => {
  const maxStock = product.value?.stock ?? Infinity;
  return (quantity.value = Math.min(quantity.value + 1, maxStock));
};

// Decrease quantity
const decreaseQty = () => {
  return (quantity.value = Math.max(quantity.value - 1, 1));
};

// Add to Cart Handler
const addToCartHandler = (product: IProducts) => {
  // Calculate discounted price
  const discountedPrice = product.price - product.price * (product.discountPercentage / 100);
  // Calculate total price based on quantity
  const totalPrice = quantity.value * discountedPrice;

  // Add to cart using Pinia store
  cartStore.addToCart({
    ...product,
    quantity: quantity.value,
    discountedPrice,
    totalPrice
  });

  cartStore.setCartMessageOn();
};
</script>

<style lang="scss" scoped>
@import "./ProductSingle.module.scss";
</style>
