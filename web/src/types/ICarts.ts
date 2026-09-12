import type { IProducts } from "./IProducts";

export interface ICartItems extends IProducts {
  quantity: number;
  totalPrice: number;
}

export interface ICartState {
  carts: ICartItems[];
  itemsCount: number;
  totalAmount: number;
  isCartMessageOn: boolean;
}
