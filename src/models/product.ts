import client from "../database";
import { PoolClient } from "pg";

export type Product = {
    id?: number; 
    name: string;
    description: string;
    price: number | string;
    qty: number | string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (error) {
            throw new Error(`Could not get products: ${error}`);
        }       
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Could not find product: ${error}`);
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, description, price, qty) VALUES ($1, $2, $3, $4) RETURNING *';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql, [
                product.name,
                product.description,
                product.price,
                product.qty
            ]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Could not create product: ${error}`);
        }
    }

    async update(product: Product): Promise<Product> {
        try {
            const sql =
                'UPDATE products SET name=($1), description=($2), price=($3), qty=($4) WHERE id=($5) RETURNING *';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql, [
                product.name,
                product.description,
                product.price,
                product.qty,
                product.id
            ]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Could not update product: ${error}`);
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Could not delete product: ${error}`);
        }
    }
}

