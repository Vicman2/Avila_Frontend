import { flowRight } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './AdminTopNav.css'
import logo  from './Assets/AVILA-logo.png'
import userProfile from './Assets/Vicman.jpeg'
import  * as userActions from '../../../../../store/actions/userActions'



const AdminTopNav = (props) => {
    const logOutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin")
        props.history.push('/')
        props.logout()
      }
    return(
        <div className="AdminTopNav contain">
            <div className="AdninTopNavLogo">
                <img className="contain_img" src={logo} alt="logo"/>
            </div>
            <div className="AdminTopNav_Right">
                <div className="AdminTop_UserProfile">
                    <img className="contain_img" src={userProfile} alt="ProfilePicture" />
                </div>
                <p>Vicman</p>
                <div className="AdminTopNav_userActions">
                    <p onClick={props.showProfile} className="AdminTioNav_Actions">My Profile</p>
                    <p onClick={logOutHandler} className="AdminTioNav_Actions">Logout</p>
                </div>
                <div className="AdminTopNav_dropIcon">
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
            </div>
        </div>
    )
}

const dispatchMappedToProps = dispatch => {
    return{
        logout: () => dispatch(userActions.logOut())
    }
}


export default flowRight(
    withRouter,
    connect(null, dispatchMappedToProps)
) (AdminTopNav)



