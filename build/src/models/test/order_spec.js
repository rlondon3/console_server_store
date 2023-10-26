"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const order_1 = require("../order");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const chai_1 = tslib_1.__importDefault(require("chai"));
dotenv_1.default.config();
const store = new order_1.OrderStore();
const expect = chai_1.default.expect;
describe('Order Model', () => {
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
});
//# sourceMappingURL=order_spec.js.map