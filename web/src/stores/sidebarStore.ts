import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isSidebarOn: false
  }),
  actions: {
    setSidebarOn() {
      this.isSidebarOn = true;
    },
    setSidebarOff() {
      this.isSidebarOn = false;
    }
  }
});
