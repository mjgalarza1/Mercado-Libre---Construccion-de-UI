import { useEffect, useState } from "react";
import { getCategories, STATUS } from "../services/AxiosService";
import { Navigate } from "react-router-dom";

import LoadingSwitch from "../components/basic/LoadingSwitch/LoadingSwitch";

import NewProductForm from "../components/forms/ProductForm/NewProductForm/NewProductForm";

function NewProduct() {
    const [categories, setCategories] = useState([]);
    const [categoriesStatus, setCategoriesStatus] = useState(STATUS.LOADING);

    useEffect(() => {
        getCategories(setCategories, setCategoriesStatus);
    }, []);

    return (
        <>
        {localStorage.getItem('authorization') ? 
            <LoadingSwitch status={categoriesStatus}>
                <NewProductForm categories={categories}/>
            </LoadingSwitch>
            :
            <Navigate to="/error"/>
            
        }
        </>
    )
}

export default NewProduct;