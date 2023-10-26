import { OrderStore, Order, ProductOrdered } from "../../models/order";

const orderStore = new OrderStore();

export async function getOrder(): Promise<Order[]> {
    try {
        return await orderStore.index()
    } catch (error) {
        return error.message;
    }
}

export async function getOrderById(orderId: string): Promise<Order> {
    try {
        return await orderStore.show(parseInt(orderId));
    } catch (error) {
        return error.message;  
    }
}

export async function createOrder(newOrder: string): Promise<string> {
    try {
        const order = JSON.parse(newOrder);
        const createdOrder = await orderStore.create(order);
        return `Order created with ID: ${createdOrder.id}`;
    } catch (error) {
        return `Error creating the order: ${error.message}`;
    }
}
  
export async function updateOrder(orderId: string, updatedOrder: string): Promise<string> {
    try {
        const order = JSON.parse(updatedOrder);
        order.id = parseInt(orderId);
        const res = await orderStore.update(order);
        
        if (res) {
        return 'Order updated successfully.';
        } else {
        return 'Order not found.';
        }
    } catch (error) {
        return `Error updating the order: ${error.message}`;
    }
}

export async function productOrdered(add: ProductOrdered): Promise<ProductOrdered> {
    try {
        const res = await orderStore.productOrdered(add);
        return res;
    } catch (error) {
        return error.message;
    }
}
  
export async function deleteOrder(orderId: string): Promise<string> {
    try {
        const res = await orderStore.delete(parseInt(orderId));
        
        if (!res) {
        return 'Order deleted successfully.';
        } else {
        return 'Order not found.';
        }
    } catch (error) {
        return `Error deleting the order: ${error.message}`;
    }
}
  