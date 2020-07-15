import { Indentifiable, IdType } from "../shared/shared-types";
export interface IProduct extends Indentifiable {
  name: string;
  imageUrl: string;
}

export class Product implements IProduct {
  static typeId = "Product";
  constructor(
    public _id: IdType,
    public name: string,
    public imageUrl: string
  ) {}
}
