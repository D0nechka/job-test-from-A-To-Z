import './style.css'

export const Color = (props) => {
    const {name, id, active, handleChangeColor} = props

    return (
        <button 
            onClick={() => handleChangeColor(id)} 
            disabled={active} 
            className="color"
        >
            {name}
        </button>
    )
};