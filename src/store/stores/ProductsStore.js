import { makeAutoObservable, action } from 'mobx';
import { getProducts } from '../../services/api';

export class ProductsStore {
    store = {
        products: [],
        error: '',
        isLoadig: false
    };

    constructor() {
        makeAutoObservable(this);
    }

    fetchProducts() {
        this.store.isLoadig = true
        this.store.error = ''
        getProducts().then(action('fetchSuccess', (products) => {
            this.store.products = products
            this.store.isLoadig = false
        }), action('fetchError', () => {
            this.store.error = 'Ошибка получения данных о товарах'
            this.store.isLoadig = false
        }))
    }
}