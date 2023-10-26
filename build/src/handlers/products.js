"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const authenticate_1 = require("../services/authenticate");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        return res.status(200).json(product);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        qty: req.body.qty
    };
    try {
        const newProduct = await store.create(product);
        return res.status(200).json(newProduct);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const update = async (req, res) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        qty: req.body.qty,
        id: parseInt(req.params.id)
    };
    try {
        const updateProduct = await store.update(product);
        return res.status(200).json(updateProduct);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const deletes = async (req, res) => {
    try {
        const deletedProduct = await store.delete(parseInt(req.params.id));
        return res.status(200).json(deletedProduct);
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
const products_route = (app) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product', authenticate_1.authenticationToken, create);
    app.put('/update/product/:id', authenticate_1.authenticationToken, update);
    app.delete('/delete/product/:id', authenticate_1.authenticationToken, deletes);
};
exports.default = products_route;
//# sourceMappingURL=products.js.map