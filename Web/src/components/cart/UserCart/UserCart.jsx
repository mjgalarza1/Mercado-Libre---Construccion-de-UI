import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart } from '../../../services/AxiosService.js';
import basket from '../../../assets/basket.svg';
import './UserCart.css'
import BlueButton from '../../basic/BlueButton/BlueButton.jsx';
import CartProduct from '../CartProduct/CartProduct.jsx'
import CartSumary from '../CartSumary/CartSumary.jsx';


function UserCart() {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [hasChangedQuantity, setHasChangedQuantity] = useState(false)

    useEffect(() => {
        try {
            getCart(setCart);
            setHasChangedQuantity(false)
        } catch (error) {
            console.log(error);
        }
    }, [hasChangedQuantity]);

    const deletefnc = async (id) => {
        try {
            setCart(prevState => prevState.filter(item => item.product.id !== id));
            await removeFromCart(id);
        } catch (error) {
            console.error("No se pudo eliminar el producto del carrito:", error);
        }
    };

    return (
        <div className='d-flex justify-content-center gap-3 my-2'>
                {cart.length === 0 ?
                    <div className='cart-products-empty rounded p-4' style={{ maxWidth: "700px" }}>
                        <img src={basket}></img>
                        <h2>Empezá un carrito de compras!</h2>
                        <BlueButton text="Descubrí productos" onClick={() => navigate("/")} />

                    </div>
                    :
                    <div className='bg-body rounded col-8 fadein' style={{ maxWidth: "700px" }}>
                        <h3 className="p-3">Productos</h3>
                        {cart.map((cartItem, index) => (
                            <CartProduct
                                key={cartItem.product.id}
                                item={cartItem.product}
                                amount={cartItem.amount}
                                deletefnc={deletefnc}
                                changedQuantity={setHasChangedQuantity}
                            />
                        ))}
                    </div>
                }
                {cart.length === 0 ?
                    <div className='cart-resume-empty'>
                        <h3>Resumen de compra</h3>
                        <h3>Aqui veras los importes de tu compra una vez que agregues productos.</h3>
                    </div>
                    :
                    <div style={{ width: "100%", maxWidth: '400px' }}>
                        <CartSumary cart={cart} purchasefnc={() => navigate('/purchase')} />
                    </div>

                }

        </div>
    )
};


export default UserCart;