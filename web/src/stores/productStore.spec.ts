import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { useProductStore } from "./productStore";
import { STATUS } from "@/utils/status";

const product = {
  id: 1,
  title: "Gaming Keyboard",
  description: "Mechanical keyboard",
  price: 100,
  discountPercentage: 20,
  discountedPrice: 80,
  rating: 4.5,
  stock: 10,
  brand: "SnapUp",
  category: "gaming",
  thumbnail: "/keyboard.jpg",
  images: ["/keyboard.jpg"]
};

describe("productStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vi.restoreAllMocks();
  });

  it("starts with an empty products array", () => {
    const store = useProductStore();

    expect(store.products).toEqual([]);
    expect(store.productsStatus).toBe(STATUS.IDLE);
  });

  it("fetches products successfully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({
          products: [product]
        })
      })
    );

    const store = useProductStore();

    await store.fetchProducts(10);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("products?limit=10"));

    expect(store.products).toEqual([product]);
    expect(store.productsStatus).toBe(STATUS.SUCCEEDED);
  });

  it("sets status to failed when product request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const store = useProductStore();

    await store.fetchProducts(10);

    expect(store.productsStatus).toBe(STATUS.FAILED);

    consoleSpy.mockRestore();
  });

  it("fetches a single product", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(product)
      })
    );

    const store = useProductStore();

    await store.fetchProductSingle(1);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("products/1"));

    expect(store.productSingle).toEqual(product);
    expect(store.productSingleStatus).toBe(STATUS.SUCCEEDED);
  });

  it("sets single product status to failed when request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const store = useProductStore();

    await store.fetchProductSingle(1);

    expect(store.productSingleStatus).toBe(STATUS.FAILED);

    consoleSpy.mockRestore();
  });
});
