"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        return res.status(200).json(orders);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        return res.status(200).json(order);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const create = async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        order_status: 'active'
    };
    try {
        const newOrder = await store.create(order);
        return res.status(200).json(newOrder);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const update = async (req, res) => {
    const order = {
        id: parseInt(req.params.id),
        user_id: req.body.user_id,
        order_status: req.body.order_status
    };
    try {
        const updateOrder = await store.update(order);
        return res.status(200).json(updateOrder);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const deletes = async (req, res) => {
    try {
        const deletedOrder = await store.delete(parseInt(req.params.id));
        return res.status(200).json(deletedOrder);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const product = async (req, res) => {
    const productOrdered = {
        quantity: parseInt(req.body.quantity),
        product_id: req.body.product_id,
        order_id: req.params.id
    };
    try {
        const ordered = await store.productOrdered(productOrdered);
        return res.status(200).json(ordered);
    }
    catch (error) {
        console.log(error, 'error');
        return res.status(400).json(error);
    }
};
const order_route = (app) => {
    app.get('/orders', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.put('/update/order/:id', update);
    app.delete('/order/:id', deletes);
    app.post('/order/:id/products', product);
};
exports.default = order_route;
//# sourceMappingURL=orders.js.map