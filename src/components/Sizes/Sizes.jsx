import { useEffect, useState } from 'react'
import { Size } from '..'
import { rootStore } from '../../store'
import { getSizes } from '../../services/api'
import { observer } from 'mobx-react'
import './style.css'

export const Sizes = observer((props) => {
    const {sizes} = props

    const [staticSizes, setStaticSizes] = useState([])
    const currentSize = rootStore.productStore.store.currentSize

    const changeSize = (size) => {
        rootStore.productStore.changeCurrentSize(size)
    }

    useEffect(() => {
        (async () => {
            const sizes = await getSizes()
            setStaticSizes(sizes)
        })()
    }, [])

    return (
        <div className='sizes'>
            {staticSizes.map((size) => (
                <Size 
                    key={size.id} 
                    id={size.id}
                    size={size.label} 
                    disabled={size.id in sizes} 
                    changeSize={changeSize} 
                    active={currentSize === size.id} 
                />
            ))}
        </div>
    )
});