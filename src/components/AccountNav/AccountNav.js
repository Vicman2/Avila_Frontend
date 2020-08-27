import React from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as userActions from '../../store/actions/userActions'
import OneNav from './OneNav/OneNav'
import './AccountNav.css'

const AccountNav = (props) => {
    const onLogOut = () => {
        localStorage.removeItem("token");
        props.logOut()
    }
    const navs = [
        {title : "My Account",name: "profile", icon: "person-outline"},
        {title : "Saved Item",name: "savedItem", icon: "heart-outline"},
        {title : "My Orders", name: "orders", icon: "briefcase-outline"}, 
        {title : "Logout", name: "logout", icon: "power-outline"}
    ]


    return(
        <div className="AccountNav">
            {navs.map(nav => {
                return(
                    <OneNav
                    title={nav.title}
                    icon={nav.icon}
                    switchNav={() => props.switchNav(nav.name)}
                    activated = {props.activeNav == nav.name}
                    />
                )
            })}
        </div>
    )
}

const dispatchMappedToProps = dispatch => {
    return {
        logOut : () => dispatch(userActions.logOut())
    }
}


export default compose(
    connect(null, dispatchMappedToProps)
) (AccountNav)