import './style.css'

export const Size = (props) => {
    const {disabled, size, changeSize, active, id} = props

    const handleChangeSize = () => {
        changeSize(id)
    }

    return (
        <button
            className={active ? 'size-active' : 'size'}
            onClick={handleChangeSize}
            disabled={disabled}
        >{size}</button>
    )
};