import React, { useEffect } from 'react'
import { rootStore } from '../../store'
import { observer } from 'mobx-react';
import { ProductCard } from '../../components';
import { Link } from 'react-router-dom';
import './style.css'

export const Products = observer(() => {
    const products = rootStore.productsStore.store.products
    const isLoading = rootStore.productsStore.store.isLoadig

    useEffect(() => {
        rootStore.productsStore.fetchProducts()
    }, [])

    if(isLoading) {
        return <div className='products-loader'>Loading...</div>
    }

    return (
        <div className='products'>
            <Link to="/basket" className='products-link'>В корзину</Link>
            {products.map((product) => (
                <ProductCard 
                    key={product.id}
                    name={product.name}
                    img={product?.colors[0]?.images[0]}
                    id={product.id}
                />
            ))}
        </div>
    )
});