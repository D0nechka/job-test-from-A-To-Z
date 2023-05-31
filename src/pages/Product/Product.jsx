import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Images, Colors, Sizes } from '../../components';
import { rootStore } from '../../store';
import { getProduct, getProductColor, getSize } from '../../services/api';
import { ProductContext } from '../../context';
import './style.css'

export const Product = observer(() => {
    const params = useParams()

    const [currentProduct, setCurrentProducts] = useState(null)
    const [currentSize, setCurrentSize] = useState(null)
    const [currentColor, setCurrentColor] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const productBasket = rootStore.basketStore.store.productsInBasket
    const isInBasket = 
        rootStore.basketStore.isInBasket(currentProduct?.id,  currentColor?.id, currentSize?.id)

    const handleAdd = () => {
        rootStore.basketStore.addProduct({
            product: {
                name: currentProduct?.name,
                price: currentColor?.price,
                color: {
                    name: currentColor?.name,
                    id: currentColor?.id
                },
                size: {
                    label: currentSize?.label,
                    id: currentSize?.id
                },
                image: currentColor?.images[0],
                id: currentProduct?.id,
                delId: Math.random().toString()
            }
        })
    }

    const handleChangeSize = (size) => {
        setError('')

        getSize(size)
            .then((size) => setCurrentSize(size))
            .catch((e) => setError(e?.message))
    }

    const handleChangeColor = (colorId) => {
        setError('')

        getProductColor(currentProduct?.id, colorId)
            .then((color) => {
                setCurrentColor(color)
                setCurrentSize(null)
            })
            .catch((e) => setError(e?.message))
    }

    useEffect(() => {
        if(params?.id) {
            setIsLoading(true)
            getProduct(params.id)
                .then((data) => {
                    setCurrentProducts(data)
                    setCurrentColor(data.colors[0])
                })
                .finally(() => setIsLoading(false))
        } 
    }, [params.id])

    if(isLoading) {
        return <div className='product-loader'>Loading...</div>
    }

    if(!currentProduct && !isLoading) {
        return <span style={{color: 'red'}}>Товар не найден</span>
    }

    const valueContext = {
        currentSize,
        handleChangeSize,
        currentColor,
        currentProduct,
        handleChangeColor
    }

    const isDisabled = 
        !currentColor?.id 
        || !currentSize 
        || !currentProduct?.id

    return (
        <ProductContext.Provider value={valueContext}>
            <div className='product'>
                <div className='product-links'>
                    <Link className='product-link' to="/">На главную</Link>
                    <Link className='product-link' to="/basket">В корзину (сейчас у вас {productBasket.length} товаров)</Link>
                </div>
                <span className='product-name'>{currentProduct?.name}</span>
                <div className='product-content'>
                    {currentColor && (
                        <>
                            <Images />
                            <div className='product-info'>
                                <span className='product-desc'>{currentColor.description}</span>
                                <span className='product-price'>{currentColor.price} Рублей</span>
                                <Sizes />
                            </div>
                        </>
                    )}
                    <Colors />
                </div>
                <button 
                    className='product-add' 
                    onClick={handleAdd} 
                    disabled={isInBasket || isDisabled}
                >Добавить {isInBasket && '(В корзине)'}</button>
                {!!error.length && (<span style={{color: 'red'}}>{error}</span>)}
            </div>
        </ProductContext.Provider>
    )
});