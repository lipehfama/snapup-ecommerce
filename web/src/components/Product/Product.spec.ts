import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Product from "./Product.vue";

const product = {
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
  images: ["/keyboard.jpg"]
};

describe("Product", () => {
  it("renders the product title", () => {
    const wrapper = mount(Product, {
      props: {
        product
      },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>"
          }
        }
      }
    });

    expect(wrapper.text()).toContain("Gaming Keyboard");
  });

  it("renders the product category", () => {
    const wrapper = mount(Product, {
      props: {
        product
      },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>"
          }
        }
      }
    });

    expect(wrapper.text()).toContain("gaming");
  });

  it("renders the product brand", () => {
    const wrapper = mount(Product, {
      props: {
        product
      },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>"
          }
        }
      }
    });

    expect(wrapper.text()).toContain("SnapUp");
  });

  it("uses the category when the product has no brand", () => {
    const wrapper = mount(Product, {
      props: {
        product: {
          ...product,
          brand: ""
        }
      },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>"
          }
        }
      }
    });

    expect(wrapper.text()).toContain("gaming");
  });

  it("renders the first product image", () => {
    const wrapper = mount(Product, {
      props: {
        product
      },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>"
          }
        }
      }
    });

    const image = wrapper.get("img");

    expect(image.attributes("src")).toBe("/keyboard.jpg");

    expect(image.attributes("alt")).toBe("Gaming Keyboard");
  });

  it("renders formatted product prices", () => {
    const wrapper = mount(Product, {
      props: {
        product
      },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>"
          }
        }
      }
    });

    expect(wrapper.text()).toContain("$100.00");
    expect(wrapper.text()).toContain("$80.00");
  });

  it("renders the discount percentage", () => {
    const wrapper = mount(Product, {
      props: {
        product
      },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>"
          }
        }
      }
    });

    expect(wrapper.text()).toContain("20% Off");
  });
});
