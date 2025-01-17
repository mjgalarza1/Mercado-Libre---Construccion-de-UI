import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { STATUS, getRelatedProducts, getProduct, getUserDetails } from '../services/AxiosService';
import ProductBuy from "../components/product/ProductBuy/ProductBuy";
import InfoSection from "../components/layout/InfoSection/InfoSection";
import ProductImages from "../components/product/ProductImages/ProductImages";
import QuestionsWithResponses from '../components/product/QuestionsWithResponses/QuestionsWithResponses';
import ProductGrid from '../components/layout/ProductsGrid/ProductsGrid';
import LoadingSwitch from '../components/basic/LoadingSwitch/LoadingSwitch';
import QuestionForm from '../components/forms/QuestionForm/QuestionForm';


export default function Product() {
    const { idProduct } = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(STATUS.LOADING);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setFetchStatus(STATUS.LOADING);
        getProduct(idProduct, setProduct, setFetchStatus);
        getRelatedProducts(idProduct, setRelatedProducts);
        if (localStorage.getItem('authorization')) {
            getUserDetails(setCurrentUser, setFetchStatus)
        }
    }, [idProduct]);

    const [isOwner, setIsOwner] = useState(false);
    useEffect(() => {
        setIsOwner(false);
        if (product?.owner?.id === currentUser?.id) {
            setIsOwner(true);
        }
    },[currentUser]);

  

    return (
        <LoadingSwitch status={fetchStatus}>
            <div className="mx-auto my-3" style={{ width: "1000px" }}>

                <div className="row mb-3 g-0 gap-3">
                    <ProductImages images={product?.images} />
                    <ProductBuy product={product} userId= {currentUser?.id} />
                </div>

                <InfoSection title="Características del producto">
                    <div className="row row-gap-1 mx-3" style={{ marginTop: "20px" }}>
                        {
                            product?.characteristic?.map((characteristic, index) => (
                                <div className='col-6' key={index}>
                                    <p className='text-capitalize'><strong>{characteristic.name}:</strong> {characteristic.value}</p>
                                </div>
                            ))
                        }
                    </div>
                </InfoSection>

                <InfoSection title="Descripción">
                    <p>{product?.description}</p>
                </InfoSection>

                <InfoSection title="Productos relacionados">
                    <ProductGrid products={relatedProducts} />
                </InfoSection>

                <InfoSection title="Preguntas">
                    <QuestionForm 
                    productId={product?.id} 
                    isOwner={isOwner}
                    setProduct={setProduct}
                    />
                    <QuestionsWithResponses 
                    productId={product?.id} 
                    setProduct={setProduct}
                    questions={product?.questions} 
                    isOwner={isOwner}
                    />
                </InfoSection>
            </div>
        </LoadingSwitch>
    );
}