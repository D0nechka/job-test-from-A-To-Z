import './style.css'

export const Image = (props) => {
    const {img, changeImage, active} = props

    const handleChangeImage = () => {
        changeImage(img)
    }

    return (
        <button disabled={active} onClick={handleChangeImage} className='button-image'>
            <img src={img} className='image' alt='item' />
        </button>
    )
};