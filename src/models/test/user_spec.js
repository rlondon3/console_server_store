const { UserStore } = require("../user");
//import supertest from 'supertest';
//import app from '../../server';
const dotenv = require('dotenv');
const chai = require('chai');


dotenv.config();
const expect = chai.expect;
//const request = supertest(app);
const store = new UserStore();

describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).to.exist;
    });
    it('should have a show method', () => {
        expect(store.show).to.exist;
    });
    it('should have a create method', () => {
        expect(store.create).to.exist;
    });
    it('should have a update method', () => {
        expect(store.update).to.exist;
    });
    it('should have a delete method', () => {
        expect(store.update).to.exist;
    });
    it('should have a authentication method', () => {
        expect(store.authenticate).to.exist;
    });

})