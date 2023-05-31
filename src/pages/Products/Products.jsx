import React, { useEffect, useState } from 'react'
import { ProductCard } from '../../components';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/api';
import './style.css'

export const Products = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getProducts()
            .then((data) => setProducts(data))
            .finally(() => setIsLoading(false))
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
};