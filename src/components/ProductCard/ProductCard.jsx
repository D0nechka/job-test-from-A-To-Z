import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

export const ProductCard = (props) => {
    const { name, img, id } = props

    return (
        <div className='product-card'>
            <img src={img} alt='Товар' className='product-card__img' />
            <Link className='product-card__name' to={`/product/${id}`}>{name}</Link>
        </div> 
    )
};