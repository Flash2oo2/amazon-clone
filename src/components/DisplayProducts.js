import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
export default function DisplayProducts() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('q');
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const url = () => {
        if (category)
            return `https://dummyjson.com/products/category/${category}`
        if (query)
            return `https://dummyjson.com/products/search?q=${query}`


    }
    const fetchData = async () => {

        return await fetch(url())
            .then((response) => response.json())
            .then((data) => setItems(data.products))
    }
    useEffect(() => {
        fetchData();
        console.log("hello")
    }, [query])

    const DisplaySearchedProducts = () => {
        return (
            items.map((item) => <ProductCard product={item} />)
        )
    }

    return (

        <>
            <h2 style={{ margin: 10, marginLeft: 100, fontWeight: 400 }}>RESULTS</h2>
            <div className="products">
                {items.length !== 0 ? (<DisplaySearchedProducts />) :
                    (<img className="products__image" src=" https://www.shutterstock.com/image-vector/no-item-found-vector-flat-600w-2085975523.jpg" />)}
            </div >
        </>
    )
}