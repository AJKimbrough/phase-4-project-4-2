import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, handleLogout }) {
    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <Link to="/">AJs NFT Marketplace</Link>
            </div>
            <ul className='navbar-menu'>
                <li className='navbar-item'>
                    <Link to="/shop">Shop</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className='navbar-item'>
                            <Link to="/cart">Cart</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li className='navbar-item'>
                            <button className='logout-button' onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='navbar-item'>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/register'>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar