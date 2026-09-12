import { defineStore } from "pinia";
import { BASE_URL } from "@/utils/apiURL";
import { STATUS } from "@/utils/status";
import type { ICategory } from "@/types/IFilters";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [] as ICategory[],
    categoriesStatus: STATUS.IDLE as string,
    categoryProducts: [] as ICategory[],
    categoryProductsStatus: STATUS.IDLE as string
  }),
  getters: {
    getCategories(state): ICategory[] {
      return state.categories;
    },
    getCategoriesStatus(): string {
      return this.categoriesStatus;
    },
    getCategoryProducts(state): ICategory[] {
      return state.categoryProducts;
    },
    getCategoryProductsStatus(state): string {
      return state.categoryProductsStatus;
    },
    isLoading(state): boolean {
      return (
        state.categoriesStatus === STATUS.LOADING || state.categoryProductsStatus === STATUS.LOADING
      );
    },
    hasError(state): boolean {
      return (
        state.categoriesStatus === STATUS.FAILED || state.categoryProductsStatus === STATUS.FAILED
      );
    }
  },
  actions: {
    async fetchCategories() {
      this.categoriesStatus = STATUS.LOADING;
      try {
        const response = await fetch(`${BASE_URL}products/categories`);
        const data = await response.json();
        this.categories = data;
        this.categoriesStatus = STATUS.SUCCEEDED;
        //console.log("Response Status:", response.status);
      } catch (error) {
        this.categoriesStatus = STATUS.FAILED;
      }
    },
    async fetchProductsOfCategory(category: string) {
      this.categoryProductsStatus = STATUS.LOADING;
      try {
        const response = await fetch(`${BASE_URL}products/category/${category}`);
        const data = await response.json();
        //console.log("Fetched Categories:", data);
        this.categoryProducts = data.products;
        this.categoryProductsStatus = STATUS.SUCCEEDED;
      } catch (error) {
        this.categoryProductsStatus = STATUS.FAILED;
      }
    }
  }
});
