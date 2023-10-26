"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const server_1 = tslib_1.__importDefault(require("../../server"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const chai_1 = tslib_1.__importDefault(require("chai"));
dotenv_1.default.config();
const { FIRSTNAME, LASTNAME, TEST_USER_EMAIL, ADDRESS, TEST_USER_USERNAME, PASSWORD, IS_ADMIN } = process.env;
const expect = chai_1.default.expect;
const request = (0, supertest_1.default)(server_1.default);
describe('User Handler', () => {
    describe('Test user handler endpoint', () => {
        let token;
        it('should create a user', async () => {
            const res = await request
                .post('/create/user')
                .send({
                firstname: FIRSTNAME,
                lastname: LASTNAME,
                email: TEST_USER_EMAIL,
                address: ADDRESS,
                username: TEST_USER_USERNAME,
                password: PASSWORD,
                isAdmin: IS_ADMIN
            }).set('Accepted', 'application/json');
            token = 'Bearer ' + res.body;
            expect(res.status).to.equal(200);
        });
        it('should verify Users with Authentication Token', async () => {
            const res = await request
                .post('/verify/users')
                .set('Authorization', token);
            expect(res.status).to.equal(200);
        });
        it('should verify user with authentication token and get user by id', async () => {
            const res = await request
                .post('/verify/user/1')
                .set('Authorization', token);
            expect(res.status).to.equal(200);
        });
        it('should update the user', async () => {
            const res = await request
                .put('/user/3')
                .set('Authorization', token)
                .send({
                firstname: FIRSTNAME,
                lastname: LASTNAME,
                email: "test@test.com",
                address: ADDRESS,
                username: TEST_USER_USERNAME,
                password: PASSWORD,
                isAdmin: IS_ADMIN
            })
                .set('Accepted', 'application/json');
            expect(res.status).to.equal(200);
        });
        it('should fail with incorrect login(authentication)', async () => {
            const res = await request
                .post('/user/authenticate')
                .send({
                username: "testUser",
                password: PASSWORD,
            })
                .set('Accepted', 'application/json');
            expect(res.status).to.equal(400);
        });
        it('should delete the user', async () => {
            const res = await request
                .delete('/user/3')
                .set('Authorization', token)
                .set('Accepted', 'application/json');
            expect(res.status).to.equal(200);
        });
    });
});
//# sourceMappingURL=users_spec.js.map