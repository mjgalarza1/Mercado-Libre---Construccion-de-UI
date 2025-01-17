import Pagination from "../components/layout/Pagination/Pagination";
import ProductGrid from "../components/layout/ProductsGrid/ProductsGrid";
import { useEffect, useState } from "react";
import { getUserById, getUserDetails, getUserProducts, STATUS } from "../services/AxiosService";
import LoadingSwitch from "../components/basic/LoadingSwitch/LoadingSwitch";
import { useParams } from 'react-router-dom';

function UserId() {
    const { id } = useParams();

    const [productsPage, setProductsPage] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [fetchStatus, setFetchStatus] = useState(STATUS.LOADING);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserById(id, setUser, setFetchStatus);
        getUserProducts(id, setProductsPage, setFetchStatus, pageNumber);
    }, [pageNumber]);

    return (
        <LoadingSwitch status={fetchStatus}>
            <div className="mx-auto d-flex align-items-center m-3" style={{maxWidth:"1000px", maxHeight:"64px"}}>
                <img src={user.image}alt="profile image" style={{maxHeight:"60px"}}/>
                <h3 className="px-3">{user.name}</h3>
            </div>
            <ProductGrid products={productsPage.products}/>
            <Pagination page={pageNumber} setPage={setPageNumber} pagesTotal={productsPage.amountOfPages} />
        </LoadingSwitch>
    );
}

export default UserId;