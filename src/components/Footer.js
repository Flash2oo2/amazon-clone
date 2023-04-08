import React from "react";
import '../styles/Footer.css'
export default function Footer() {

    const handleScrollUp = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }
    return (
        <div className="footerarea" >

            <div onClick={handleScrollUp} className="footerarea__top">
                <p >Back to Top</p>
            </div>
            <div className="footerarea__links">
                <div className="footerarea__linkarea">
                    <h4>Get to Know Us</h4>
                    <div className="footerarea__links__col">
                        <h5>About Us</h5>
                        <h5>Careers</h5>

                    </div>
                </div>
                <div className="footerarea__linkarea">
                    <h4>Connect with Us</h4>
                    <div className="footerarea__links__col">
                        <h5>Facebook</h5>
                        <h5>Twitter</h5>
                        <h5>Instagram</h5>

                    </div>
                </div>
                <div className="footerarea__linkarea">
                    <h4>Make Money with Us</h4>
                    <div className="footerarea__links__col">
                        <h5>Sell on Amazon</h5>
                        <h5>Sell under Amazon Accelerator</h5>
                        <h5>Protect and Build Your Brand</h5>
                        <h5>Amazon Global Selling</h5>
                        <h5>Become an Affiliate</h5>
                        <h5>Fulfilment by Amazon</h5>
                        <h5> Advertise Your Products</h5>
                        <h5>Amazon Pay on Merchants</h5>
                    </div>
                </div>
                <div className="footerarea__linkarea">
                    <h4>Let Us Help You</h4>
                    <div className="footerarea__links__col">
                        <h5>Your Account</h5>
                        <h5>   Returns Centre</h5>
                        <h5> 100% Purchase Protection</h5>
                        <h5> Amazon App Download</h5>
                        <h5> Amazon Assistant Download</h5>
                        <h5> Help</h5>


                    </div>
                </div>
            </div>

        </div>
    )

}