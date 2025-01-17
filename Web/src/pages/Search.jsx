import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/layout/ProductsGrid/ProductsGrid";
import Pagination from "../components/layout/Pagination/Pagination";
import LoadingSwitch from "../components/basic/LoadingSwitch/LoadingSwitch";
import { searchProducts, STATUS } from "../services/AxiosService";

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [productsPage, setProductsPage] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [fetchStatus, setFetchStatus] = useState(STATUS.LOADING);

    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            searchProducts(query, setProductsPage, setFetchStatus, pageNumber);
        }
    }, [searchParams, pageNumber]);

    const noResults = productsPage.products?.length === 0 && fetchStatus === STATUS.SUCCESS;

    return (
        <LoadingSwitch status={fetchStatus}>
            <div className="mx-auto">
                <h1 className="text-center m-1">Buscando: {searchParams.get("query")}</h1>
                {noResults ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="m-3 text-muted fs-4 fst-italic">No se encontró lo que buscabas :(</p>
                    </div>
                ) : (
                    <ProductGrid products={productsPage.products} />
                )}

                {productsPage.products?.length > 0 && (
                    <Pagination page={pageNumber} setPage={setPageNumber} pagesTotal={productsPage.amountOfPages} />
                )}
            </div>
        </LoadingSwitch>
    );
}

export default Search;