import { useEffect } from "react";
import CategoryCard from "../components/cards/CategoryCard/CategoryCard";
import { getCategories } from "../services/AxiosService";
import { useState } from "react";
import { STATUS } from "../services/AxiosService";
import LoadingSwitch from "../components/basic/LoadingSwitch/LoadingSwitch";

const iconsRoot =  "/src/assets/category-icons/";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(STATUS.LOADING);

    useEffect(() => {
        getCategories(setCategories, setFetchStatus);
    }, []); 

    return (
        <LoadingSwitch status={fetchStatus}>
            <div className="container mx-auto" style={{ maxWidth: "1000px" }}>
                <h2 className="m-4">Categories</h2>
                <div className=" row row-cols-4 text-center gap-3 my-4" >
                    {categories.map((category) => (
                        <CategoryCard 
                        key={category.id} 
                        id={category.id} 
                        name={category.name.replace("-"," ")} 
                        icon={iconsRoot + category.id + ".svg"} 
                        />
                    ))}
                </div>
            </div>
        </LoadingSwitch>
    );
}

export default Categories;