import React from 'react'
import './NavItems.css'
import NavItem from './NavItem/NavItem'
import { NavLink } from 'react-router-dom'
import cartImg from './Assets/cart.png'

const NavItems = (props) => {
    return(
        <div className="NavItems">
            <NavItem location="/" name="Home" exact />
            <NavItem location="/products" name="Products"  />
            <NavItem location="/account" name="My Account"  />
            <div className="cartNav">
                <div>
                    <NavLink activeClassName="active" to="/cart" exact>Cart</NavLink>
                </div>
                <div className="cart_img_contain">
                    <img src={cartImg} alt="cart" />
                </div>
            </div>
        </div>
    )
}


export default NavItems