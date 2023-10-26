import { ProductStore } from "../product";
import dotenv from 'dotenv';
import chai from "chai";

dotenv.config();

const store = new ProductStore();
const expect = chai.expect;

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
})