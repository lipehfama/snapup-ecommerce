<template>
  <nav class="navbar d-block">
    <section class="navbar-cnt d-flex align-items-center">
      <aside class="brand-and-toggler d-flex align-items-center gap-1">
        <button aria-label="sidebar" class="sidebar-shown-btn text-white p-2" @click="setSideBarOn">
          <i class="bi bi-list bold-icon"></i>
        </button>
        <router-link to="/" class="navbar-brand d-flex align-items-center text-white">
          <span class="navbar-brand-ico">
            <i class="bi bi-bag-dash-fill"></i>
          </span>
          <span class="navbar-brand-txt mx-2"> <span class="fw-bold">Snap</span>Up. </span>
        </router-link>
      </aside>

      <aside class="navbar-collapse w-100">
        <article class="navbar-search bg-white">
          <div class="d-flex align-items-center">
            <input
              type="text"
              class="form-control fs-6"
              placeholder="Search your preferred items here"
              @change="handleSearchTerm"
            />
            <router-link
              aria-label="search"
              :to="searchTerm ? `/search/${searchTerm}` : ''"
              class="text-white search-btn d-flex align-items-center justify-content-center"
              :class="{ disabled: !searchTerm }"
            >
              <i class="bi bi-search"></i>
            </router-link>
          </div>
        </article>
        <ul class="navbar-nav d-none d-lg-flex align-items-center fs-5 fw-normal font-manrope">
          <li
            v-for="(category, idx) in categories.slice(0, 8)"
            :key="idx"
            class="navbar-item no-wrap"
          >
            <router-link :to="`/category/${category.slug}`" class="navbar-link text-capitalize">
              {{ category.name.replace("-", "") }}
            </router-link>
          </li>
        </ul>
      </aside>
      <aside class="navbar-cart d-flex align-items-center">
        <router-link to="/cart" class="cart-btn">
          <i class="bi bi-cart"></i>
          <div class="cart-items-value">{{ itemsCount }}</div>
          <CartModal :carts="carts" />
        </router-link>
      </aside>
    </section>
  </nav>
</template>

<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebarStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { computed, onMounted, ref, watch } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";
import CartModal from "@/components/CartModal/CartModal.vue";

// Access the sidebar store
const sidebarStore = useSidebarStore();
const categoryStore = useCategoryStore();
const cartStore = useCartStore();
const { carts, itemsCount } = storeToRefs(cartStore);
const searchTerm = ref("");

/*
onMounted(() => {
  cartStore.getCartTotal(carts.value);
});
*/
watch(
  () => cartStore.carts,
  () => {
    cartStore.getCartTotal(carts.value);
  },
  { deep: true, immediate: true }
);
/*
  watch(carts, () => {
    cartStore.getCartTotal(carts.value);
  });
*/

//console.log(itemsCount.value);
// Method to toggle sidebar and log its status
const setSideBarOn = () => {
  // Update the state (set isSidebarOn to true)
  sidebarStore.setSidebarOn();
};

onMounted(() => {
  categoryStore.fetchCategories();
});

const categories = computed(() => categoryStore.categories);
//console.log("Categories:", categories);

const handleSearchTerm = (e: Event) => {
  const target = e.target as HTMLInputElement;
  searchTerm.value = target.value;
};
</script>

<style lang="scss" scoped>
@import "./Navbar.module.scss";
</style>
