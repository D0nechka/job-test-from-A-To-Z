import { makeAutoObservable } from 'mobx';

export class BasketStore {
    store = {
        productsInBasket: [],
    };

    constructor() {
        makeAutoObservable(this);
    }

    addProduct(product) {
        this.store.productsInBasket.push(product)
    }

    handleDelete(index) {
        this.store.productsInBasket.splice(index, 1)
    }

    isInBasket(idProduct, idColor, idSize) {
        return !!this.store.productsInBasket.find((item) =>  
            String(item.product.id) === String(idProduct) &&
            String(item.color.id) === String(idColor) &&
            String(item.size.id) === String(idSize)
        )
    }
}