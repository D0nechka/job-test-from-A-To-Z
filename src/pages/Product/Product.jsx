import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Images, Colors, Sizes } from '../../components';
import { rootStore } from '../../store';
import { getProductColor, getSize } from '../../services/api';
import './style.css'

export const Product = observer(() => {
    const params = useParams()

    const [isDisabled, setIsDisabled] = useState(false)

    const product = rootStore.productStore.store.product
    const currentColor = rootStore.productStore.store.currentColor
    const currentSize = rootStore.productStore.store.currentSize
    const isLoading = rootStore.productStore.store.isLoadig
    const productBasket = rootStore.basketStore.store.productsInBasket
    const isInBasket = rootStore.basketStore.isInBasket(params.id, currentColor?.id, currentSize)


    const handleAdd = async () => {
        try {
            setIsDisabled(true)

            const gettingColor = await getProductColor(product?.id, currentColor?.id)
            const gettingSize = await getSize(currentSize)

            rootStore.basketStore.addProduct({
                product,
                size: gettingSize,
                color: gettingColor,
            })
        } catch (e) {
            console.log(e)
        } finally {
            setIsDisabled(false)
        }
    }

    useEffect(() => {
        if(params?.id) {
            rootStore.productStore.fetchProduct(params.id)
        } 
    }, [params.id])

    if(isLoading) {
        return <div className='product-loader'>Loading...</div>
    }

    return (
        <div className='product'>
            <div className='product-links'>
                <Link className='product-link' to="/">На главную</Link>
                <Link className='product-link' to="/basket">В корзину (сейчас у вас {productBasket.length} товаров)</Link>
            </div>
            <span className='product-name'>{product?.name}</span>
            <div className='product-content'>
                {currentColor && (
                    <>
                        <Images images={currentColor?.images} />
                        <div className='product-info'>
                            <span className='product-desc'>{currentColor.description}</span>
                            <span className='product-price'>{currentColor.price} Рублей</span>
                            <Sizes sizes={currentColor.sizes} />
                        </div>
                    </>
                )}
                <Colors colors={product?.colors} currentColorId={currentColor?.id} />
            </div>
            <button 
                className='product-add' 
                onClick={handleAdd} 
                disabled={isDisabled || isInBasket}
            >Добавить {isInBasket && '(В корзине)'}</button>
        </div>
    )
});