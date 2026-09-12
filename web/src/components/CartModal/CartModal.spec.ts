import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import CartModal from "./CartModal.vue";
import type { ICartItems } from "@/types/ICarts";

const cartItem: ICartItems = {
  id: 1,
  title: "Gaming Mouse",
  description: "Wireless gaming mouse",
  price: 100,
  discountPercentage: 20,
  discountedPrice: 80,
  rating: 4.5,
  stock: 10,
  brand: "SnapUp",
  category: "gaming",
  thumbnail: "/mouse.jpg",
  images: ["/mouse.jpg"],
  quantity: 1,
  totalPrice: 80
};

describe("CartModal", () => {
  it("shows the empty cart state", () => {
    const wrapper = mount(CartModal, {
      props: {
        carts: []
      }
    });

    expect(wrapper.text()).toContain("No products yet");
  });

  it("renders products in the cart", () => {
    const wrapper = mount(CartModal, {
      props: {
        carts: [cartItem]
      }
    });

    expect(wrapper.text()).toContain("Gaming Mouse");
  });

  it("renders the discounted product price", () => {
    const wrapper = mount(CartModal, {
      props: {
        carts: [cartItem]
      }
    });

    expect(wrapper.text()).toContain("$80.00");
  });

  it("renders the product thumbnail", () => {
    const wrapper = mount(CartModal, {
      props: {
        carts: [cartItem]
      }
    });

    const image = wrapper.get(".cart-modal-item-img img");

    expect(image.attributes("src")).toBe("/mouse.jpg");
  });

  it("renders multiple cart products", () => {
    const wrapper = mount(CartModal, {
      props: {
        carts: [
          cartItem,
          {
            ...cartItem,
            id: 2,
            title: "Gaming Keyboard"
          }
        ]
      }
    });

    const items = wrapper.findAll(".cart-modal-item");

    expect(items).toHaveLength(2);
  });

  it("shows the view cart action when products exist", () => {
    const wrapper = mount(CartModal, {
      props: {
        carts: [cartItem]
      }
    });

    expect(wrapper.text()).toContain("view my shopping cart");
  });
});
