import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { useCartStore } from "./cartStore";
import type { ICartItems } from "@/types/ICarts";

const createCartItem = (overrides: Partial<ICartItems> = {}): ICartItems => ({
  id: 1,
  title: "Gaming Keyboard",
  description: "Mechanical gaming keyboard",
  price: 100,
  discountPercentage: 20,
  discountedPrice: 80,
  rating: 4.5,
  stock: 10,
  brand: "SnapUp",
  category: "gaming",
  thumbnail: "/keyboard.jpg",
  images: ["/keyboard.jpg"],
  quantity: 1,
  totalPrice: 80,
  ...overrides
});

describe("cartStore", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("starts with an empty cart", () => {
    const store = useCartStore();

    expect(store.carts).toEqual([]);
  });

  it("adds a product to the cart", () => {
    const store = useCartStore();
    const product = createCartItem();

    store.addToCart(product);

    expect(store.carts).toHaveLength(1);
    expect(store.carts[0].id).toBe(product.id);
  });

  it("stores the cart in localStorage", () => {
    const store = useCartStore();
    const product = createCartItem();

    store.addToCart(product);

    const savedCart = JSON.parse(localStorage.getItem("cart") ?? "[]");

    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].id).toBe(product.id);
  });

  it("increases quantity when the same product is added again", () => {
    const store = useCartStore();

    store.addToCart(createCartItem({ quantity: 1 }));
    store.addToCart(createCartItem({ quantity: 1 }));

    expect(store.carts).toHaveLength(1);
    expect(store.carts[0].quantity).toBe(2);
  });

  it("removes a product from the cart", () => {
    const store = useCartStore();

    store.addToCart(createCartItem());

    store.removeFromCart(1);

    expect(store.carts).toHaveLength(0);
  });

  it("clears all products from the cart", () => {
    const store = useCartStore();

    store.addToCart(createCartItem({ id: 1 }));
    store.addToCart(createCartItem({ id: 2 }));

    store.clearCart();

    expect(store.carts).toEqual([]);
  });

  it("increments product quantity", () => {
    const store = useCartStore();

    store.addToCart(createCartItem());

    store.toggleCartQty({
      id: 1,
      type: "INC"
    });

    expect(store.carts[0].quantity).toBe(2);
  });

  it("does not increment quantity beyond available stock", () => {
    const store = useCartStore();

    store.addToCart(
      createCartItem({
        stock: 2,
        quantity: 2
      })
    );

    store.toggleCartQty({
      id: 1,
      type: "INC"
    });

    expect(store.carts[0].quantity).toBe(2);
  });

  it("does not decrease quantity below 1", () => {
    const store = useCartStore();

    store.addToCart(
      createCartItem({
        quantity: 1
      })
    );

    store.toggleCartQty({
      id: 1,
      type: "DEC"
    });

    expect(store.carts[0].quantity).toBe(1);
  });

  it("calculates the cart total", () => {
    const store = useCartStore();

    store.addToCart(
      createCartItem({
        id: 1,
        totalPrice: 80
      })
    );

    store.addToCart(
      createCartItem({
        id: 2,
        totalPrice: 40
      })
    );

    store.getCartTotal();

    expect(store.totalAmount).toBe(120);
    expect(store.itemsCount).toBe(2);
  });

  it("shows and hides the cart message", () => {
    vi.useFakeTimers();

    const store = useCartStore();

    store.setCartMessageOn();

    expect(store.isCartMessageOn).toBe(true);

    vi.advanceTimersByTime(2000);

    expect(store.isCartMessageOn).toBe(false);

    vi.useRealTimers();
  });
});
