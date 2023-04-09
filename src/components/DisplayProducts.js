import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { CircularProgress, Box } from "@mui/material";
export default function DisplayProducts() {
    const [searchParams, setSearchParams] = useSearchParams();


    const query = searchParams.get('q');
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const url = () => {
        if (category)
            return `https://dummyjson.com/products/category/${category}`
        if (query)
            return `https://dummyjson.com/products/search?q=${query}`


    }
    const fetchData = async () => {
        setTrigger(false)
        return await fetch(url())
            .then((response) => response.json())
            .then((data) => setItems(data.products))
            .then((e) => setTrigger(true));
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

    if (!trigger)
        return (<Box sx={{
            marginLeft: "45%",
            marginTop: "10%",

        }}>
            <CircularProgress size={100} sx={{ color: "#232f3e" }} />
        </Box >)

    return (

        <>
            <h2 style={{ margin: 10, marginLeft: 100, fontWeight: 400 }}>RESULTS</h2>
            <div className="products">
                {items.length !== 0 ? (<DisplaySearchedProducts />) :
                    (<img className="products__image" src="https://cdn.dribbble.com/users/3512533/screenshots/14168376/media/1357b33cb4057ecb3c6f869fc977561d.jpg" />)}
            </div >
        </>
    )
}