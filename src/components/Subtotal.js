import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import '../styles/Subtotal.css'
import { Link } from "react-router-dom";

function Subtotal() {
    const [{ basket, loggedinuser }, dispatch] = useStateValue()
    const getCartTotal = (basket) =>
        basket?.reduce((amount, item) => item.price + amount, 0);
    return (
        <div className="subtotal">

            <CurrencyFormat
                renderText={(value) => (
                    <p>Subtotal ({basket.length} items) : <strong>{`${value}`}</strong></p>

                )}
                decimalScale={2}
                value={getCartTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <Link to={`/checkout/buy/${0}?user=${loggedinuser ? false : true}`}>
                <button className="checkout__button hover__button">Proceed to Checkout</button>
            </Link>
        </div>
    )

}

export default Subtotal