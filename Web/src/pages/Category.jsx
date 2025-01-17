import Pagination from "../components/layout/Pagination/Pagination";
import ProductGrid from "../components/layout/ProductsGrid/ProductsGrid";
import { STATUS, getCategory, getPageByCategory } from "../services/AxiosService";

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import LoadingSwitch from "../components/basic/LoadingSwitch/LoadingSwitch";

function Category() {

    const { id } = useParams();

    const [category, setCategory] = useState("Loading...");
    const [page, setPage] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [fetchStatus, setFetchStatus] = useState(STATUS.LOADING);


    const categoryIcon = `/src/assets/category-icons/${id}.svg`;

    useEffect(() => {
        getCategory(id, setCategory, setFetchStatus);
        getPageByCategory(id, setPage, setFetchStatus, pageNumber);
    }, [pageNumber]);

    return (
        <LoadingSwitch status={fetchStatus}>
            <div>
                <div className="d-flex mx-auto my-2 align-items-center " style={{ maxWidth: "1000px" }}>
                    <img src={categoryIcon} className="rounded-circle bg-body p-3" />
                    <h1 className="my-3 mx-3">{category.name}</h1>
                </div>
                <ProductGrid products={page.products} />
                <Pagination page={pageNumber} setPage={setPageNumber} pagesTotal={page.amountOfPages} />
            </div>
        </LoadingSwitch>

    );
}

export default Category;