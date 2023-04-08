import React, { useState, useEffect } from "react";
import '../styles/Product.css'
import { useStateValue } from "../StateProvider";

import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { addData } from "../utils";

import { writeUserData } from "../utils";
function Product({ id }) {
    // { console.log(title) }

    const [{ basket, loggedinuser }, dispatch] = useStateValue()


    const [item, setItem] = useState([]);
    const [toggle, setToggle] = useState(0);
    useEffect(() => {
        if (loggedinuser && toggle !== 0)
            writeUserData(loggedinuser, basket)
    }, [toggle])


    /*  const storeData = async (event) => {
          event.preventDefault();
          const res =fetch(
              "https://clone-b7411-default-rtdb.firebaseio.com/userCart.json",
              {
                  method:"POST",
                  headers:{
                      "Content-Type": "appliacation/json"
                  },
  
              }
          )
  
      }
      */


    const fetchData = async () => {

        return await fetch(`https://dummyjson.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => setItem(data))
    }
    useEffect(() => {

        fetchData();

    }, [])

    const addToBasket = async () => {
        await dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: item.id,
                title: item.title,
                image: item.images[0],
                rating: item.rating,
                price: item.price
            }
        }
        )
    }

    return (

        <div className="product">


            <div className="product__info">
                <Link to={`/product/${id}`}>
                    <p className="product__title">{item.title}</p>
                </Link>

                <p className="product__price">
                    <small>$</small>
                    <strong>{item.price}</strong>
                </p>
                <div className="product__rating">
                    <Rating name="read-only" value={parseFloat(item.rating)} precision={0.1} readOnly />
                    <span className="rating__text">{item.rating}</span>



                </div>

            </div>


            {item.length !== 0 ?
                (<Link to={`/product/${id}`} >

                    <img src={item.images[0]} />
                </Link>
                ) :
                (<img src="" />)}


            <button className="hover__button" onClick={() => {
                console.log("init")
                addToBasket()


                setToggle((prevState) => prevState + 1)

            }

            }>Add to Basket</button>

        </div >


    )
}
export default Product