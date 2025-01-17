import LargeBlueButton from '../../basic/LargeBlueButton/LargeBlueButton';
import QuantitySelector from '../../basic/AmountSelector/AmountSelector';
import { addToCart, STATUS } from '../../../services/AxiosService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LikeStarSwitch from '../../basic/LikeStarSwitch/LikeStarSwitch';

function ProductBuy({ product, userId }) {
    const [addToCartStatus, setAddToCartStatus] = useState(STATUS.IDLE);
    const [amount, setAmount] = useState("1");
    const navigate = useNavigate();

    useEffect(() => {
        if (addToCartStatus === STATUS.SUCCESS) {
            setAddToCartStatus(STATUS.IDLE);
            navigate("/cart");
        }
    },[addToCartStatus]);


    function add() {
        if (userId) {
            addToCart(product.id, amount, setAddToCartStatus);
        } else {
            navigate('/login', { state: { id: product.id } });
        }
    }
    return (
        <div className="col-4">
            <div className="bg-body rounded p-3 position-relative" >
                <LikeStarSwitch productId={product?.id}/>
                <h6 className="w-75 text-break">{product?.title}</h6>
                <span style={{color: "#666666", fontSize: "13px", cursor:"pointer"}} onClick={() => navigate(`/user/${product?.owner?.id}`)}>
                    Por {product?.owner?.name}
                </span>
                <h5 className='mb-0 mt-2'>$ {product?.price?.toFixed(2)}</h5>
                <p style={{ color: "#00A650" }}>En 12 cuotas de ${(product?.price / 12).toFixed(2)}</p>
                <p style={{ marginBottom: "12px" }}>Envio: $ {product?.shipping?.price?.toFixed(2)}</p>
                <h6>Stock disponible</h6>
                <p className='text-secondary'>{product?.stock < 1 ? "Sin stock" : `+${product?.stock} disponibles`}</p>
                { product?.owner?.id !== userId && <QuantitySelector amount={amount} setAmount={setAmount} />}
            </div>
            <div className="w-100 mt-2">
                {product?.owner?.id == userId ? 
                (<LargeBlueButton onClick={() => navigate(`/editproduct/${product?.id}`)} text={"Editar producto"} />)
                :
                (<LargeBlueButton onClick={() => add()} text={"Agregar al carrito"} />)                
                } 
                
            </div>
        </div>
    );
}

export default ProductBuy;