import { makeAutoObservable } from 'mobx';
import { LOCAL_STORAGE_BASKET } from '../../constants/localStorage';
import { parseToLocalStorage } from '../../utils/parseToLocalStorage';

export class BasketStore {
    store = {
        productsInBasket: [],
    };

    constructor() {
        makeAutoObservable(this);
    }

    init() {
        try {
            const initBasket = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET))

            if(initBasket?.length) {
                this.store.productsInBasket = initBasket
            }
        } catch (e) {
            localStorage.removeItem(LOCAL_STORAGE_BASKET)
            return e
        }
    }

    addProduct(product) {
        this.store.productsInBasket.push(product)
        
        localStorage.setItem(LOCAL_STORAGE_BASKET, parseToLocalStorage(this.store.productsInBasket))
    }

    handleDelete(delId) {
        this.store.productsInBasket = 
            this.store.productsInBasket.filter(({product}) => product.delId !== delId)
        localStorage.setItem(LOCAL_STORAGE_BASKET, parseToLocalStorage(this.store.productsInBasket))
    }


    isInBasket(idProduct, idColor, idSize) {
        return !!this.store.productsInBasket.find((item) =>  
            String(item.product.id) === String(idProduct) &&
            String(item.product.color.id) === String(idColor) &&
            String(item.product.size.id) === String(idSize)
        )
    }
}