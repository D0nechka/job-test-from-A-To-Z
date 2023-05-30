import { rootStore } from "../../store"
import './style.css'

export const Color = (props) => {
    const {name, id, active} = props

    const changeColor = () => {
        rootStore.productStore.changeCurrentColor(id)
        rootStore.productStore.changeCurrentSize(null)
    }

    return (
        <button 
            onClick={changeColor} 
            disabled={active} 
            className="color"
        >
            {name}
        </button>
    )
};