import React from 'react'
import './HamburgerMenu.css'
import NavItems from '../Navbar/NavItems/NavItems'
import { NavLink } from 'react-router-dom'
import Aux from '../../HOC/Aux/Aux'
import Backdrop from '../UI/Backdrop/Backdrop'


const HamburgerMenu = (props) => {
    return(
        <Aux>
            <Backdrop toggled={props.show} clicked={props.clicked} />
            <div className="HarmburgerMenu">
                <div>
                    <p> <ion-icon name="close-outline"></ion-icon></p>
                </div>
                <div>
                    <div>
                        <NavLink to="/home">Home</NavLink>    
                    </div>
                    <div>
                        <NavLink to="/products">products</NavLink>   
                    </div>
                    <div>
                            <NavLink to="/account">My Account</NavLink>
                    </div>
                    <div>
                        <NavLink to="/cart">Cart</NavLink>
                    </div>
                </div>
            </div>
        </Aux>
    )
}



export default HamburgerMenu