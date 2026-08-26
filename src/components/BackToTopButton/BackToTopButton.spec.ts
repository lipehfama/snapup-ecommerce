import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import BackToTopButton from "./BackToTopButton.vue";

const setScrollPosition = (value: number) => {
  Object.defineProperty(window, "scrollY", {
    value,
    writable: true,
    configurable: true
  });

  window.dispatchEvent(new Event("scroll"));
};

describe("BackToTopButton", () => {
  beforeEach(() => {
    setScrollPosition(0);

    window.scrollTo = vi.fn();
  });

  it("is hidden when the page is at the top", () => {
    const wrapper = mount(BackToTopButton);

    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("remains hidden before 300 pixels", async () => {
    const wrapper = mount(BackToTopButton);

    setScrollPosition(250);

    await wrapper.vm.$nextTick();

    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("appears after scrolling more than 300 pixels", async () => {
    const wrapper = mount(BackToTopButton);

    setScrollPosition(500);

    await wrapper.vm.$nextTick();

    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("scrolls smoothly to the top when clicked", async () => {
    const wrapper = mount(BackToTopButton);

    setScrollPosition(500);

    await wrapper.vm.$nextTick();

    await wrapper.get("button").trigger("click");

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth"
    });
  });

  it("has an accessible label", async () => {
    const wrapper = mount(BackToTopButton);

    setScrollPosition(500);

    await wrapper.vm.$nextTick();

    expect(wrapper.get("button").attributes("aria-label")).toBe("Back to top");
  });
});
