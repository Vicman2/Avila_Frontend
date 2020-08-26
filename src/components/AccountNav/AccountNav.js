import React from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as userActions from '../../store/actions/userActions'
import './AccountNav.css'

const AccountNav = (props) => {
    const onLogOut = () => {
        localStorage.removeItem("token");
        props.logOut()
    }
    return(
        <div className="AccountNav">
            <div className="AccountNav_Item">
                <ion-icon name="person-outline"></ion-icon>
                <p>My Account</p>
            </div>
            <div className="AccountNav_Item">
                <ion-icon name="heart-outline"></ion-icon>
                <p>Saved Item</p>
            </div>
            <div className="AccountNav_Item">
                <ion-icon name="briefcase-outline"></ion-icon>
                <p>My Orders</p>
            </div>
            <div className="AccountNav_Item" onClick={onLogOut}>
                <ion-icon name="power-outline"></ion-icon>
                <p>Logout</p>
            </div>
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