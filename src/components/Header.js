import React, { useEffect, useState } from "react";
import "../styles/Header.css"
import SearchIcon from "@mui/icons-material/Search"
import { Link, redirect, useNavigate } from 'react-router-dom'
import { ShoppingBasket } from "@mui/icons-material";
import { useStateValue } from "../StateProvider";
import { auth, db, database } from "../firebase";
import { username, logoutUser } from "../utils";
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { addData } from "../utils";
import { getDatabase, ref, set, onValue, get, child } from "firebase/database";
import LocationOnIcon from '@mui/icons-material/LocationOn';
function Header() {


    const [{ basket, loggedinuser, address }, dispatch] = useStateValue()
    const [searchText, setSearchText] = useState("");




    /* const fetchData = async function () {
          if (!loggedinuser) {
              const docRef = await doc(db, "userCart", "cart")
              const docSnap = getDoc(docRef)
  
              console.log("hello")
              docSnap.forEach(doc => {
                  console.log(doc.data());
              })
  
  
  
          }
      }
      useEffect(() => {
          fetchData();
      }
          , [])
      
  */

    //console.log(basket)
    /* const username = () => {
         if (loggedinuser) {
             const temp = loggedinuser.email.split('@')[0];
 
             return temp;
 
 
         }
     }
 
     const logoutUser = () => {
         if (loggedinuser) {
             auth.signOut();
 
         }
     }
     */



    /*  useEffect(() => {
          addData(loggedinuser, basket);
      }, [basket])
  
  */
    const navigate = useNavigate();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate(`/product/search?q=${searchText}`)
        }
    }

    return (

        < nav className="header" >

            <Link to='/' className="onhover">
                <img className="header__logo" alt="logo" src="https://i.postimg.cc/1RBJrgxg/klipartz-com.png" onClick={() => setSearchText("")} />
            </Link>
            <div className="header__address onhover">
                <LocationOnIcon />
                <Link to={loggedinuser ? `/address?user=${loggedinuser.length === 0 ? false : true}` : "/login"}>
                    <div className="header__address__body">
                        {(!loggedinuser || address.length == 0) ?
                            (<>
                                <p className="header__optionLineOne">Hello</p>
                                <p className="header__optionLineTwo" >Your Address</p>
                            </>
                            ) : (
                                <>
                                    <p className="header__optionLineOne">Deliver to {address.length && address[0].fullName}</p>
                                    <p className="header__optionLineTwo" >{address.length && address[0].city} {address.length && address[0].pincode}</p>

                                </>

                            )

                        }
                    </div>
                </Link>
            </div>
            <div className="header__search">
                <input type="text" className="header__searchInput" value={searchText} onKeyDown={handleKeyDown} onChange={event => setSearchText(event.target.value)} />
                <Link to={`/product/search?q=${searchText}`}>
                    <SearchIcon className="header__searchIcon" />
                </Link>
            </div>

            <div className="header__nav ">
                <Link to={!loggedinuser && "/login"} className="header__link onhover">
                    <div onClick={() => { logoutUser(loggedinuser) }} className="header__option">
                        <span className="header__optionLineOne">Hello, {loggedinuser ? username(loggedinuser) : "User"}</span>
                        <span className="header__optionLineTwo">{loggedinuser ? 'Sign Out' : 'Sign In'}</span>

                    </div>
                </Link>

                <Link to="/" className="header__link onhover" >
                    <div className="header__option ">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>

                    </div>
                </Link>

                <Link to="/" className="header__link onhover">
                    <div className="header__option" >
                        <span className="header__optionLineOne">You</span>
                        <span className="header__optionLineTwo">Prime</span>

                    </div>
                </Link>

                <Link to="/checkout" className="header__link onhover">
                    <div className="header__optionBasket">
                        <ShoppingBasket />
                        <span className="header__optionLineTwo header__productCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </nav >


    )
}

export default Header