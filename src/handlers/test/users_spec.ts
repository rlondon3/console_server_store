import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import chai from 'chai';

dotenv.config();
const {
    FIRSTNAME,
    LASTNAME,
    TEST_USER_EMAIL,
    ADDRESS,
    TEST_USER_USERNAME,
    PASSWORD,
    IS_ADMIN
  } = process.env;

const expect = chai.expect;
const request = supertest(app);

describe('User Handler', () => {
    describe('Test user handler endpoint', () => {
        let token: string;
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
        })
    });
})