import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

export const ProductBasketCard = (props) => {
    const { name, img, color, id, size, price, handleDelete } = props

    return (
        <div className='product-card'>
            <img src={img} alt='Товар' className='product-card__img' />
            <Link className='product-card__name' to={`/product/${id}`}>{name}</Link>
            <span>Цвет: {color}</span>
            <span>Размер: {size}</span>
            <span>Цена: {price}</span>
            <button className='product-card-delete' onClick={handleDelete}>Удалить</button>
        </div> 
    )
};