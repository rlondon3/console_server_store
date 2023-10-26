"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProduct = void 0;
const product_1 = require("../../models/product");
const productStore = new product_1.ProductStore();
async function getProduct() {
    try {
        return await productStore.index();
    }
    catch (error) {
        return error.message;
    }
}
exports.getProduct = getProduct;
async function getProductById(productId) {
    try {
        return await productStore.show(parseInt(productId));
    }
    catch (error) {
        return error.message;
    }
}
exports.getProductById = getProductById;
async function createProduct(newProduct) {
    try {
        const product = JSON.parse(newProduct);
        const createdProduct = await productStore.create(product);
        return `Product created with ID: ${createdProduct.id}`;
    }
    catch (error) {
        return `Error creating the product: ${error.message}`;
    }
}
exports.createProduct = createProduct;
async function updateProduct(productId, updatedProduct) {
    try {
        const product = JSON.parse(updatedProduct);
        product.id = parseInt(productId);
        const result = await productStore.update(product);
        if (result) {
            return 'Product updated successfully.';
        }
        else {
            return 'Product not found.';
        }
    }
    catch (error) {
        return `Error updating the product: ${error.message}`;
    }
}
exports.updateProduct = updateProduct;
async function deleteProduct(productId) {
    try {
        const res = await productStore.delete(parseInt(productId));
        if (!res) {
            return 'Product deleted successfully.';
        }
        else {
            return 'Product not found.';
        }
    }
    catch (error) {
        return `Error deleting the product: ${error.message}`;
    }
}
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productUtil.js.map