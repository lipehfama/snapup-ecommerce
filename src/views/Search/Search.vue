<template>
  <main>
    <section class="search-content bg-whitesmoke">
      <div class="container">
        <article class="py-5">
          <aside class="title-md">
            <h3>Search results:</h3>
          </aside>
          <br />
          <Loader v-if="searchStatus === STATUS.LOADING" />
          <section v-else-if="searchProducts.length > 0">
            <ProductList :products="searchProducts" />
          </section>
          <section v-else class="fw-5 text-danger py-5" style="min-height: 70vh">
            <h3>No Products found.</h3>
          </section>
        </article>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "./Search.scss";
</style>

<script setup lang="ts">
import Loader from "@/components/Loader/Loader.vue";
import ProductList from "@/components/ProductList/ProductList.vue";
import { useSearchStore } from "@/stores/searchStore";
import { STATUS } from "@/utils/status";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchStore = useSearchStore();

const searchProducts = computed(() => searchStore.searchProducts);
const searchStatus = computed(() => searchStore.searchProductsStatus);

const fetchSearch = async (term: string) => {
  searchStore.clearSearchResults();
  await searchStore.fetchSearchProducts(term);
  //console.log("Search loaded:", searchProducts.value);
};

// When the component is mounted (first time)
onMounted(() => {
  fetchSearch(route.params.searchTerm as string);
});

// Whenever the parameter changes
watch(
  () => route.params.searchTerm,
  (newTerm) => {
    fetchSearch(newTerm as string);
  }
);
</script>
