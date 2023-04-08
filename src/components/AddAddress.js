import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import "../styles/address.css"
import { writeAddress } from "../utils";
import uuid from "react-uuid";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export default function AddAddress() {

    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('user');

    const navigate = useNavigate();
    const [newAddress, setNewAddress] = useState({
        country: "",
        fullName: "",
        mobileNo: "",
        pincode: "",
        addressLineOne: "",
        addressLineTwo: "",
        city: "",
        state: ""

    });

    const [{ address, loggedinuser }, dispatch] = useStateValue();

    const addAddress = async (event) => {
        event.preventDefault();
        await dispatch({
            type: "ADD_ADDRESS",
            item: {
                id: uuid(),
                country: newAddress.country,
                fullName: newAddress.fullName,
                mobileNo: newAddress.mobileNo,
                pincode: newAddress.pincode,
                addressLineOne: newAddress.addressLineOne,
                addressLineTwo: newAddress.addressLineTwo,
                city: newAddress.city,
                state: newAddress.state
            }
        })
        console.log(address);
        if (loggedinuser) {
            writeAddress(loggedinuser, address);
        }

        navigate("/");

    }

    return (


        <div className="address__form">
            {!query && <Navigate to="/login" replace={true} />

            }
            <h2>Add a new Address</h2>
            <form>
                <h5>Country/Region</h5>
                <input value={newAddress.country} onChange={event => setNewAddress({ ...newAddress, country: event.target.value })} type="text" />
                <h5>Full name</h5>
                <input value={newAddress.fullName} onChange={event => setNewAddress({ ...newAddress, fullName: event.target.value })} type="text" />

                <h5>Mobile number</h5>
                <input value={newAddress.mobileNo} onChange={event => setNewAddress({ ...newAddress, mobileNo: event.target.value })} type="text" />
                <h5>Pincode</h5>
                <input value={newAddress.pincode} onChange={event => setNewAddress({ ...newAddress, pincode: event.target.value })} type="text" />
                <h5>House no., Flat , Building , Apartment</h5>
                <input value={newAddress.addressLineOne} onChange={event => setNewAddress({ ...newAddress, addressLineOne: event.target.value })} type="text" />
                <h5>Area, Street, Sector, Village</h5>
                <input value={newAddress.addressLineTwo} onChange={event => setNewAddress({ ...newAddress, addressLineTwo: event.target.value })} type="text" />
                <h5>Town/City</h5>
                <input value={newAddress.city} onChange={event => setNewAddress({ ...newAddress, city: event.target.value })} type="text" />
                <h5>State</h5>
                <input value={newAddress.state} onChange={event => setNewAddress({ ...newAddress, state: event.target.value })} type="text" />
                <br></br>
                <button className="address__add hover__button" type="submit" onClick={addAddress}>Add address</button>
            </form>
        </div>

    )
}