import { createContext, useContext, useEffect, useState } from 'react';
import { authLogin, getUser, likeProduct, userRegister } from '../services/axiosService';
import { clearToken } from '../services/tokenService';

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setError(null);
        try{
            const user = await authLogin(email, password);
            setUser(user);
        } catch (err) {
            setError(err.response.data.title);
        }
    }

    const register = async (form) => {
        setError(null);
        try{
            const user = await userRegister(form);
            setUser(user);
        } catch (err) {
            setError(err.response.data.title);
        }
    }

    const logout = () => {
        setUser(null); 
        clearToken();
    };

    const like = async (productId) => {
        try {
            const user = await likeProduct(productId);
            setUser(user);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        update();
    }, []);

    const update = async () => {
        getUser().then((user) => setUser(user));
    }

    return (
        <UserContext.Provider value={{ user, login, register, logout, like, update, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);