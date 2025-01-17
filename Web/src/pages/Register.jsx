import RegisterForm from "../components/forms/RegisterForm/RegisterForm";
import { Navigate } from "react-router-dom";

function Register() {

    return (
        <>
        {localStorage.getItem('authorization') ? 
            <Navigate to="/error"/>
            :
            <RegisterForm/>
        }
        </>
    )
}

export default Register;