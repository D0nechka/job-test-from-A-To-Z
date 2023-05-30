import { makeAutoObservable, action } from 'mobx';
import { getProduct } from '../../services/api';

export class ProductStore {
    store = {
        product: null,
        error: '',
        isLoadig: false,
        currentColor: null,
        currentSize: null
    };

    constructor() {
        makeAutoObservable(this);
    }

    changeCurrentColor(id) {
        if(this.store.product) {
            const newColor = this.store.product.colors.find((c) => c.id === id)

            if(newColor) {
                this.store.currentColor = newColor
            }
        }
    }

    changeCurrentSize(size) {
        this.store.currentSize = size
    }

    fetchProduct(id) {
        this.store.isLoadig = true
        this.store.error = ''
        getProduct(id).then(action('fetchSuccess', (product) => {
            this.store.product = product
            this.store.currentColor = product?.colors[0]
            this.store.isLoadig = false
        }), action('fetchError', () => {
            this.store.error = 'Ошибка получения данных о товаре'
            this.store.isLoadig = false
        }))
    }
}