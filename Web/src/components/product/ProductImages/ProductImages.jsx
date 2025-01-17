import './ProductImages.css';
import { useState } from 'react';

function ProductImages({images}) {
    const [currentImage, setCurrentImage] = useState(images?.[0]);

    return (
        <div className="col bg-body rounded px-3 py-4 d-flex" style={{maxHeight:"440px"}}>
            <div className="p-1 d-flex flex-column gap-2 overflow-y-auto overflow-x-hidden">
            {
                images?.map((image, index) => (
                    <img src={image} 
                        className="thumbnail"
                        alt="product image" key={index} 
                        onMouseOver={() => {setCurrentImage(image);}}
                    />
                ))
            }
            </div>
            <img src={currentImage} className="current-image mx-auto"/>
        </div>
    );
}

export default ProductImages;