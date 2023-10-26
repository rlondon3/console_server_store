import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import chai from 'chai';
import { UserStore } from '../../models/user';
import { ProductStore } from '../../models/product';

dotenv.config();
require('dotenv').config();

const {
    FIRSTNAME,
    LASTNAME,
    ADDRESS,
    PASSWORD,
  } = process.env;

const userStore = new UserStore();
const productStore = new ProductStore
const expect = chai.expect;
const request = supertest(app);

describe('Products handler', () => {
    before(async () => {
        await userStore.create({
            firstname: FIRSTNAME,
            lastname: LASTNAME,
            email: "product@product_route.com",
            address: ADDRESS,
            username: "product",
            password: PASSWORD,
            isAdmin: false
        });
        await productStore.create({
            name: "Tea",
            description: "560mg Pu'er tea cakes",
            price: "99.99",
            qty: 10
        });
    });
    describe('Test Products Routes', () => {
        let token: string;
        
        it('should require an authenticated user', async () => {
            const res = await request
            .post('/user/authenticate')
            .send({
                username: "product",
                password: PASSWORD,
            })
            .set('Accepted', 'application/json');
            token = 'Bearer ' + res.body;
            expect(res.status).to.equal(200);
        });
        it('should create a product with authentication token', async () => {
            const res = await request
            .post('/product')
            .send({
                name: "Test Product",
                description: "Test Description",
                price: 399.99,
                qty: 10
            
            })
            .set('Accepted', 'application/json')
            .set('Authorization', token);
            expect(res.status).to.equal(200);
        });
        it('should update the product with authentication token', async () => {
            const res = await request
            .put('/update/product/1')
            .send({
                name: "Test Product (updated)",
                description: "Test Description (updated)",
                price: 9.99,
                qty: 1
                
            })
            .set('Accepted', 'application/json')
            .set('Authorization', token);
            expect(res.body.name).to.equal("Test Product (updated)")
            expect(res.status).to.equal(200);
        });
        it('should get all products', async () => {
            const res = await request.get('/products');
            expect(res.status).to.equal(200);
        });
        it('should get a product by id', async () => {
            const res = await request.get('/product/1');
            expect(res.status).to.equal(200);
        });
        it('should delete the product with authentication token', async () => {
            const res = await request
                .delete('/delete/product/2')
                .set('Authorization', token)
                .set('Accepted', 'application/json');
                expect(res.status).to.equal(200);
        });
    })
})