
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
                    {/* <img src="https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/61TD5JLGhIL._SX3000_.jpg" className="home__image" /> */}

                </Carousel>

            </div>


            <div className="home__main">
                <div className="home__row">

                    <Product
                        id='123'
                    />

                    <Product
                        id='133'
                    />

                    <Product
                        id='127'
                    />

                </div>
                <div className="home__row">

                    <Product
                        id='78'
                    />



                    <Product
                        id='79'
                    />

                </div>
                <div className="home__row">

                    <Product
                        id='85'
                    />

                    <Product
                        id='87'
                    />
                    <Product
                        id='163'
                    />

                    <Product
                        id='164'
                    />

                </div>

                <div className="home__row">

                    <Product
                        id='90'
                    />

                    <Product
                        id='92'
                    />
                    <Product
                        id='186'
                    />

                    <Product
                        id='189'
                    />

                </div>

                <div className="home__row">

                    <Product
                        id='99'
                    />

                    <Product
                        id='106'
                    />
                    <Product
                        id='107'
                    />

                    <Product
                        id='191'
                    />

                </div>
            </div>

        </div>
    )
}

export default Home