import { defineStore } from "pinia";
import { BASE_URL } from "@/utils/apiURL";
import { STATUS } from "@/utils/status";
import type { IProducts } from "@/types/IProducts";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as IProducts[],
    productsStatus: STATUS.IDLE as string,
    productSingle: {} as IProducts,
    productSingleStatus: STATUS.IDLE as string
  }),
  getters: {
    allProducts(state): IProducts[] {
      return state.products;
    },
    allProductsStatus(state): string {
      return state.productsStatus;
    },
    singleProduct(state): IProducts {
      return state.productSingle;
    },
    isLoading(state): boolean {
      return (
        state.productsStatus === STATUS.LOADING || state.productSingleStatus === STATUS.LOADING
      );
    },
    hasError(state): boolean {
      return state.productsStatus === STATUS.FAILED || state.productSingleStatus === STATUS.FAILED;
    }
  },
  actions: {
    async fetchProducts(limit: number) {
      this.productsStatus = STATUS.LOADING;
      try {
        const response = await fetch(`${BASE_URL}products?limit=${limit}`);
        const data = await response.json();
        //console.log(data);
        this.products = data.products;
        this.productsStatus = STATUS.SUCCEEDED;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        this.productsStatus = STATUS.FAILED;
      }
    },
    async fetchProductSingle(id: number | string) {
      this.productSingleStatus = STATUS.LOADING;
      try {
        const response = await fetch(`${BASE_URL}products/${id}`);
        const data = await response.json();
        //console.group(data)
        this.productSingle = data;
        this.productSingleStatus = STATUS.SUCCEEDED;
      } catch (error) {
        console.error("Failed to fetch single product:", error);
        this.productSingleStatus = STATUS.FAILED;
      }
    }
  }
});
