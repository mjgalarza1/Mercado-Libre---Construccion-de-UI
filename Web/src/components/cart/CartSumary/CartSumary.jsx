import LargeBlueButton from '../../basic/LargeBlueButton/LargeBlueButton.jsx';

function CartSumary({ cart, purchasefnc }) {

    const totalProducts = cart.reduce((total, item) => total + item.amount, 0);
    const totalShippings = cart.length
    const totalProductsPrice = cart.reduce((total, item) => total + (item.amount * item.product.price), 0);
    const totalShippingsPrice = cart.reduce((total, item) => total + item.product.shipping.price, 0);

    return (
        <div className='d-flex flex-column rounded bg-body p-3 fadein'>
            <h3 className='pb-2 border-bottom'>Resumen de compra</h3>
            <div className='d-flex justify-content-between'>
                <p className="fs-5">Productos ({totalProducts})</p>
                <p className="fs-5">$ {totalProductsPrice.toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-between'>
                <p className="fs-5">Envios ({totalShippings})</p>
                <p className="fs-5">$ {totalShippingsPrice.toFixed(2)}</p>
            </div>
            <div className='d-flex justify-content-between'>
                <p className="fs-3 fw-semibold">Total</p>
                <p className="fs-3 fw-semibold"> $ {(totalProductsPrice + totalShippingsPrice).toFixed(2)}</p>
            </div>
            {purchasefnc && <LargeBlueButton text="Comprar" onClick={purchasefnc} />}
        </div>
    );
}

export default CartSumary;

