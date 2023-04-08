import React from "react";
import { Rating } from "@mui/material";
import "../styles/ProductCard.css"
import { Link } from "react-router-dom";
function ProductCard({ product }) {

    return (
        <div className="productcard">
            <Link to={`/product/${product.id}`}>
                <div className="productcard__imageContainer">
                    <img className="productcard__image" src={product.images[0]} />
                </div>
            </Link>
            <div className="productinfo__infodata">
                <Link to={`/product/${product.id}`}>
                    <h2 className="productinfo__title hover__text" >{product.title}</h2>
                </Link>
                <br></br>
                <Rating name="" value={parseFloat(product.rating)} size="small" precision={0.1} readOnly />
                <span className="rating__text">{product.rating}</span>
                <br></br>
                <p className="productinfo__price">
                    <sup>$</sup>
                    <strong>{product.price}</strong>
                </p>
                <br></br>
                <p>Get it by <b>Tomorrow</b></p>
                <p>FREE Delivery by Amazon</p>
            </div>
        </div>
    )
}
export default ProductCard
