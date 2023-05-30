import { Basket, Product, Products } from "../pages";

export const routes = [{
    path: '/',
    Element: Products
}, {
    path: '/basket',
    Element: Basket
}, {
    path: '/product/:id',
    Element: Product
}]