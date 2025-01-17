import "../ProductForm.css";
import BlueButton from "../../../basic/BlueButton/BlueButton";
import { useState } from "react";
import { STATUS, updateProduct } from "../../../../services/AxiosService";
import { useNavigate } from "react-router-dom";
import BasicInfoForm from "../BasicInfoForm";
import ImageUploader from "../ImageUploader";
import CharacteristicAdder from "../CharacteristicAdder";

function EditProductForm({ product, categories }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        shipping: product.shipping,
        categoryId: product.category.id,
        images: product.images,
        characteristics: product.characteristic,
    });

    const [errors, setErrors] = useState({
        title: false,
        description: false,
        price: false,
        stock: false,
        shipping: false,
        categoryId: false,
        images: false,
        characteristics: false,
    });

    const validateFormData = (formData) => {
        const newErrors = {
            title: !formData.title.trim(),
            description: !formData.description.trim(),
            price: formData.price == "" || formData.price <= 0,
            stock: formData.stock == "" || formData.stock <= 0,
            shipping: formData.shipping.price === "" || formData.shipping.price < 0,
            categoryId: !formData.categoryId.trim(),
            images: formData.images.length < 1,
            characteristics: formData.characteristics.length < 1,
        };
        setErrors(newErrors);        
        return !Object.values(newErrors).some(error => error);
    };

    const [putStatus, setPutStatus] = useState(STATUS.IDLE);
    const submitfnc = () => {        
        try{
            if (validateFormData(formData)) {
                updateProduct(product.id, formData, setPutStatus);
                setTimeout(() => {
                    navigate(`/product/${product.id}`);
                    navigate(0);
                }, 500);
            }
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            setPutStatus(STATUS.ERROR);
        }
    };

    return (
        <div className="edit-form-wrapper mx-auto m-2 rounded">
            <h2 className="text-center pt-4 mb-0">Editar</h2>

            <BasicInfoForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} categories={categories} />
            <ImageUploader formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            <CharacteristicAdder formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />

            <div className="d-flex flex-row-reverse align-items-center gap-3 m-3 separator p-3">
                <BlueButton onClick={submitfnc} text="Guardar Cambios" />
                {putStatus === STATUS.ERROR ? <span className="text-danger error-message">Hubo un error al guardar los cambios</span> : null}
                {putStatus === STATUS.SUCCESS ? <span className="text-success">Cambios guardados satisfactoriamente</span> : null}
            </div>
        </div>
    );
}

export default EditProductForm;