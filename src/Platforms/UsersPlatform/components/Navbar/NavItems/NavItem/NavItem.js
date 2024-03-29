import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavItem.css'



const NavItem = (props) => {
    return(
        <div className="NavItem">
            <NavLink activeClassName="active" to={props.location} exact={props.exact}>{props.name} </NavLink>
        </div>
    )
}

export default NavItem