<template>
  <main>
    <section class="slider-wrapper">
      <HeaderSlider />
    </section>
    <section class="main-content bg-whitesmoke">
      <div class="container">
        <article class="categories py-5">
          <section class="categories-item">
            <aside class="title-md">
              <h3>See our products</h3>
            </aside>
            <!-- Conditionally render Loader or ProductList based on productStatus -->
            <Loader v-if="productStatus === STATUS.LOADING" />
            <ProductList v-else :products="tempProducts" />
          </section>

          <section
            class="categories-item"
            v-for="(products, index) in categoryProducts"
            :key="categories[index]?.slug"
          >
            <aside class="title-md">
              <h3>{{ categories[index]?.name }}</h3>
            </aside>
            <Loader v-if="productStatus === STATUS.LOADING" />
            <ProductList v-else :products="products" />
          </section>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import HeaderSlider from "@/components/HeaderSlider/HeaderSlider.vue";
import Loader from "@/components/Loader/Loader.vue";
import ProductList from "@/components/ProductList/ProductList.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import type { IProducts } from "@/types/IProducts";
import { STATUS } from "@/utils/status";
import { computed, onMounted, ref, watch } from "vue";

const categorieStore = useCategoryStore();
const productStore = useProductStore();

onMounted(async () => {
  categorieStore.fetchCategories();
  productStore.fetchProducts(50);
});

const categories = computed(() => categorieStore.categories);
const products = computed(() => productStore.products);
const productStatus = computed(() => productStore.productsStatus);

//Randomizing the products in the list
const tempProducts = ref<IProducts[]>([]);

watch(products, (newProducts) => {
  if (newProducts.length > 0) {
    const randomizedProducts: IProducts[] = [];
    for (let i = 0; i < newProducts.length; i++) {
      let randomIndex = Math.floor(Math.random() * newProducts.length);

      while (randomizedProducts.includes(newProducts[randomIndex])) {
        randomIndex = Math.floor(Math.random() * newProducts.length);
      }
      randomizedProducts.push(newProducts[randomIndex]);
    }
    tempProducts.value = randomizedProducts;
  }
});

const categoryProducts = computed<IProducts[][]>(() => {
  return categories.value
    .slice(0, 4)
    .map((category) => products.value.filter((product) => product.category === category.slug));
});
</script>

<style lang="scss" scoped>
@use "./Home.scss";
</style>
