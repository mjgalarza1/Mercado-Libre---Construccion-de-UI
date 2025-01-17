import ProductCard from "../../cards/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

function ProductGrid( { products } ) {
    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    }

    return (
        <div className="mx-auto row my-3 g-0 row-gap-3" style={{ maxWidth: "1000px", padding: "16px" }}>
            {products &&
                products.map((product,index) => (
                    <div className="col" key={product.id + index}>
                        <ProductCard 
                            product={product} 
                            clickfnc={handleClick}
                        />
                    </div>
                ))
            }
        </div>
    );
}

export default ProductGrid;