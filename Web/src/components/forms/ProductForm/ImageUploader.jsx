import { useState } from "react";
import BlueButton from "../../basic/BlueButton/BlueButton";

function ImageUploader({ formData, setFormData, errors, setErrors }) {
    const [imageLink, setImageLink] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) =>{
        setErrorMessage("");
        setImageLink(e.target.value);
    }

    const addImage = () => {
        if (!imageLink) {
            setErrorMessage("El enlace de la imagen no puede estar vacío.");
            return;
        }

        if (formData.images.some(c => c === imageLink)) {
            setErrorMessage("Esta imagen ya ha sido agregada.");
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, imageLink],
        }));
        setImageLink("");
        setErrorMessage("");
    };

    const deleteItem = (listName, index) => {
        setErrorMessage("")
        setFormData(prevState => ({
            ...prevState,
            [listName]: prevState[listName].filter((_, i) => i !== index)
        }));
    };
    
return (
    <div className="m-3 py-4 separator">
        <span>Imágenes</span>
        <div className="d-flex gap-3 justify-content-between m-2">
            <input className="flex-fill m-0"
                type="text"
                value={imageLink}
                placeholder="Introduzca el link de la imagen"
                onChange={handleChange}
            />
            <BlueButton onClick={addImage} text="Agregar Imagen" />
        </div>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>} {/* Mensaje de error */}
        <div className="actual-images mt-3 px-2">
            {
                formData.images.length > 0 ?
                    formData.images.map((image, index) => (
                        <div key={index} className="d-flex justify-content-between p-2">
                            <span>{image}</span>
                            <span onClick={() => deleteItem('images', index)} className="delete">Borrar</span>
                        </div>
                    ))
                    : <p className={`text-center p-2 ${errors.images ? 'error-message' : 'text-secondary'}`}>No agregaste ninguna imagen</p>
            }
        </div>
    </div>
);
}

export default ImageUploader;

