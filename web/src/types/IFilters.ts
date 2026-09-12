import type { IProducts } from "./IProducts";

export interface ICategory extends IProducts {
  slug: string;
  name: string;
  url: string;
}
