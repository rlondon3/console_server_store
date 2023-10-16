import client from '../database';
import { PoolClient } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { SALT_ROUNDS, PEPPER } = process.env;

export type User = {
    id?: number;
    username: string;
    password: string;
    isAdmin: boolean;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users;';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (error) {
            throw new Error(`Can't retrieve users: ${error}`);
        }
    }
    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Can't find user: ${error}`); 
        }
    }
    async create(user: User): Promise<User> {
        try {
            const conn: PoolClient = await client.connect();
            const sql =
            'INSERT INTO users (username, password, isAdmin) VALUES ($1, $2, $3) RETURNING *';
            const hash = bcrypt.hashSync(
                user.password + `${PEPPER}.processs.env`,
                parseInt(`${SALT_ROUNDS}.process.env` as string)
            );
            const res = await conn.query(sql, [user.username, hash, user.isAdmin]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Could not add user" ${error}`);
        }
    }
    async update(user: User): Promise<User> {
        try {
            const sql = 
            'UPDATE users SET username=($1), password=($2), isAdmin=($3) WHERE id=($4) RETURNING *';
            const conn: PoolClient = await client.connect();
            const hash = bcrypt.hashSync(
                user.password + `${PEPPER}`,
                parseInt(`${SALT_ROUNDS}` as unknown as string)
            );
            const res = await conn.query(sql, [user.username, hash, user.isAdmin, user.id]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Could not update user: ${error}`);
        }
    }
    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1);';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new Error(`Could not delete user: ${error}`);
        }
    }
    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const conn: PoolClient = await client.connect();
            const res = await conn.query(sql, [username]);
            if (res.rows.length) {
                bcrypt.compareSync(password + `${PEPPER}`, res.rows[0].password);
                return res.rows[0];
            }
            return null;
        } catch (error) {
            throw new Error(`Could not authenticate: ${error}`);
        }
    }
}