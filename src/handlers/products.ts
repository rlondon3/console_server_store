import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { authenticationToken } from '../services/authenticate';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const create = async (req: Request, res: Response) =>{
    const product: Product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        qty: req.body.qty
    };

    try {
        const newProduct = await store.create(product);
        return res.status(200).json(newProduct)    
    } catch (error) {
        return res.status(400).json(error);
    }
};

const update = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        qty: req.body.qty,
        id: parseInt(req.params.id)
    }
    try {
        const updateProduct = await store.update(product);
        return res.status(200).json(updateProduct);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const deletes = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await store.delete(parseInt(req.params.id));
        return res.status(200).json(deletedProduct);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const products_route = (app: express.Application) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product', authenticationToken, create);
    app.put('/update/product/:id', authenticationToken, update);
    app.delete('/delete/product/:id', authenticationToken, deletes);
}

export default products_route;