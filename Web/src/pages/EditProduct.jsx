import { useEffect, useState } from "react";
import { getCategories, getProduct, getUserDetails, STATUS, updateProduct } from "../services/AxiosService";

import { useParams, Navigate } from 'react-router-dom';
import EditProductForm from "../components/forms/ProductForm/EditProductForm/EditProductForm";
import LoadingSwitch from "../components/basic/LoadingSwitch/LoadingSwitch";
import ErrorComponent from "../components/basic/NotFound/NotFound";

function EditProduct() {
    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [productStatus, setProductsStatus] = useState(STATUS.LOADING);
    const [user, setUser] = useState({});
    const [categoriesStatus, setCategoriesStatus] = useState(STATUS.LOADING);
    const [userStatus, setUserStatus] = useState(STATUS.LOADING);

    useEffect(() => {
        getProduct(id, setProduct, setProductsStatus);
        getCategories(setCategories, setCategoriesStatus);
        getUserDetails(setUser, setUserStatus)
    }, []);

    

    return (
        <>
        {localStorage.getItem('authorization') ? 
                <LoadingSwitch status={productStatus}>
                {user?.id === product?.owner?.id ?
                    <EditProductForm title="Editar" product={product} categories={categories}/>
                    :
                    <ErrorComponent/>
                }
               </LoadingSwitch>
            :
            <Navigate to="/error"/>
            
        }
        </>

    );
}

export default EditProduct;