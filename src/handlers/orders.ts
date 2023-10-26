import express, { Request, Response } from 'express';
import { Order, OrderStore, ProductOrdered } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        return res.status(200).json(order);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.user_id,
        order_status:  'active'
    };
    try {
        const newOrder = await store.create(order);
        return res.status(200).json(newOrder);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const update = async (req: Request, res: Response) => {
    const order: Order = {
        id: parseInt(req.params.id),
        user_id: req.body.user_id,
        order_status: req.body.order_status
    };
    try {
        const updateOrder = await store.update(order);
        return res.status(200).json(updateOrder);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const deletes = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await store.delete(parseInt(req.params.id));
        return res.status(200).json(deletedOrder);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const product = async (req: Request, res: Response) => {
    const productOrdered: ProductOrdered = {
        quantity: parseInt(req.body.quantity),
        product_id: req.body.product_id,
        order_id: req.params.id
    }
    try {
        const ordered = await store.productOrdered(productOrdered);
        return res.status(200).json(ordered);
    } catch (error) {
        console.log(error, 'error')
        return res.status(400).json(error);
    }
}

const order_route = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.put('/update/order/:id', update);
    app.delete('/order/:id', deletes);
    app.post('/order/:id/products', product);
}

export default order_route;