
import React, { useState, useEffect } from "react";
import '../styles/ProductCart.css'
import { useStateValue } from "../StateProvider";
import { Rating } from "@mui/material";
import { writeUserData } from "../utils";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


function ProductCart({ id, title, image, price, rating, setToggle, toggle, qty }) {

    const [{ basket, loggedinuser }, dispatch] = useStateValue();
    const addItem = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                rating: rating,
                price: price
            }
        })
    }
    const removeItem = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id
        })
    }

    const removeAllItem = () => {
        for (let i = 0; i < qty; i++) {
            dispatch({
                type: "REMOVE_FROM_CART",
                id: id
            })
        }
    }

    useEffect(() => { }, [basket])
    return (

        <div className="productcart">
            <img className="productcart__image" src={image} alt="" />
            <div className="productcart__info">
                <p className="productcart__title">{title}</p>
                <p className="productcart__price">${price}</p>


                <div className="productcart__rating">
                    <Rating name="" value={parseFloat(rating)} size="small" precision={0.1} readOnly />
                    <span className="rating__text">{rating}</span>
                </div>
                <div className="productcart__addorremove">
                    <RemoveIcon sx={{
                        backgroundColor: "rgb(233, 233, 233)", borderRadius: "1rem", "&:hover": {
                            cursor: "pointer"
                        }
                    }} onClick={async () => { removeItem(); await setToggle((prevState) => prevState + 1) }} />
                    {qty}
                    <AddIcon sx={{
                        backgroundColor: "#bfbbbb", borderRadius: "1rem", "&:hover": {
                            cursor: "pointer"
                        }
                    }} onClick={async () => {
                        addItem()
                        await setToggle((prevState) => prevState + 1)
                    }} />

                </div>
                <button className="hover__button" onClick={async () => {
                    removeAllItem()
                    await setToggle((prevState) => prevState + 1)
                }}>Remove from cart</button>
            </div>

        </div>
    )


}

export default ProductCart