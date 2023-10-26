import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import chai from 'chai';
import { UserStore } from '../../models/user';
//import { OrderStore } from '../../models/order';
import { ProductStore } from '../../models/product';

dotenv.config();
require('dotenv').config();


const {
    FIRSTNAME,
    LASTNAME,
    ADDRESS,
    PASSWORD,
  } = process.env;

const request = supertest(app);
const expect = chai.expect;
//const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Orders Handler', () => {
    //let token: string;

    before(async () => {
        await userStore.create({
            firstname: FIRSTNAME,
            lastname: LASTNAME,
            email: "order@order_route.com",
            address: ADDRESS,
            username: "order",
            password: PASSWORD,
            isAdmin: false
        });
        await productStore.create({
            name: "Tea",
            description: " 560mg Pu'er tea cakes",
            price: "99.99",
            qty: 10
        });
    });
    describe('Test orders routes', () => {
        it('should create an order', async () => {
            const res = await request
                .post('/order')
                .send({ user_id: "1" })
                .set('Accepted', 'application/json');
            expect(res.status).to.equal(200);
        });
        it('should retrieve orders', async () => {
            const res = await request.get('/orders');
            expect(res.status).to.equal(200);
        });
        it('should update the orders', async () => {
            const res = await request
                .put('/update/order/1')
                .send({ 
                    id: 1, 
                    order_status: 'open', 
                    user_id: '1'
                })
                .set('Accepted', 'application/json');
            expect(res.status).to.equal(200);
        });
        it('should post order with id', async () => {
            const res = await request
                .post('/order/1/products')
                .send({
                    order_id: '1',
                    product_id: '1',
                    quantity: 5
                })
                .set('Accepted', 'application/json');
            expect(res.status).to.equal(200);
        });
        it('should update quantity of product', async () => {
            const res = await request.get('/product/1');
            expect(res.body.qty).to.equal(5)
        });
        it('should delete the order', async () => {
            const res = await request.delete('/order/1');
            expect(res.status).to.equal(200);
        })
    });
})