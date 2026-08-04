<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/categoryStore";
import Loader from "@/components/Loader/Loader.vue";
import { STATUS } from "@/utils/status";
import ProductList from "@/components/ProductList/ProductList.vue";

const route = useRoute();
const categoryStore = useCategoryStore();

const category = computed(() => route.params.category as string);
const formattedCategory = computed(() => category.value.replace("-", ""));

const categoryProducts = computed(() => categoryStore.getCategoryProducts);
const categoryProductsStatus = computed(() => categoryStore.getCategoryProductsStatus);

watch(
  category,
  async (newCategory) => {
    if (newCategory) {
      await categoryStore.fetchProductsOfCategory(newCategory);
    }
  },
  { immediate: true }
);
</script>

<template>
  <main class="cat-products py-5 bg-whitesmoke">
    <section class="container">
      <article class="cat-products-content">
        <aside class="title-md">
          <h3>
            See our <span class="text-capitalize">{{ formattedCategory }}</span>
          </h3>
        </aside>

        <Loader v-if="categoryProductsStatus === STATUS.LOADING" />
        <ProductList v-else :products="categoryProducts" />
      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use "./CategoryProduct.scss";
</style>
