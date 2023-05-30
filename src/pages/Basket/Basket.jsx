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
            {productBasket.map(({product, size, color}, index) => (
                <ProductBasketCard 
                    id={product.id}
                    color={color.name}
                    size={size.label}
                    price={color.price}
                    name={product.name}
                    img={color.images[0]}
                    key={product.id}
                    handleDelete={() => handleDelete(index)}
                />
            ))}
        </div>
    )
});