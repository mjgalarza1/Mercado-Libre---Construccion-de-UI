import './CartProduct.css'
import { useEffect, useState } from 'react';
import { addToCart, STATUS } from '../../../services/AxiosService';
import loading from '../../../assets/loading.svg';

const ProductCart = ({item, amount, deletefnc, changedQuantity}) => {
    const [quantity, setQuantity] = useState(amount);

    const increaseQuantity = () => {
        setFetchStatus(STATUS.LOADING)
        setQuantity(quantity + 1); 
        setHasChanged(true)
    };
    
    const decreaseQuantity = () => {
        setFetchStatus(STATUS.LOADING)
        setQuantity(quantity > 1 ? quantity - 1 : 1); 
        setHasChanged(true)};
    
    const [fetchStatus, setFetchStatus] = useState(STATUS.SUCCESS);
    const [hasChanged, setHasChanged] = useState(false);
    

    function updateItemQuantity() {   
        addToCart(item.id, quantity, setFetchStatus)
        setHasChanged(false)
    }    

    useEffect(() => {
        if (hasChanged) { // sin esto la llamada se ejecuta infinitamente por mas que hasChanged no cambie
            const timer = setTimeout(() => {  
                updateItemQuantity();
                changedQuantity(true)
            }, 500);

 
            return () => clearTimeout(timer);
        }
    }, [hasChanged]); 

    return (
        <div className='cartProduct-cart-wrapper mx-3'>
            <div className='cartProduct'>
                <img src={item.images[0]}/>
                <div className='cartProduct-details'>
                    <p>{item.title}</p>
                    <p>Por {item.owner.name}</p>
                    <button onClick={() => deletefnc(item.id)}>Eliminar</button>
                </div>
                {fetchStatus === STATUS.LOADING ? (
                        <img src={loading} alt="Loading..." className='loading-spinner'/>
                    ) : (    
                             <div className="cartProduct-quantity">
                            <button onClick={decreaseQuantity}>-</button>
                            <p>{quantity}</p>
                            <button onClick={increaseQuantity}>+</button>
                            </div>
                    )
                    }
                               
                <p className='price'>${(item.price * quantity).toFixed(2)}</p>
            </div>
            <div className='shipping p-2'>
                <p>Envío</p>
                <p>${item.shipping.price.toFixed(2)}</p>

            </div>
        </div>

    )

}




export default ProductCart;