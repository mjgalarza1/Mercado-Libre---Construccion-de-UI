import BlueButton from "../../../basic/BlueButton/BlueButton";
import { useState } from "react";
import { createProduct, STATUS } from "../../../../services/AxiosService";
import { useNavigate } from "react-router-dom";
import BasicInfoForm from "../BasicInfoForm";
import ImageUploader from "../ImageUploader";
import CharacteristicAdder from "../CharacteristicAdder";
import '../ProductForm.css'

function NewProductForm({ product, categories }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        shipping: { price: "" },
        categoryId: "",
        images: [],
        characteristics: [],
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
            price: formData.price == "" || formData.price < 0,
            stock: formData.stock == "" || formData.stock < 0,
            shipping: formData.shipping.price < 0,
            categoryId: !formData.categoryId.trim(),
            images: formData.images.length < 1,
            characteristics: formData.characteristics.length < 1,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const [postStatus, setPostStatus] = useState(STATUS.IDLE);
    const submitfnc = async (e) => {
        e.preventDefault();
        if (!validateFormData(formData)) return;
        try {
            const createdProduct = await createProduct(formData, setPostStatus);
            setTimeout(() => {
                navigate(`/product/${createdProduct.id}`)
            }, 500);
            } catch (error) {
                console.error("Error al crear producto:", error);
            }
    };

    return (
        <div className="edit-form-wrapper mx-auto m-2 rounded">
            <h2 className="text-center pt-4 mb-0">Nuevo producto</h2>

            <BasicInfoForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} categories={categories} />
            <ImageUploader formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            <CharacteristicAdder formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />

            <div className="d-flex flex-row-reverse align-items-center gap-3 m-3 separator p-3">
                <BlueButton onClick={submitfnc} text="Guardar Cambios" />
                {postStatus === STATUS.ERROR ? <span className="text-danger error-message">Hubo un error al crear el producto</span> : null}
                {postStatus === STATUS.SUCCESS ? <span className="text-success">Producto creado satisfactoriamente</span> : null}
            </div>
        </div>
    );
}

export default NewProductForm;