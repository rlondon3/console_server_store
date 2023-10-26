"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const server_1 = tslib_1.__importDefault(require("../../server"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const chai_1 = tslib_1.__importDefault(require("chai"));
const user_1 = require("../../models/user");
//import { OrderStore } from '../../models/order';
const product_1 = require("../../models/product");
dotenv_1.default.config();
require('dotenv').config();
const { FIRSTNAME, LASTNAME, TEST_USER_EMAIL, ADDRESS, TEST_USER_USERNAME, PASSWORD, } = process.env;
const request = (0, supertest_1.default)(server_1.default);
const expect = chai_1.default.expect;
//const store = new OrderStore();
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
describe('Orders Handler', () => {
    //let token: string;
    before(async () => {
        await userStore.create({
            firstname: FIRSTNAME,
            lastname: LASTNAME,
            email: TEST_USER_EMAIL,
            address: ADDRESS,
            username: TEST_USER_USERNAME,
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
                .post('/orders')
                .send({ user_id: '1' })
                .set('ACcepted', 'application/json');
            expect(res).to.equal({
                id: 1,
                order_status: 'active',
                user_id: '1'
            });
        });
    });
});
//# sourceMappingURL=orders_spect.js.map