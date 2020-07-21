import React from 'react'
import './Navbar.css'
import logo from './Assets/AVILA-logo.png'
import NavItems from './NavItems/NavItems'
import { NavLink } from 'react-router-dom'
import Harmburger from '../UI/Harmburger/Harmburger'



const Navbar = (props)=> {
    return(
        <header className="Navbar contain">
            <div className="logo_div">
                <img src={logo} alt="nav_Logo" />
            </div>
            <div>
                <NavItems />
            </div>
            <Harmburger clicked={props.clickedHamburger} />
        </header>
    )
}



export default Navbar