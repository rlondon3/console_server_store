import * as userUtils from '../src/utils/userUtil/userUtil';
import * as productUtils from '../src/utils/productUtil/productUtil.js';
import * as orderUtils from '../src/utils/orderUtil/orderUtil.js';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let continueLoop = true;

(async () => {
  while (continueLoop) {
    let input = await prompt('Please choose a database table to access (type "users", "products", or "orders" to access these table; type "other" for more options; or "exit" to quit): ');
    
    if (input.toLowerCase() === 'users') {
        console.log(await userUtils.getUser());
    } else if (input.toLowerCase() === 'products') {
        console.log(await productUtils.getProduct());
    } else if (input.toLowerCase() === 'orders') {
        console.log(await orderUtils.getOrder());
    } else if (input.toLowerCase() === 'other') {
        input = await prompt('Please choose an action (type "get <table name>", "create <table name>", "update <table name>", "delete <table name>", "ordered <products>". Example "create users". Type "exit" to quit): ');
        
        if (input.toLowerCase() === 'create users') {
            const newUser = await prompt('Enter the user information in JSON format: ');
            console.log(await userUtils.createUser(newUser));
        } else if (input.toLowerCase() === 'get users') {
            const userIdPromise = prompt('Enter the user ID to get the user: ');
            const userId = await userIdPromise;
            console.log(await userUtils.getUserById(userId));
        } else if (input.toLowerCase() === 'update users') {
            const userId = await prompt('Enter the user ID to update: ');
            const updatedUser = await prompt('Enter the updated user information in JSON format: ');
            console.log(await userUtils.updateUser(userId, updatedUser));
        } else if (input.toLowerCase() === 'delete users') {
            const userId = await prompt('Enter the user ID to delete: ');
            console.log(await userUtils.deleteUser(userId));
        }
        
        if (input.toLowerCase() === 'create products') {
            const newProduct = await prompt('Enter the product information in JSON format: ');
            console.log(await productUtils.createProduct(newProduct));
        } else if (input.toLowerCase() === 'get products') {
            const productIdPromise = prompt('Enter the product ID to get the product: ');
            const productId = await productIdPromise;
            console.log(await productUtils.getProductById(productId));
        } else if (input.toLowerCase() === 'update products') {
            const productId = await prompt('Enter the product ID to update: ');
            const updatedProduct = await prompt('Enter the updated product information in JSON format: ');
            console.log(await productUtils.updateProduct(productId, updatedProduct));
        } else if (input.toLowerCase() === 'delete products') {
            const productId = await prompt('Enter the product ID to delete: ');
            console.log(await productUtils.deleteProduct(productId));
        }

        if (input.toLowerCase() === 'create orders') {
            const newOrder = await prompt('Enter the order information in JSON format: ');
            console.log(await productUtils.createProduct(newOrder));
        } else if (input.toLowerCase() === 'get orders') {
            const orderIdPromise = prompt('Enter the order ID to get the order: ');
            const orderId = await orderIdPromise;
            console.log(await orderUtils.getOrderById(orderId));
        } else if (input.toLowerCase() === 'update orders') {
            const orderId = await prompt('Enter the order ID to update: ');
            const updatedOrder = await prompt('Enter the updated order information in JSON format: ');
            console.log(await orderUtils.updateOrder(orderId, updatedOrder));
        } else if (input.toLowerCase() === 'delete orders') {
            const orderId = await prompt('Enter the order ID to delete: ');
            console.log(await orderUtils.deleteOrder(orderId));
        } else if (input.toLowerCase() === 'ordered products') {
            const orderId = await prompt('Enter the order ID: ');
            const productId = await prompt('Enter the product ID: ');
            const quantity = await prompt('Enter the quantity: ');

            const productOrder = {
                order_id: orderId,
                product_id: productId,
                quantity: parseInt(quantity),
            };
            
            try {
                const res = await orderUtils.productOrdered(productOrder);
                console.log(`Product order successful! Updated stock quantity: ${JSON.stringify(res)}`);
            } catch (error) {
            console.error(`Product order failed: ${error.message}`);
            }
        }
    } 
    if (input.toLowerCase() === 'exit') {
        continueLoop = false;
    }
  }
  rl.close(); 
})();

async function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}
