import { useState } from "react";
import BlueButton from "../../basic/BlueButton/BlueButton";

function CharacteristicAdder({ formData, setFormData, errors, setErrors }) {

    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [addCharError, setAddCharError] = useState(false);

    const addCharac = () => {
        setFormData(prevState => {
            if (!prevState.characteristics.some(item => item.name === key) && key.trim() && value.trim()) {
                try{
                    setAddCharError(false);
                    return {
                        ...prevState,
                        characteristics: [
                            ...prevState.characteristics,
                            { name: key, value: value }
                        ]
                    };
                } finally {
                    setKey("");
                    setValue("");
                }
            } else {
                setAddCharError(true);
                return prevState;
            }
        });
    };

    const deleteItem = (listName, index) => {
        setFormData(prevState => ({
            ...prevState,
            [listName]: prevState[listName].filter((_, i) => i !== index)
        }));
    };

    const handleKeyChange = (e) => {
        setKey(e.target.value);
        setAddCharError(false);
    }

    const handleValueChange = (e) => {
        setValue(e.target.value);
        setAddCharError(false);
    }

    return (
        <div className="m-3 py-4 separator">
            <span>Características</span>
            <div className="d-flex gap-3 m-2 justify-content-between">
                <input className="flex-fill m-0" type="text" placeholder="Clave" value={key} onChange={handleKeyChange} />
                <input className="flex-fill m-0" type="text" placeholder="Valor" value={value} onChange={handleValueChange} />
                <BlueButton onClick={addCharac} text="Agregar" />
            </div>
            {addCharError && <p className="text-danger text-center">Las características no deben tener campos vacios o estar ya incluidas en el producto</p>}
            <div className="actual-features mt-3 px-2">
                {formData.characteristics.length > 0 ?
                    formData.characteristics.map((feature, index) => (
                        <div key={index} className="d-flex justify-content-between p-2">
                            <span>{feature.name}: {feature.value}</span>
                            <span onClick={() => deleteItem('characteristics', index)} className="delete">Borrar</span>
                        </div>
                    ))
                    :
                    <p className={`text-center p-2 ${errors.characteristics ? 'error-message' : 'text-secondary'}`}>No agregaste ninguna caracteristica</p>
                }
            </div>
        </div>
    );
}
export default CharacteristicAdder;