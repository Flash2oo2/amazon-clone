import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import "../styles/Sidebar.css"
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';
import { username } from '../utils';
import { logoutUser } from '../utils';
import { useStateValue } from '../StateProvider';
export default props => {

    const [category, setCategory] = useState([]);
    const [{ basket, loggedinuser }, dispatch] = useStateValue()
    const fetchData = async () => {

        return await fetch(`https://dummyjson.com/products/category-list`)
            .then((response) => response.json())
            .then((data) => setCategory(data))
    }
    useEffect(() => {

        fetchData();

    }, [])

    return (
        <Menu>
            <div className='Sidebar__login'>
                <Link to={!loggedinuser && "/login"}>
                    <AccountCircle fontSize='large' />
                    <span>Hello, {loggedinuser ? username(loggedinuser) : "sign in"}</span>
                </Link>
            </div>
            <div className='Sidebar__items'>
                <div className='Sidebar__items__trending'>
                    <h3>Trending</h3>
                    <div className='Sidebar__links'>

                        <Link to="">
                            Best Sellers

                        </Link>
                        <Link to="">
                            New Releases

                        </Link>
                    </div>

                </div>

                <div className='Sidebar__items__category'>
                    <h3>Shop by Category</h3>
                    <div className='Sidebar__links'>
                        {category.map((cate) => {
                            return (
                                <Link to={`/product/category/${cate}`}>
                                    {cate} <NavigateNext />
                                </Link>
                            )
                        })

                        }
                    </div>
                </div>

                <div className='Sidebar__help'>
                    <h3>Help & Settings</h3>
                    <div className='Sidebar__links'>
                        <Link to="">
                            Your Account
                        </Link>

                        <Link to="">
                            Customer Service
                        </Link>
                        <Link to={!loggedinuser && "/login"} onClick={() => { logoutUser(loggedinuser) }}>
                            {loggedinuser ? 'Sign Out' : 'Sign In'}
                        </Link>

                    </div>
                </div>

            </div>

        </Menu>
    );
};