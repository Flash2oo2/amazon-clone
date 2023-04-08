import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./components/Login"
import Home from './components/Home';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import Navlinks from './components/Navlinks';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import ProductInfo from './components/ProductInfo'
import DisplayProducts from './components/DisplayProducts';
import { db } from './firebase';

import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';

import { getDatabase, ref, set, onValue, get, child } from "firebase/database";

import ScrollToTop from './utils/ScrollToTop';
import Address from './components/Address';
import AddAddress from './components/AddAddress';
import Checkoutbuy from './components/Checkoutbuy';
import OrderSuccess from './components/OrderSuccess';
import Delayed from './Delayed';

function App() {
  const [{ basket, loggedinuser, address }, dispatch] = useStateValue()
  useEffect(() => {
    const dbRef = ref(getDatabase());

    basket.map((item) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        id: item.id
      })
    })

    if (loggedinuser) {


      get(child(dbRef, `users/${loggedinuser.uid}/cart`)).then((snapshot) => {
        if (snapshot.exists()) {
          const basketItems = snapshot.val()
          console.log(basketItems)
          basketItems.map((item) => {
            dispatch({
              type: "ADD_TO_BASKET",
              item: {
                id: item.id,
                title: item.title,
                image: item.image,
                rating: item.rating,
                price: item.price
              }
            }
            )

          })
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      get(child(dbRef, `users/${loggedinuser.uid}/address`)).then((snapshot) => {
        if (snapshot.exists()) {
          const addressItems = snapshot.val()
          console.log(addressItems)
          addressItems.map((item) => {
            dispatch({
              type: "ADD_ADDRESS",
              item: {
                id: item.id,
                country: item.country,
                fullName: item.fullName,
                mobileNo: item.mobileNo,
                pincode: item.pincode,
                addressLineOne: item.addressLineOne,
                addressLineTwo: item.addressLineTwo,
                city: item.city,
                state: item.state
              }
            }
            )

          })
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    else {

    }
  }
    , [loggedinuser]
  )



  useEffect(() => {


    const unsubscribe = auth.onAuthStateChanged((userauth) => {
      if (userauth) {
        dispatch({
          type: 'SET_LOGIN',
          user: userauth
        })
      }
      else {
        dispatch({
          type: 'SET_LOGIN',
          user: null
        })
      }
    })


    return () => {
      unsubscribe();
    }
  }, [])


  return (

    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/checkout" element={
            <>
              <Header />
              <Checkout />
              <Footer />
            </>
          } />

          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <>
              <Header />
              <Navlinks />

              <Home />
              <Footer />
            </>
          } />

          <Route path="/product/:id" element={
            <>
              <Header />
              <ProductInfo />
              <Footer />
            </>
          }
          />

          <Route path="/product/search/" element={
            <>
              <Header />
              <DisplayProducts />
              <Footer />
            </>
          }
          />
          <Route path="/product/category/:category" element={
            <>
              <Header />
              <DisplayProducts />
              <Footer />
            </>
          }
          />


          <Route path="/address" element={
            <>
              <Header />
              <Navlinks />
              <Address address={address} />
              <Footer />
            </>
          }
          />

          <Route path="/address/add" element={
            <>
              <Header />
              <Navlinks />
              <AddAddress />
              <Footer />
            </>
          }
          />
          <Route path="/checkout/buy/:id" element={
            <>

              <Checkoutbuy />

            </>
          }
          />

          <Route path="/checkout/success/:id" element={
            <>

              <OrderSuccess />

            </>
          }
          />

        </Routes>

      </div>
      {/*  
        <Header />
      </div>
     */ }

    </Router >

  );
}

export default App;
