import { ProductsStore, BasketStore, ProductStore } from './stores';

export const rootStore = {
    basketStore: new BasketStore(),
    productsStore: new ProductsStore(),
    productStore: new ProductStore(),
};