import { Color } from "../Color/Color"
import './style.css'

export const Colors = (props) => {
    const { colors, currentColorId } = props

    return (
        <div className='product-colors'>
            {colors?.map((color) => (
                <Color
                    key={color.id} 
                    name={color.name} 
                    id={color.id}
                    active={color.id === currentColorId}
                />
            ))}
        </div>
    )
};