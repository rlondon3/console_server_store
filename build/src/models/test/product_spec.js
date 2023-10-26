"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const product_1 = require("../product");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const chai_1 = tslib_1.__importDefault(require("chai"));
dotenv_1.default.config();
const store = new product_1.ProductStore();
const expect = chai_1.default.expect;
describe('Product Model', () => {
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
//# sourceMappingURL=product_spec.js.map