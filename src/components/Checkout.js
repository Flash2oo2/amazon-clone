import React, { useEffect, useState } from "react";
import Subtotal from "./Subtotal";
import '../styles/Checkout.css'
import { useStateValue } from "../StateProvider";
import ProductCart from './ProductCart'
import { writeUserData } from "../utils";
import { Box, CircularProgress } from "@mui/material";
import StripeCheckout from "react-stripe-checkout";
export default function Checkout() {

    const [{ basket, loggedinuser }] = useStateValue();
    const [trigger, setTrigger] = useState(false);

    const [toggle, setToggle] = useState(0);

    useEffect(() => {
        if (loggedinuser && toggle !== 0) {
            console.log(basket)
            writeUserData(loggedinuser, basket)
        }

    }, [toggle])
    const [newBasket, setNewBasket] = useState([]);

    useEffect(() => {
        // setTrigger(false)
        feedBasket();
        // setTimeout(() => {
        //     setTrigger(true);
        // }, "1500");
        console.log(newBasket)

    }, [basket])

    useEffect(() => {

        setTrigger(false)
        feedBasket();
        setTimeout(() => {
            setTrigger(true);
        }, "1500");
    }, [])
    const feedBasket = () => {
        let temp = [];
        basket.map((item, i) => {
            let idx = temp.findIndex((element) => element.id == item.id);
            console.log(temp)
            console.log(idx)
            if (idx != -1) {
                if (temp.length)
                    temp[idx].qty++;
                console.log(1);
                return {}
            }
            else {
                const newItem = {
                    id: item.id,
                    title: item.title,
                    image: item.image,
                    price: item.price,
                    rating: item.rating,
                    qty: 1,
                };

                temp.push(newItem);

                return {}
            }

        }




        )
        setNewBasket(temp);
        console.log(newBasket)
    }

    if (!trigger)
        return (<Box sx={{
            marginLeft: "45%",
            marginTop: "10%",

        }}>
            <CircularProgress size={100} sx={{ color: "#232f3e" }} />
        </Box >)


    return (
        <div>

            <div className="checkout">
                <div className="checkout__left">
                    {
                        basket.length === 0 ? (
                            <div className="checkout__empty">
                                <img className="checkout__emptycart" src="https://www.getillustrations.com/packs/matilda-startup-illustrations/scenes/_1x/shopping,%20e-commerce%20_%20empty,%20shopping%20cart,%20items,%20products,%20zero,%20none_md.png" />
                                <h2 className="checkout__title">Your Shopping basket is empty</h2>
                                <p>You have no item in your basket. Buy one. </p>
                            </div>

                        ) : (
                            <div>
                                <h2 className="shoppingbaskettitle">Items in the Basket</h2>
                                {
                                    newBasket.map(item => (

                                        <ProductCart
                                            id={item.id}
                                            title={item.title}
                                            image={item.image}
                                            price={item.price}
                                            rating={item.rating}
                                            toggle={toggle}
                                            qty={item.qty}
                                            setToggle={setToggle}
                                        />

                                    ))

                                }

                            </div>



                        )

                    }
                </div>
                {
                    basket.length > 0 &&
                    <div className="checkout__right">
                        <Subtotal />
                    </div>
                }



            </div>
            <p className="checkout__disclaimer">
                The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.
            </p>
        </div>

    )
}