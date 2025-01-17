import { useState } from 'react';
import './RegisterForm.css'
import showPasswordIcon from '../../../assets/show-password.svg'
import hidePasswordIcon from '../../../assets/hide-password.svg'
import { register, STATUS } from '../../../services/AxiosService.js'
import { useNavigate } from 'react-router-dom';
import BlueButton from '../../basic/BlueButton/BlueButton.jsx';

function RegisterForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: ''
    });
    const [errorsFlags, setErrorsFlags] = useState({
        name: false,
        email: false,
        password: false,
        image: false,
    });

    const validForm = () => {
        const newErrors = {
            name: formData.name === '',
            email: formData.email === '',
            password: formData.password === '',
            image: formData.image === ''
        };

        setErrorsFlags(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setErrorsFlags((prevErrors) => ({
            ...prevErrors,
            [name]: false
        }));
    };

    const [registerStatus, setRegisterStatus] = useState(STATUS.IDLE);
    const [serverError, setServerError] = useState(null);
    const handleSubmit = async (e) => {
        setServerError(null);
        e.preventDefault();
    
        if (!validForm()) return;
    
        try {
            setRegisterStatus(STATUS.LOADING);
            const response = await register(formData);
            if (response === true) {
                setRegisterStatus(STATUS.SUCCESS);
                setTimeout(() => {
                    navigate("/")
                    window.location.reload();
                 }, 500);
            } else {
                setRegisterStatus(STATUS.ERROR);
                setServerError(response);
            }
        } catch (error) {
            setRegisterStatus(STATUS.ERROR);
        }
    };


    return (
        <div className='register-form-wrapper'>
            <form className='register-form' onSubmit={handleSubmit}>
                <h2>Register</h2>

                <div className='input-group'>
                    <label>Nombre</label>
                    <input
                        className={errorsFlags.name ? 'input-error' : ''}
                        name="name"
                        placeholder='Ingrese su nombre'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className='input-group'>
                    <label>Email</label>
                    <input
                        className={errorsFlags.email ? 'input-error' : serverError ? 'input-error' : ''}
                        name="email"
                        placeholder='Ingrese su mail'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>


                <div className='input-group'>
                    <label>Contraseña</label>
                    <div className='password-input'>
                        <input
                            className={errorsFlags.password ? 'input-error' : ''}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder='Ingrese su contraseña'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <img
                            src={showPassword ? hidePasswordIcon : showPasswordIcon}
                            alt="Mostrar contraseña"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>

                <div className='input-group'>
                    <label>Imagen</label>
                    <input
                        className={errorsFlags.image ? 'input-error' : ''}
                        name="image"
                        placeholder='Ingrese una imagen'
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                {(Object.values(errorsFlags).some(Boolean)) && <p className='error-message'>Hay campos incompletos</p>}
                {serverError && <p className='error-message text-capitalize'>{serverError}</p>}
                {registerStatus == STATUS.SUCCESS && <p className='text-success text-capitalize'>Registro éxitoso, redireccionando...</p>}

                <BlueButton onClick={handleSubmit} text="Register" />
                <a className='custom-link' href='/login'>Ya tiene cuenta? ingresá</a>
            </form>


        </div>
    )
};




export default RegisterForm;