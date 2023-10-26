"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.productOrdered = exports.updateOrder = exports.createOrder = exports.getOrderById = exports.getOrder = void 0;
const order_1 = require("../../models/order");
const orderStore = new order_1.OrderStore();
async function getOrder() {
    try {
        return await orderStore.index();
    }
    catch (error) {
        return error.message;
    }
}
exports.getOrder = getOrder;
async function getOrderById(orderId) {
    try {
        return await orderStore.show(parseInt(orderId));
    }
    catch (error) {
        return error.message;
    }
}
exports.getOrderById = getOrderById;
async function createOrder(newOrder) {
    try {
        const order = JSON.parse(newOrder);
        const createdOrder = await orderStore.create(order);
        return `Order created with ID: ${createdOrder.id}`;
    }
    catch (error) {
        return `Error creating the order: ${error.message}`;
    }
}
exports.createOrder = createOrder;
async function updateOrder(orderId, updatedOrder) {
    try {
        const order = JSON.parse(updatedOrder);
        order.id = parseInt(orderId);
        const res = await orderStore.update(order);
        if (res) {
            return 'Order updated successfully.';
        }
        else {
            return 'Order not found.';
        }
    }
    catch (error) {
        return `Error updating the order: ${error.message}`;
    }
}
exports.updateOrder = updateOrder;
async function productOrdered(add) {
    try {
        const res = await orderStore.productOrdered(add);
        return res;
    }
    catch (error) {
        return error.message;
    }
}
exports.productOrdered = productOrdered;
async function deleteOrder(orderId) {
    try {
        const res = await orderStore.delete(parseInt(orderId));
        if (!res) {
            return 'Order deleted successfully.';
        }
        else {
            return 'Order not found.';
        }
    }
    catch (error) {
        return `Error deleting the order: ${error.message}`;
    }
}
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orderUtil.js.map