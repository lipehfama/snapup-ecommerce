import type { IProducts } from "@/types/IProducts";
import { BASE_URL } from "@/utils/apiURL";
import { STATUS } from "@/utils/status";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchProducts: [] as IProducts[],
    searchProductsStatus: STATUS.IDLE as string
  }),
  getters: {
    getSearchProducts(state): IProducts[] {
      return state.searchProducts;
    },
    getSearchProductsStatus(): string {
      return this.searchProductsStatus;
    },
    isLoading(state): boolean {
      return state.searchProductsStatus === STATUS.LOADING;
    },
    hasError(state): boolean {
      return state.searchProductsStatus === STATUS.FAILED;
    }
  },
  actions: {
    async fetchSearchProducts(searchTerm: string) {
      this.searchProductsStatus = STATUS.LOADING;
      try {
        const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
        const data = await response.json();
        //console.log(data.products);
        this.searchProducts = data.products;
        this.searchProductsStatus = STATUS.SUCCEEDED;
      } catch (error) {
        console.error("Failed to fetch search products:", error);
        this.searchProductsStatus = STATUS.FAILED;
      }
    },
    clearSearchResults() {
      this.searchProducts = [];
      this.searchProductsStatus = STATUS.IDLE;
    }
  }
});
