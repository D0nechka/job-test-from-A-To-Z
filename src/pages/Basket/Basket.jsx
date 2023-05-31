import React from 'react'
import { rootStore } from '../../store';
import { ProductBasketCard } from '../../components';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './style.css'

export const Basket = observer(() => {
    const productBasket = rootStore.basketStore.store.productsInBasket

    const handleDelete = (idProduct, idColor, idSize) => {
        rootStore.basketStore.handleDelete(idProduct, idColor, idSize)
    }

    return (
        <div className='basket-products'>
            <Link className='basket-link' to="/">К товарам</Link>
            {productBasket?.map(({product}, index) => (
                <ProductBasketCard 
                    id={product.id}
                    color={product.color.name}
                    size={product.size.label}
                    price={product.price}
                    name={product.name}
                    img={product.image}
                    key={`${product.id}__${index}`}
                    handleDelete={() => handleDelete(product.delId)}
                />
            ))}
        </div>
    )
});