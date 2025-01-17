import { useEffect, useState } from 'react';
import LargeBlueButton from '../../basic/LargeBlueButton/LargeBlueButton.jsx';
import { purchaseCart, STATUS } from '../../../services/AxiosService.js';
import { useNavigate } from 'react-router-dom';


function PurchaseForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        cardNumber: "",
        cvv: "",
        expirationDate: "",
    });

    const [errors, setErrors] = useState({
        name: false,
        cardNumber: false,
        cvv: false,
        expirationDate: false,
    });

    const [purchaseStatus, setPurchaseStatus] = useState(STATUS.IDLE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (formData) => {
        const newErrors = {
            name: !formData.name.trim(),
            cardNumber: formData.cardNumber === "" || isNaN(formData.cardNumber) || formData.cardNumber < 0,
            cvv: formData.cvv === "" || isNaN(formData.cvv) || formData.cvv < 0,
            expirationDate: !formData.expirationDate,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const purchasefnc = async () => {
        if (!validateForm(formData)) return;
        const formattedExpirationDate = formData.expirationDate.replace('-', '/');
        const formDataWithFormattedDate = {
                ...formData,
                expirationDate: formattedExpirationDate
            };
        purchaseCart(formDataWithFormattedDate, setPurchaseStatus);
    }

    useEffect(() => {
        if(purchaseStatus === STATUS.SUCCESS){
            setTimeout(() => {
                navigate('/')
            }, 500)
        }
    },[purchaseStatus])

    return (
        <div className="bg-body rounded fadein">
            <div className="d-flex flex-column">
                <h3 className='py-3 mx-3 border-bottom'>Elegí cómo pagar</h3>
                <form>
                    <label className="d-flex px-3 flex-column">
                        Nombre
                        <input
                            onChange={handleChange}
                            type="text"
                            name="name"
                            placeholder='Ingrese su nombre'
                            value={formData.name}
                            className={errors.name ? "input-error" : ""}
                        />
                        {errors.name && <span className="error-message">El nombre no puede estar vacío</span>}
                    </label>
                    <label className="d-flex px-3 flex-column">
                        Número de tarjeta
                        <input
                            onChange={handleChange}
                            type="number"
                            name="cardNumber"
                            placeholder="Ingrese su número de tarjeta"
                            min="0"
                            value={formData.cardNumber}
                            className={errors.cardNumber ? "input-error" : ""}
                        />
                        {errors.cardNumber && <span className="error-message">El número de tarjeta no puede estar vacío ni ser negativo</span>}
                    </label>
                    <label className="d-flex px-3 flex-column">
                        CVV
                        <input
                            onChange={handleChange}
                            type="number"
                            min="0"
                            name="cvv"
                            placeholder='Ingrese su CVV'
                            value={formData.cvv}
                            className={errors.cvv ? "input-error" : ""}
                        />
                        {errors.cvv && <span className="error-message">El CVV no puede estar vacío ni ser negativo</span>}
                    </label>
                    <label className="d-flex px-3 flex-column">
                        Fecha de vencimiento
                        <input
                            onChange={handleChange}
                            type="month"
                            min={new Date().toLocaleDateString('fr-ca', {year: 'numeric',month: '2-digit'})}
                            name="expirationDate"
                            placeholder='Ingrese su fecha de vencimiento'
                            value={formData.expirationDate}
                            className={errors.expirationDate ? "input-error" : ""}
                        />
                        {errors.expirationDate && <span className="error-message">La fecha de vencimiento no es válida</span>}
                    </label>
                    <div className='py-3 px-3'>
                        <LargeBlueButton onClick={purchasefnc} text="Comprar" />
                        {purchaseStatus == STATUS.SUCCESS && <p className="my-1 text-success text-center">La compra se realizó con éxito</p>}
                        {purchaseStatus == STATUS.ERROR && <p className="my-1 error-message text-center">Hubo un error en la compra</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PurchaseForm;