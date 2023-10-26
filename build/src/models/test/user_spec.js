"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_1 = require("../user");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const chai_1 = tslib_1.__importDefault(require("chai"));
dotenv_1.default.config();
const expect = chai_1.default.expect;
const store = new user_1.UserStore();
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
        expect(store.delete).to.exist;
    });
    it('should have a authentication method', () => {
        expect(store.authenticate).to.exist;
    });
});
//# sourceMappingURL=user_spec.js.map