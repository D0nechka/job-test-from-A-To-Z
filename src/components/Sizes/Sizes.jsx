import { useContext, useEffect, useState } from 'react'
import { Size } from '..'
import { getSizes } from '../../services/api'
import { ProductContext } from '../../context'
import './style.css'

export const Sizes = () => {
    const {currentSize, handleChangeSize, currentColor} = useContext(ProductContext)

    const [staticSizes, setStaticSizes] = useState([])

    useEffect(() => {
        getSizes()
            .then((data) => setStaticSizes(data))
    }, [])

    return (
        <div className='sizes'>
            {staticSizes.map((size) => (
                <Size 
                    key={size.id} 
                    id={size.id}
                    size={size.label} 
                    disabled={size.id in currentColor?.sizes} 
                    changeSize={handleChangeSize} 
                    active={currentSize?.id === size.id} 
                />
            ))}
        </div>
    )
};