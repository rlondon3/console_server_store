import { ProductStore, Product } from "../../models/product";

const productStore = new ProductStore();

export async function getProduct(): Promise<Product[]> {
    try {
      return await productStore.index()
    } catch (error) {
      return error.message;
    }
  }

  export async function getProductById(productId: string): Promise<Product> {
    try {
      return await productStore.show(parseInt(productId));
    } catch (error) {
      return error.message;  
    }
  }

export async function createProduct(newProduct: string): Promise<string> {
    try {
      const product = JSON.parse(newProduct);
      const createdProduct = await productStore.create(product);
      return `Product created with ID: ${createdProduct.id}`;
    } catch (error) {
      return `Error creating the product: ${error.message}`;
    }
}
  
export async function updateProduct(productId: string, updatedProduct: string): Promise<string> {
    try {
      const product = JSON.parse(updatedProduct);
      product.id = parseInt(productId);
      const result = await productStore.update(product);
      
      if (result) {
        return 'Product updated successfully.';
      } else {
        return 'Product not found.';
      }
    } catch (error) {
      return `Error updating the product: ${error.message}`;
    }
}
  
export async function deleteProduct(productId: string): Promise<string> {
    try {
      const res = await productStore.delete(parseInt(productId));
      
      if (!res) {
        return 'Product deleted successfully.';
      } else {
        return 'Product not found.';
      }
    } catch (error) {
      return `Error deleting the product: ${error.message}`;
    }
}
  