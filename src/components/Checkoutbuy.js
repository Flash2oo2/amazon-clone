import React, { useEffect, useState } from "react";
import "../styles/Checkoutbuy.css"
import { useStateValue } from "../StateProvider";
import LockIcon from '@mui/icons-material/Lock';
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Balance, WidthFull } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons, BraintreePayPalButtons, PayPalMarks } from "@paypal/react-paypal-js";
import EditIcon from '@mui/icons-material/Edit';
import { Box, CircularProgress } from "@mui/material";


const amount = "2";
const currency = "USD";
const style = { "color": "" };

export default function Checkoutbuy() {

    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('user');
    const navigate = useNavigate();
    const [isAddress, setIsAddress] = useState(true);
    const [{ basket, address, loggedinuser }, dispatch] = useStateValue();
    const [value, setValue] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [items, setItems] = useState();
    const [trigger, setTrigger] = useState(false);




    const getCartTotal = (basket) =>
        basket?.reduce((amount, item) => item.price + amount, 0);

    const fetchData = async () => {
        if (id != 0) {
            console.log(1);
            return await fetch(`https://dummyjson.com/products/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setItems(data);
                    console.log(data)
                })

        }

    }


    const handleChange = (event) => {
        setValue(event.target.value);

    }
    const handleChangePayment = (event) => {
        setPaymentMethod(event.target.value);
    }


    const fundingSources = ["paypal", "card"];
    // Remember the amount props is received from the control panel
    const [selectedFundingSource, setSelectedFundingSource] = useState(
        fundingSources[0]
    );

    function onChange(event) {
        setSelectedFundingSource(event.target.value);
    }

    useEffect(() => {
        let isSubscribed = true
        if (isSubscribed) {
            setTimeout(() => {

                if (!query)
                    navigate("/login")

            }, "3000")
            if (id !== 0) {
                fetchData();

            }

            setTimeout(() => {
                setTrigger(true);
            }, "2000")


        }
        return () => {
            isSubscribed = false;

        }

    }, [])

    const toggle = () => {
        setIsAddress(false)

    }


    if (!trigger)
        return (<Box sx={{
            marginLeft: "45%",
            marginTop: "10%",

        }}>
            <CircularProgress size={100} sx={{ color: "#232f3e" }} />
        </Box >)

    // useEffect(() => {
    //     if (!loggedinuser)
    //         navigate("/login")
    // }, [basket, items])

    return (
        <div className="checkoutbuy">
            <div className="checkout__header">
                <div className="checkoutbuy__headermain">
                    <Link to='/' className="">
                        <img className="checkoutbuy__logo" alt="logo" src="http://pngimg.com/uploads/amazon/amazon_PNG3.png" />
                    </Link>
                    <h1>Checkout</h1>
                    <LockIcon />
                </div>
            </div>


            <div className="checkoutbuy__main">
                <div className="checkoutbuy__col1">
                    <h2 className="checkoutbuy__col1__title">  {isAddress ? "Select a delivery address" : "Delivery Address"}</h2>
                    <div className="checkoutbuy__data">
                        {
                            isAddress === true ? (<>

                                <h2>Your Addresses</h2>
                                <hr></hr>
                                <br></br>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        {
                                            address.map((address, i) => {
                                                const temp = value === i ? "#FCF5EE" : "white";
                                                return (
                                                    <FormControlLabel value={i} control={< Radio />}
                                                        label={`${address.fullName}, ${address.addressLineOne}, ${address.addressLineTwo}, ${address.city}, ${address.state}, ${address.country}, Phone number: ${address.mobileNo} `}
                                                        sx={{
                                                            backgroundColor: value == i ? "#FCF5EE" : "white",
                                                            border: value == i ? "1px solid #FBD8B4" : "none",
                                                            borderRadius: "0.5rem",
                                                            padding: ".5rem .2rem"
                                                        }}
                                                    />
                                                )
                                            })
                                        }
                                    </RadioGroup>

                                </FormControl>


                                <div className="checkoutbuy__addaddress">
                                    <Link to="/address/add">
                                        <AddIcon sx={{ color: "gray" }} />
                                    </Link>
                                    <Link to={`/address/add?user=${loggedinuser.length === 0 ? false : true}`}>
                                        <h4>Add new address</h4>
                                    </Link>
                                </div>

                                <br></br>
                                <hr>
                                </hr>


                                {address.length !== 0 && <button className="checkoutbuy__use hover__button " onClick={toggle}>Use this address</button>}
                            </>) :
                                (
                                    <>
                                        {address.length !== 0 && <div className="space-between">
                                            <div className="checkoutbuy__addressdata">
                                                <h4><b>{address[value].fullName}</b></h4>
                                                <h4>{address[value].addressLineOne}</h4>
                                                <h4>{address[value].addressLineTwo}</h4>
                                                <h4>{`${address[value].city},${address[value].state},${address[value].pincode}`}</h4>
                                                <h4>Phone number:{address[value].mobileNo}</h4>
                                            </div>
                                            <div className="checkoutbuy__edit" onClick={() => { setIsAddress(!isAddress) }}>
                                                <EditIcon fontSize="small" />
                                                <h4>Change</h4>
                                            </div>

                                        </div>
                                        }
                                    </>
                                )}
                    </div>


                </div>
                <div className="checkoutbuy__col2">
                    <div>


                        <div>
                            <h2 className="checkoutbuy__summary">Order Summary</h2>
                            <div className="space-between">
                                <h5>Items:</h5>
                                <h5>${id == 0 ? `${getCartTotal(basket)}` : items && `${items.price}`}</h5>
                            </div>
                            <div className="space-between">
                                <h5>Delivery:</h5>
                                <h5>Free</h5>
                            </div>
                            <br></br>
                            <hr>
                            </hr>
                            <div className="space-between" style={{ margin: "0.5rem" }}>
                                <h2 className="checkoutbuy__ordertotal">Order Total</h2>
                                <h2>${id == 0 ? `${getCartTotal(basket)}` : items && `${items.price}`}</h2>


                            </div>
                            <hr></hr>
                            <br></br>
                            <div>
                                {isAddress ?
                                    (<>
                                        {/* <button className="checkoutbuy_topbutton hover__button">Use this address</button> */}
                                        <p className="checkoutbuy_toptext">Choose an address to continue checking out. You will still have a chance to review and edit your order before it is final.</p>
                                    </>
                                    )
                                    : (
                                        <>

                                            <p className="checkoutbuy_toptext">Choose a payment method to continue checking out. You'll still have a chance to review your order before it's final.</p>
                                        </>)}

                            </div>
                        </div>

                    </div>
                </div>
            </div >

            {address.length !== 0 &&
                <div className="checkoutbuy__payment">
                    <h2 className="checkoutbuy__col1__title">Select a payment method</h2>
                    <div className="checkoutbuy__methods">
                        <h2>Payment methods</h2>
                        <hr></hr>
                        <br></br>

                        <PayPalScriptProvider
                            options={{
                                "client-id": "Aac62jF_477r4JM5xgY7JS79LnYmLeiGhQiDT30--layuVlJLUKk6Ni09fadLRNDU7NIteKYXlb0bEIk",
                                components: "buttons,marks,funding-eligibility"
                            }}
                        >
                            <form style={{ minHeight: "200px", }}>
                                {fundingSources.map((fundingSource) => (
                                    <label className="mark" key={fundingSource} style={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }}>
                                        <input
                                            defaultChecked={
                                                fundingSource === selectedFundingSource
                                            }
                                            onChange={onChange}
                                            type="radio"
                                            name="fundingSource"
                                            value={fundingSource}
                                        />
                                        <PayPalMarks fundingSource={fundingSource} />

                                    </label>
                                ))}
                                <label className="mark" key="paylater">
                                    <input
                                        defaultChecked={
                                            "paylater" === selectedFundingSource
                                        }
                                        onChange={onChange}
                                        type="radio"
                                        name="fundingSource"
                                        value="paylater"
                                    />
                                    Cash On Delivery/Pay On Delivery
                                </label>


                            </form>
                            <br />
                            {selectedFundingSource !== "paylater" &&
                                < PayPalButtons
                                    fundingSource={selectedFundingSource}
                                    style={style}
                                    forceReRender={[selectedFundingSource, style, amount, currency]}
                                    createOrder={(data, actions) => {
                                        return actions.order
                                            .create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            currency_code: currency, // Here change the currency if needed
                                                            value: id == 0 ? getCartTotal(basket) : items && items.price // Here change the amount if needed
                                                        },

                                                    },


                                                ],
                                                "application_context": {

                                                    "shipping_preference": "NO_SHIPPING"

                                                }
                                            })
                                            .then((orderId) => {
                                                // Your code here after create the order
                                                return orderId
                                            });
                                    }}
                                    onApprove={(data, actions) => {

                                        return actions.order.capture().then(function (details) {
                                            // Your code here after approve the transaction
                                            navigate(`/checkout/success/${data.orderID}`)
                                            console.log(data);

                                        });
                                    }}
                                />
                            }

                        </PayPalScriptProvider>
                    </div>
                </div>
            }
        </div>


    )

}


{/* <PayPalScriptProvider
    options={{
        "client-id": "test",
        components: "buttons,marks,funding-eligibility"
    }}
>
    <form style={{ minHeight: "200px" }}>
        {fundingSources.map((fundingSource) => (
            <label className="mark" key={fundingSource}>
                <input
                    defaultChecked={
                        fundingSource === selectedFundingSource
                    }
                    onChange={onChange}
                    type="radio"
                    name="fundingSource"
                    value={fundingSource}
                />
                <PayPalMarks fundingSource={fundingSource} />
            </label>
        ))}
    </form>
    <br />
    <PayPalButtons
        fundingSource={selectedFundingSource}
        style={style}
        forceReRender={[selectedFundingSource, style, amount, currency]}
        createOrder={(data, actions) => {
            return actions.order
                .create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: currency, // Here change the currency if needed
                                value: amount, // Here change the amount if needed
                            },
                        },
                    ],
                })
                .then((orderId) => {
                    // Your code here after create the order
                    return orderId;
                });
        }}
        onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
                // Your code here after approve the transaction
            });
        }}
    />
</PayPalScriptProvider> */}


// <FormControl>
//     <RadioGroup
//         aria-labelledby="demo-controlled-radio-buttons-group"
//         name="controlled-radio-buttons-group"
//         value={paymentMethod}
//         onChange={handleChangePayment}
//     >


//         <FormControlLabel value="card" control={< Radio />}
//             label="Pay with Debit/Credit/ATM Cards"
//             sx={{
//                 backgroundColor: paymentMethod == "card" ? "#FCF5EE" : "white",
//                 border: paymentMethod == "card" ? "1px solid #FBD8B4" : "none",
//                 borderRadius: "0.5rem",
//                 padding: ".5rem .2rem",
//                 width: "200%",
//                 marginTop: "1rem",
//                 marginBottom: "-4rem",
//                 paddingBottom: "4rem"



//             }}
//         />
//         <div className="card__moretext">
//             <h3>You can save your cards as per new RBI guidelines.</h3>
//             <div className="images">
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"></img>
//                 <img src="https://w1.pngwing.com/pngs/47/111/png-transparent-visa-mastercard-logo-symbol-decal-sticker-text-orange-area-circle.png"></img>
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png"></img>
//             </div>
//         </div>

//         <FormControlLabel value="paypal" control={< Radio />}
//             label="Pay with Paypal"
//             sx={{
//                 backgroundColor: paymentMethod == "paypal" ? "#FCF5EE" : "white",
//                 border: paymentMethod == "paypal" ? "1px solid #FBD8B4" : "none",
//                 borderRadius: "0.5rem",
//                 width: "200%",
//                 padding: ".5rem .2rem",
//                 marginTop: "2rem"


//             }}
//         />

//         <FormControlLabel value="cod" control={< Radio />}
//             label="Cash On Delivery/Pay On Delivery"
//             sx={{
//                 backgroundColor: paymentMethod == "cod" ? "#FCF5EE" : "white",
//                 border: paymentMethod == "cod" ? "1px solid #FBD8B4" : "none",
//                 borderRadius: "0.5rem",
//                 width: "200%",
//                 padding: ".5rem .2rem"
//             }}
//         />

//     </RadioGroup>

// </FormControl>
