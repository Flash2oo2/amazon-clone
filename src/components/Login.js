import React, { useState } from "react";
import '../styles/Login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
    const history = useNavigate()
    const [pageType, setPageType] = useState("login");
    const [useremail, setUserEmail] = useState('')
    const [userpassword, setUserPassword] = useState('')

    const resetform = () => {
        setUserEmail("");
        setUserPassword("");
    }

    const loginuser = async event => {
        event.preventDefault()
        await signInWithEmailAndPassword(auth, useremail, userpassword)
            .then((auth) => {
                history('/')
            }
            )
            .catch(e => alert(e.message))
    }

    const signupuser = async event => {
        event.preventDefault()
        await createUserWithEmailAndPassword(auth, useremail, userpassword)
            .then(auth => {
                history('/')
            }

            )
            .catch(e => alert(e.message))

    }
    return (
        <div className="login">
            <Link>
                <img className="login__logo"
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" />
            </Link>
            <div className="login__container">
                {pageType === "login" ? <h1>Sign in</h1> : <h1>Create Account</h1>}
                <form>
                    <h5>E-mail</h5>
                    <input value={useremail} onChange={event => setUserEmail(event.target.value)} type="email" />
                    <h5>Password</h5>
                    <input value={userpassword} onChange={event => setUserPassword(event.target.value)} type="password" />
                    {pageType === "login" && <button onClick={loginuser} type="submit" className="login__signInButton hover__button">Sign In</button>}
                    <br></br>

                    <p> By signing-in , you agree to Amazon's Terms & Conditions</p>
                    <div
                        className="login__changer"

                        onClick={() => {
                            setPageType(pageType === "login" ? "register" : "login");
                            resetform();
                        }
                        }>
                        {pageType === "login" ? <p>New to Amazon? Create Account </p> : <p>Already have an Account, Please Sign In </p>}
                    </div>
                    {pageType === "register" && <button onClick={signupuser} className="login__registerButton hover__button">Create your Amazon Account</button>}
                </form>
            </div>

        </div >

    )
}

export default Login