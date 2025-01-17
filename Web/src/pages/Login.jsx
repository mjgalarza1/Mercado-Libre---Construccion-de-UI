import LoginForm from "../components/forms/LoginForm/LoginForm";
import { useLocation, Navigate} from "react-router-dom";


function Login() {
    let location = useLocation();
    return (
        <>
        {localStorage.getItem('authorization') ? 
            <Navigate to="/error"/>
            :
            <LoginForm productId={location.state?.id} />
        }
        
        </>
    );
}

export default Login;