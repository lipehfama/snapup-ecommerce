import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

import BackToTopButton from "./BackToTopButton.vue";

describe("BackToTopButton", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true
    });

    window.scrollTo = vi.fn();
  });

  it("is hidden when the page is at the top", () => {
    const wrapper = mount(BackToTopButton);

    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("remains hidden before 300 pixels", async () => {
    const wrapper = mount(BackToTopButton);

    Object.defineProperty(window, "scrollY", {
      value: 250,
      writable: true,
      configurable: true
    });

    window.dispatchEvent(new Event("scroll"));

    await wrapper.vm.$nextTick();

    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("appears after scrolling more than 300 pixels", async () => {
    const wrapper = mount(BackToTopButton);

    Object.defineProperty(window, "scrollY", {
      value: 500,
      writable: true,
      configurable: true
    });

    window.dispatchEvent(new Event("scroll"));

    await wrapper.vm.$nextTick();

    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("scrolls smoothly to the top when clicked", async () => {
    Object.defineProperty(window, "scrollY", {
      value: 500,
      writable: true,
      configurable: true
    });

    const wrapper = mount(BackToTopButton);

    await wrapper.get("button").trigger("click");

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth"
    });
  });

  it("has an accessible label", async () => {
    Object.defineProperty(window, "scrollY", {
      value: 500,
      writable: true,
      configurable: true
    });

    const wrapper = mount(BackToTopButton);

    const button = wrapper.get("button");

    expect(button.attributes("aria-label")).toBe("Back to top");
  });
});
