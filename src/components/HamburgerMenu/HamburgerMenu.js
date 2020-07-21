import React from 'react'
import './HamburgerMenu.css'
import NavItems from '../Navbar/NavItems/NavItems'
import { NavLink } from 'react-router-dom'
import Aux from '../../HOC/Aux/Aux'
import Backdrop from '../UI/Backdrop/Backdrop'


const HamburgerMenu = (props) => {
    let classes = ["HarmburgerMenu"]
    let crossClass1 = ["Harm_Rotate1"]
    let crossClass2 = ["Harm_Rotate1"]
    if(props.show){
        classes.push("Show_Harmburger")
        crossClass1.push("Crossing1")
        crossClass2.push("Crossing2")
    }else{
        classes.push("Hide_Harmburger");
    }
    return(
        <Aux>
            <Backdrop toggled={props.show} clicked={props.clicked} />
            <div className={classes.join(" ")} onClick={props.clicked}>
                <div className="RotateSection">
                    <p className="RotateBurger">
                        <span className={crossClass1.join(" ")}></span>
                        <span className={crossClass2.join(" ")}></span>
                    </p>
                </div>
                <div>
                    <div className="Ham_NavLink">
                        <NavLink to="/home">Home</NavLink>    
                    </div>
                    <div className="Ham_NavLink">
                        <NavLink to="/products">Products</NavLink>   
                    </div>
                    <div className="Ham_NavLink">
                            <NavLink to="/account">My Account</NavLink>
                    </div>
                    <div className="Ham_NavLink">
                        <NavLink to="/cart">Cart</NavLink>
                    </div>
                </div>
            </div>
        </Aux>
    )
}



export default HamburgerMenu