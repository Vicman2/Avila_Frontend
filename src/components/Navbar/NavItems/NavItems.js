import React from 'react'
import './NavItems.css'
import NavItem from './NavItem/NavItem'
import { NavLink } from 'react-router-dom'
import {flowRight as compose} from 'lodash'
import cartImg from './Assets/cart.png'
import { fromPairs } from 'lodash'
import { connect } from 'react-redux'

const NavItems = (props) => {
    let cartNumber = null
    if(props.cartNo){
        cartNumber =  <p className="Cart_Number">{props.cartNo} </p>
    }
    if(props)
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
                    {cartNumber}
                    <img src={cartImg} alt="cart"/>
                </div>
            </div>
        </div>
    )
}

const stateMappedToProps = state => {
    return{
        cartNo: state.users.cartNo,
    }
}




export default compose(
    connect(stateMappedToProps)
)  (NavItems)