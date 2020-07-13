import { ProductRepository } from "../dao/repository";
import { IdType } from "../shared/shared-types";
import { Product } from "../model/product.model";

class ProductService {
  private repo = new ProductRepository();

  async getAllProducts() {
    const resp = await fetch("http://localhost:9000/api/products");
    const product = await resp.json();
    return product;
  }

  async getProductById(productId: IdType) {
    const resp = await fetch(`http://localhost:9000/api/products/${productId}`);
    const product = await resp.json();
    return product;
  }

  async createNewProduct(product: Product) {
    const resp = await fetch("http://localhost:9000/api/products", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const created = await resp.json();
    return created;
  }

  async updateProduct(product: Product) {
    const resp = await fetch(
      `http://localhost:9000/api/products/${product._id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );
    const updated = await resp.json();
    return updated;
  }

  async deleteProduct(productId: IdType) {
    const resp = await fetch(
      `http://localhost:9000/api/products/${productId}`,
      {
        method: "DELETE",
        mode: "cors",
      }
    );
    const deleted = await resp.json();
    return deleted;
  }
}

export default new ProductService();
