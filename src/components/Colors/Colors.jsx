import { useContext } from "react";
import { Color } from "../Color/Color"
import { ProductContext } from "../../context";
import './style.css'

export const Colors = () => {
    const {currentColor, currentProduct, handleChangeColor} = useContext(ProductContext)

    return (
        <div className='product-colors'>
            {currentProduct?.colors?.map((color) => (
                <Color
                    key={color.id} 
                    name={color.name} 
                    id={color.id}
                    active={color.id === currentColor?.id}
                    handleChangeColor={handleChangeColor}
                />
            ))}
        </div>
    )
};