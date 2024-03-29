import React from 'react'
import './SingleSideNav.css'
import { NavLink } from 'react-router-dom'





const SingleSideNav = (props) => {
    return(
        <div className="SingleSideNav">
            <div className="SingleSideNav_NavLink">
                <NavLink activeClassName="adminActive" to={props.location} exact={props.exact}><ion-icon name={props.iconName}></ion-icon> {props.name} </NavLink>
            </div>
        </div>
    )
}


export default SingleSideNav