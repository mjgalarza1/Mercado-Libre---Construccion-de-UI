import { useEffect, useState } from "react";
import CartSumary from "../components/cart/CartSumary/CartSumary";
import PurchaseForm from "../components/forms/PurchaseForm/PurchaseForm";
import { getCart } from "../services/AxiosService";

function Purchase() {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCart(setCart)
    }, [])

    return (
        <div className="d-flex my-2 gap-3 justify-content-center">
            <div className="" style={{ width: "600px" }}>
                <PurchaseForm/>
            </div>
            <div style={{width:'400px'}}>
                <CartSumary cart={cart} />
            </div>
        </div>
    );
}

export default Purchase;