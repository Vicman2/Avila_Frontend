import React from 'react'
import './Navbar.css'
import logo from './Assets/AVILA-logo.png'
import NavItems from './NavItems/NavItems'
import Harmburger from '../UI/Harmburger/Harmburger'
import { flowRight } from 'lodash'
import { connect } from 'react-redux'



const Navbar = (props)=> {
    let cartNo = null
    if(props.cartNo){
        cartNo = <p className="NavBar_Counter">{props.cartNo} </p>
    }
    return(
        <header className="Navbar contain">
            <div className="logo_div">
                <img src={logo} alt="nav_Logo" />
            </div>
            <div>
                <NavItems />
            </div>
            <div className="Navbar_CartHarmburger">
                <div className="Navbar_Cart">
                    {cartNo}
                    <ion-icon name="cart-outline"></ion-icon>
                </div>
                <Harmburger clicked={props.clickedHamburger} />
            </div>
        </header>
    )
}

const stateMappedToProps = (props) => {
    return{
        cartNo: props.users.cartNo
    }
}



export default flowRight(
    connect(stateMappedToProps)
) (Navbar)