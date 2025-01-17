import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, STATUS } from '../../../services/AxiosService'; // Asegúrate de importar la función de login
import BlueButton from '../../basic/BlueButton/BlueButton';
import './LoginForm.css';

function LoginForm({productId}) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorFlags, setErrorFlags] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const validForm = () => {
    const newErrors = {
      email: formData.email.trim() === '',
      password: formData.password.trim() === ''
    };

    setErrorFlags(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrorFlags((prevErrors) => ({
      ...prevErrors,
      [name]: false
    }));
  };

  const [loginStatus, setLoginStatus] = useState(STATUS.IDLE);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validForm()) return;
    try {
      setLoginStatus(STATUS.LOADING);
      const response = await login(formData);
      if (response) {
        setLoginStatus(STATUS.SUCCESS);
        setTimeout(() => {
          if (productId) {
            navigate(`/product/${productId}`);
            window.location.reload();
          } else {
            navigate("/");         
            window.location.reload();   
          }
        }, 500);
      } else {
        setLoginStatus(STATUS.ERROR);
      }
    } catch (error) {
      console.log("Error al registrar", error);
    }
  };
  return (
    <div className='login-form-wrapper'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            className={errorFlags.email ? 'input-error' : ''}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Ingrese su mail'
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            className={errorFlags.password ? 'input-error' : ''}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Ingrese su contraseña'
          />
        </div>

        {(errorFlags.email || errorFlags.password) && <p className='error-message'>Hay campos incompletos</p>}
        {loginStatus == STATUS.ERROR && <p className='error-message'>Usuario o contraseña incorrectos</p>}
        {loginStatus == STATUS.SUCCESS && <p className='text-success'>Iniciando Sesion...</p>}

        <BlueButton onClick={handleSubmit} text='Login' />
        <a className='custom-link' href='/register'>Crea tu cuenta</a>
      </form>
    </div>
  );
}

export default LoginForm;
