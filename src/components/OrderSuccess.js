import React, { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ordersuccess.css"
export default function OrderSuccess() {

    const navigate = useNavigate();
    const [time, setTime] = useState(5);
    const { id } = useParams();

    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1);
        }, "1000")
    },
        [time]);
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, "5000")
    })

    return (
        <div className="Ordersuccess">
            <CheckCircleIcon sx={{ fontSize: "15rem", color: "rgb(5, 211, 109)" }} />
            <h2>Transaction Completed Successfully</h2>
            <h4>Transaction Id:{`${id}`} </h4>
            <br>
            </br>
            <h4>Redirecting you to HomePage in {`${time}`}</h4>
        </div>
    )
}