import Pagination from "../components/layout/Pagination/Pagination";
import ProductGrid from "../components/layout/ProductsGrid/ProductsGrid";
import { useEffect, useState } from "react";
import { getProducts, STATUS } from "../services/AxiosService";
import LoadingSwitch from "../components/basic/LoadingSwitch/LoadingSwitch";

function Home() {

    const [productsPage, setProductsPage] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [fetchStatus, setFetchStatus] = useState(STATUS.LOADING);

    useEffect(() => {
        getProducts(setProductsPage, setFetchStatus, pageNumber);
    }, [pageNumber]);

    return (
        <LoadingSwitch status={fetchStatus}>
            <ProductGrid products={productsPage.products}/>
            <Pagination page={pageNumber} setPage={setPageNumber} pagesTotal={productsPage.amountOfPages} />
        </LoadingSwitch>
    );
}

export default Home;