"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const server_1 = tslib_1.__importDefault(require("../../server"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const chai_1 = tslib_1.__importDefault(require("chai"));
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
dotenv_1.default.config();
require('dotenv').config();
const { FIRSTNAME, LASTNAME, ADDRESS, PASSWORD, } = process.env;
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore;
const expect = chai_1.default.expect;
const request = (0, supertest_1.default)(server_1.default);
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
        let token;
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
            expect(res.body.name).to.equal("Test Product (updated)");
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
    });
});
//# sourceMappingURL=products_spec.js.map