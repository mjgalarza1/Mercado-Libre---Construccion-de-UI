import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { STATUS, getUserDetails } from '../../../services/AxiosService'
import LoadingSwitch from '../../basic/LoadingSwitch/LoadingSwitch';
import BlueButton from '../../basic/BlueButton/BlueButton';
import ProductGrid from '../../layout/ProductsGrid/ProductsGrid';
import './UserProfile.css'

const OPTIONS = {
    LIKED: 'likedproducts',
    SALES: 'salesHistory',
    PURCHASES: 'purchaseHistory',
    MY_PRODUCTS: 'products'
}

const extractProductsFromUserData = (userData, option) => {
    if (!userData) return [];

    switch (option) {
        case OPTIONS.LIKED:
            return userData.likedproducts?.reverse() || [];
        case OPTIONS.SALES:
            return userData.salesHistory?.map(sale => sale.product).reverse() || [];
        case OPTIONS.PURCHASES:
            return userData.purchaseHistory?.flatMap(purchase =>
                purchase.items.map(item => item.product)
            ).reverse() || [];
        case OPTIONS.MY_PRODUCTS:
            return userData.products.reverse() || [];
        default:
            return [];
    }
};

function UserProfile() {

    const [currentUser, setCurrentUser] = useState({});
    const [fetchStatus, setFetchStatus] = useState(STATUS.LOADING);
    const [selectedOption, setSelectedOption] = useState(OPTIONS.LIKED);
    const [productsToShow, setProductsToShow] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails(setCurrentUser, setFetchStatus)
        if (fetchStatus === STATUS.ERROR) {
            navigate('/login');
        }
    }, [selectedOption]);

    useEffect(() => {
        setProductsToShow(extractProductsFromUserData(currentUser, selectedOption));
    }, [currentUser, selectedOption])

    function logout() {
        localStorage.removeItem('authorization');
        localStorage.removeItem('username');
        navigate('/')
        window.location.reload()
    }

    function addProduct() {
        navigate('/newProduct')
    }

    return (
        <LoadingSwitch status={fetchStatus}>
            <div className='mx-auto m-4' style={{ maxWidth: "1000px" }}>
                <div className='d-flex justify-content-between px-4'>
                    <div className='d-flex align-items-center'>
                        <img src={currentUser?.image} className='img-fluid rounded-circle' style={{ maxHeight: "48px" }} />
                        <span className='mx-3 fs-4'>{currentUser?.name}</span>
                    </div>
                    <div className='d-flex align-items-center gap-3'>
                        <button className="styleless-button" onClick={addProduct} >+ Agregar producto</button>
                        <BlueButton text="Logout" onClick={logout}></BlueButton>
                    </div>
                </div>
                <div className='d-flex my-4 fs-5 px-4'>
                    <span onClick={() => setSelectedOption(OPTIONS.LIKED)} className={`option ${selectedOption === OPTIONS.LIKED ? 'active' : ''}`}>Liked</span>
                    <span onClick={() => setSelectedOption(OPTIONS.SALES)} className={`option ${selectedOption === OPTIONS.SALES ? 'active' : ''}`}>Sales</span>
                    <span onClick={() => setSelectedOption(OPTIONS.PURCHASES)} className={`option ${selectedOption === OPTIONS.PURCHASES ? 'active' : ''}`}>Purchases</span>
                    <span onClick={() => setSelectedOption(OPTIONS.MY_PRODUCTS)} className={`option ${selectedOption === OPTIONS.MY_PRODUCTS ? 'active' : ''}`}>My products</span>
                </div>
            </div>
            <ProductGrid products={productsToShow} />
        </LoadingSwitch>
    );

}



export default UserProfile;