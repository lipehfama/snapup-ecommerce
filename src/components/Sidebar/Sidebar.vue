<template>
  <aside :class="['sidebar', isSidebarOn ? 'hide-sidebar' : '']">
    <button aria-label="sidebar" type="button" class="sidebar-hide-btn" @click="setSidebarOff">
      <i class="bi bi-x bold-icon"></i>
    </button>
    <div class="sidebar-cnt">
      <div class="cat-title fs-4 text-uppercase fw-bold ls-1h">All Categories</div>
      <ul class="cat-list">
        <li v-for="(category, idx) in categories" :key="idx" @click="setSidebarOff">
          <router-link :to="`/category/${category.slug}`" class="cat-list-link text-capitalize">
            {{ category.name.replace("-", "") }}
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebarStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { computed, onMounted } from "vue";

const sidebarStore = useSidebarStore();
const categoryStore = useCategoryStore();

const isSidebarOn = computed(() => sidebarStore.isSidebarOn);
const setSidebarOff = sidebarStore.setSidebarOff;

onMounted(() => {
  categoryStore.fetchCategories();
});

const categories = computed(() => categoryStore.categories);
</script>

<style lang="scss" scoped>
@use "./Sidebar.scss";
</style>
