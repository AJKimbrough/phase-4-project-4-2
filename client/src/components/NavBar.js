import React from 'react';
import { NavLink } from 'react-router-dom';

const linkStyle = {
    display: "inline-block",
    width: "100px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "blue",
    textDecoration: "none",
    color: "white",
}

function NavBar({ isLoggedIn, handleLogout }){
    return(
        <div className='navBar'>
            <NavLink
                to="/"
                exact
                style={linkStyle}
                activeStyle={{
                    background:"darkblue",
                }}
            >
                AJs NFT Marketplace
            </NavLink>
            <NavLink
                to="/products"
                exact
                style={linkStyle}
                activeStyle={{
                    background:"darkblue",
                }}
            >
                NFTs for sale
            </NavLink>
            <NavLink
                to="/cart"
                exact
                style={linkStyle}
                activeStyle={{
                    background:"darkblue",
                }}
            >
                Shopping Cart
            </NavLink>
            
            <NavLink
                to="/profile"
                exact
                style={linkStyle}
                activeStyle={{
                    background:"darkblue",
                }}
            >
                Profile Page
            </NavLink>
        </div>
    )
}





// function NavBar({ isLoggedIn, handleLogout }) {
//     return (
//         <nav className='navbar'>
//             <div className='navbar-brand'>
//                 <Link to="/">AJs NFT Marketplace</Link>
//             </div>
//             <ul className='navbar-menu'>
//                 <li className='navbar-item'>
//                     <Link to="/shop">Shop</Link>
//                 </li>
//                 {isLoggedIn ? (
//                     <>
//                         <li className='navbar-item'>
//                             <Link to="/cart">Cart</Link>
//                         </li>
//                         <li className='navbar-item'>
//                             <Link to="/profile">Profile</Link>
//                         </li>
//                         <li className='navbar-item'>
//                             <button className='logout-button' onClick={handleLogout}>Logout</button>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <li className='navbar-item'>
//                             <Link to='/login'>Login</Link>
//                         </li>
//                         <li className='navbar-item'>
//                             <Link to='/register'>Register</Link>
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     )
// }

export default NavBar