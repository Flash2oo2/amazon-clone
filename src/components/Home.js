
import React from "react";

import Product from "./Product";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../styles/Home.css"
function Home() {


    return (

        <div className="home">

            <div>
                <Carousel
                    showArrows={false}
                    showThumbs={false}
                    showIndicators={false}
                    dynamicHeight
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={5000}
                    showStatus={false}
                >

                    <img src="https://m.media-amazon.com/images/I/61GnAucagBL._SX3000_.png" alt="" className="home__image" />
                    <img src="https://m.media-amazon.com/images/I/51AQhraI0-L._SX3000_.png" alt="" className="home__image" />
                    <img src="https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/61TD5JLGhIL._SX3000_.jpg" className="home__image" />

                </Carousel>

            </div>


            <div className="home__main">
                <div className="home__row">

                    <Product
                        id='1'
                    />

                    <Product
                        id='2'
                    />

                    <Product
                        id='3'
                    />

                </div>
                <div className="home__row">

                    <Product
                        id='6'
                    />



                    <Product
                        id='7'
                    />

                </div>
                <div className="home__row">

                    <Product
                        id='60'
                    />

                    <Product
                        id='56'
                    />
                    <Product
                        id='57'
                    />

                    <Product
                        id='58'
                    />

                </div>

                <div className="home__row">

                    <Product
                        id='51'
                    />

                    <Product
                        id='53'
                    />
                    <Product
                        id='36'
                    />

                    <Product
                        id='37'
                    />

                </div>

                <div className="home__row">

                    <Product
                        id='13'
                    />

                    <Product
                        id='18'
                    />
                    <Product
                        id='19'
                    />

                    <Product
                        id='16'
                    />

                </div>
            </div>

        </div>
    )
}

export default Home