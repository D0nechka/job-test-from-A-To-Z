import { useEffect, useState } from "react"
import { Image } from "../Image/Image"
import './style.css'

export const Images = (props) => {
    const {images} = props

    const [currentImage, setCurrentImage] = useState(images[0])

    const changeImage = (image) => {
        setCurrentImage(image)
    }

    useEffect(() => {
        setCurrentImage(images[0])
    }, [images])

    return (
        <div className="images">
            <img src={currentImage} className="images__current-image" alt="current"/>
            <div className="images__list">
                {images.map((image) => (
                    <Image
                        key={image}
                        img={image}
                        active={image === currentImage}
                        changeImage={changeImage}
                    />
                ))}
            </div>
        </div>
    )
};