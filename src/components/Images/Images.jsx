import { useContext, useEffect, useState } from "react"
import { Image } from "../Image/Image"
import { ProductContext } from "../../context";
import './style.css'

export const Images = () => {
    const {currentColor} = useContext(ProductContext)

    const [currentImage, setCurrentImage] = useState(currentColor?.images[0])

    const changeImage = (image) => {
        setCurrentImage(image)
    }

    useEffect(() => {
        setCurrentImage(currentColor?.images[0])
    }, [currentColor?.images])

    return (
        <div className="images">
            <img src={currentImage} className="images__current-image" alt="current"/>
            <div className="images__list">
                {currentColor?.images.map((image) => (
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