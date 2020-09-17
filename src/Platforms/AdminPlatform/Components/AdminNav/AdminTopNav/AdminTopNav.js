import React from 'react'
import './AdminTopNav.css'
import logo  from './Assets/AVILA-logo.png'
import userProfile from './Assets/Vicman.jpeg'



const AdminTopNav = (props) => {
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
                    <p onClick={props.logout} className="AdminTioNav_Actions">Logout</p>
                </div>
                <div className="AdminTopNav_dropIcon">
                    <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
            </div>
        </div>
    )
}


export default AdminTopNav



