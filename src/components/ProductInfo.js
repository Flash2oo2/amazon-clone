

import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import ReactImageMagnify from "react-image-magnify";
import { GlassMagnifier } from "react-image-magnifiers";
import "../styles/ProductInfo.css"
import { useStateValue } from "../StateProvider";
import { writeUserData } from "../utils";
import { Box, CircularProgress } from "@mui/material";


function ProductInfo() {
    const [{ basket, loggedinuser }, dispatch] = useStateValue()
    const [trigger, setTrigger] = useState(false);
    const navigate = useNavigate();
    const [img, setImg] = useState([]);

    const { id } = useParams();
    const [item, setItem] = useState([]);
    const fetchData = async () => {
        setTimeout(() => {
            setTrigger(true);
        }, "3000")
        return await fetch(`https://dummyjson.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setItem(data);
                setImg(data.images[0])
            })
    }
    useEffect(() => {
        fetchData();


    }, [trigger])

    const [toggle, setToggle] = useState(0);
    useEffect(() => {
        if (loggedinuser && toggle !== 0)
            writeUserData(loggedinuser, basket)
    }, [toggle])


    const addToBasket = () => {
        dispatch({
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
    const hoverHandler = (image, i) => {
        setImg(image);
        refs.current[i].classList.add('active');
        for (var j = 0; j < item.images.length; j++) {
            if (i !== j) {
                refs.current[j].classList.remove('active');
            }
        }
    };
    const refs = useRef([]);
    refs.current = [];
    const addRefs = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const ImageCarousel = () => {
        return (
            <div className="imagecarousel" >
                <div className="left_1">
                    {item.images.map((image, i) => (
                        <div
                            className={i == 0 ? 'img_wrap active' : 'img_wrap'}
                            key={i}
                            onMouseOver={() => hoverHandler(image, i)}
                            ref={addRefs}
                        >
                            <img src={image} alt="" />
                        </div>
                    ))}
                </div>
                <div className="left_2">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: img,
                            },
                            largeImage: {
                                src: img,
                                width: 2250,
                                height: 1200,
                            },
                            enlargedImageContainerDimensions: {
                                width: '150%',
                                height: '150%',
                            },
                            imageClassName: "smallimage",
                        }}
                    />
                </div>
            </div>
        )
    }

    /*
      <Carousel showArrows={false} showStatus={false} autoPlay={true} interval={5000} infiniteLoop={true}>
                    {
                        item.images.map((image) =>
                        (<div >
                            <img className="productinfo__imagecar" src={image} />

                        </div>
                        )
                        )

                    }
                </Carousel>

                */

    if (!trigger)
        return (<Box sx={{
            marginLeft: "45%",
            marginTop: "10%",

        }}>
            <CircularProgress size={100} sx={{ color: "#232f3e" }} />
        </Box >)

    return (
        <div className="productinfo">
            <div className="productinfo__main">
                <div className="productinfo__image">
                    {item.length !== 0 ?
                        <ImageCarousel /> :
                        (<img src="" />)}
                </div>

                <div className="productinfo__info">
                    <div>
                        <div className="productinfo__infodata">
                            <h2 className="productinfo__title">{item.title}</h2>
                            <h5 className="productinfo__brand">{`Brand: ${item.brand}`}</h5>
                            <br></br>
                            <Rating name="" value={parseFloat(item.rating)} size="small" precision={0.1} readOnly />
                            <span className="rating__text">{item.rating}</span>
                            <br></br>
                            <p className="productinfo__price">
                                <sup>$</sup>
                                <strong>{item.price}</strong>
                                <p>Inclusive of all taxes</p>
                            </p>
                        </div>

                    </div>

                    <div className="productinfo__services">
                        <div className="productinfo__allservices">
                            <img className="services__image" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png" />
                            <h4 className="services__text">Free Delivery</h4>
                        </div>
                        <div className="productinfo__allservices">
                            <img className="services__image" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png" />
                            <h4 className="services__text">Pay on Delivery</h4>
                        </div>
                        <div className="productinfo__allservices">
                            <img className="services__image" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png" />
                            <h4 className="services__text">7 days Replacement</h4>
                        </div>
                        <div className="productinfo__allservices">
                            <img className="services__image" src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png" />
                            <h4 className="services__text">Amazon Delivered</h4>
                        </div>
                    </div>

                </div>
                <div className="productinfo__buy">
                    <p>FREE delivery <b>Tomorrow</b></p>
                    <h3 className="productinfo__instock">In stock</h3>
                    <div className="productinfo__buttons">
                        <button className="hover__button" onClick={() => {
                            addToBasket()
                            setToggle((prevState) => prevState + 1)
                        }
                        }>Add to Basket</button>
                        <br></br>

                        <button className="hover__button" onClick={() => { navigate(`/checkout/buy/${id}?user=${loggedinuser.length === 0 ? false : true}`) }}>Buy Now</button>

                    </div>
                </div>
            </div>

            <h2 className="productinfo__descriptionlabel">From the Manufacturer</h2>
            <div className="productinfo__description">

                <img className="productinfo__descriptionimage" src={item.images[0]} />
                <p className="productinfo__descriptiontext">{item.description}</p>

            </div>
        </div >
    )
}

export default ProductInfo  