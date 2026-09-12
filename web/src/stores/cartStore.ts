import type { ICartItems, ICartState } from "@/types/ICarts";
import { defineStore } from "pinia";

//Add localStorage data
const fetchFromLocalStorage = (): ICartItems[] => {
  let cart = localStorage.getItem("cart");
  //console.log(cart);
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const storeInLocalStorage = (data: ICartItems[]) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

export const useCartStore = defineStore("cart", {
  state: (): ICartState => ({
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false
  }),
  getters: {
    getAllCarts(): ICartItems[] {
      return this.carts;
    },
    getCartMessageStatus(): boolean {
      return this.isCartMessageOn;
    }
  },
  actions: {
    addToCart(payload: ICartItems) {
      const isItemInCart = this.carts.find((item) => item.id === payload.id);

      if (isItemInCart) {
        this.carts = this.carts.map((item) => {
          if (item.id === payload.id) {
            const tempQty = item.quantity + payload.quantity;
            const tempTotalPrice = tempQty * item.price;

            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice
            };
          }
          return item;
        });
      } else {
        this.carts.push(payload);
      }
      //Update totals
      storeInLocalStorage(this.carts);
    },
    removeFromCart(id: ICartItems["id"]) {
      this.carts = this.carts.filter((item) => item.id !== id);
      storeInLocalStorage(this.carts);
    },
    clearCart() {
      this.carts = [];
      storeInLocalStorage(this.carts);
    },
    getCartTotal(this: ICartState, cartItems: ICartItems[] = this.carts) {
      this.totalAmount = this.carts.reduce((sum, item) => sum + item.totalPrice, 0);
      this.itemsCount = this.carts.length;
    },
    toggleCartQty(payload: { id: ICartItems["id"]; type: string }) {
      this.carts = this.carts.map((item) => {
        if (item.id === payload.id) {
          let quantity = item.quantity;
          if (payload.type === "INC") {
            quantity = Math.min(quantity + 1, item.stock);
          } else if (payload.type === "DEC") {
            quantity = Math.max(quantity - 1, 1);
          }
          return {
            ...item,
            quantity,
            totalPrice: quantity * item.discountedPrice
          };
        }
        return item;
      });

      storeInLocalStorage(this.carts);
      this.getCartTotal();
    },

    setCartMessageOn() {
      this.isCartMessageOn = true;
      // Optionally auto-hide after delay
      setTimeout(() => {
        this.setCartMessageOff();
      }, 2000);
    },
    setCartMessageOff() {
      //console.log("Calling setCartMessageOff()..."); // Debug
      this.isCartMessageOn = false;
    }
  }
});
