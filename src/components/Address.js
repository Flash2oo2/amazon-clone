import React, { useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import "../styles/address.css"
import { Phone } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { useStateValue } from "../StateProvider";
import { writeAddress } from "../utils";

export default function Address(
    { address }
) {

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('user');
    console.log(address);

    const [{ basket, loggedinuser }, dispatch] = useStateValue();



    const removeAddress = (id) => {
        dispatch({
            type: "REMOVE_ADDRESS",
            id: id
        });

    }

    useEffect(() => {
        writeAddress(loggedinuser, address);
    }, [address])

    useEffect(() => {
        if (!query)
            <Navigate to="/login" replace={true} />
    }, [])


    return (
        <div className="address_page">

            <h2>Your Addresses</h2>
            <div className="address_list">

                <div className="address_add">
                    <Link to={`/address/add?user=${loggedinuser ? false : true}`}>
                        <AddIcon color="action" sx={{
                            fontSize: 50
                        }} />
                    </Link>
                    <Link to="/address/add">
                        <h2>Add Address</h2>
                    </Link>
                </div>

                {
                    address.length !== 0 &&
                    (address.map((item, i) => {
                        console.log(item)
                        return (<div className="address_details">
                            <h4><b>{item.fullName}</b></h4>
                            <h4>{item.addressLineOne}</h4>
                            <h4>{item.addressLineTwo}</h4>
                            <h4>{`${item.city},${item.state},${item.pincode}`}</h4>
                            <h4>Phone number:{item.mobileNo}</h4>

                            <br></br>
                            <br></br>

                            <a href="" onClick={() => {
                                removeAddress(item.id)
                            }}>Remove</a>

                        </div>
                        )
                    }


                    ))
                }
            </div>
        </div>
    )

}