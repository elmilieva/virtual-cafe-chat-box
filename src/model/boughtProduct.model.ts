import { Product } from "./product.model";

export interface IBoughtProduct {
  product: Product | undefined;
  state: String;
}

export class BoughtProduct implements IBoughtProduct {
  constructor(public product: Product | undefined, public state: String) {}
}
