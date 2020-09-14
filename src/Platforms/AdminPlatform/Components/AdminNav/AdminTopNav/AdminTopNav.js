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
                <p className="AdminTopNav_dropIcon"><ion-icon name="chevron-down-outline"></ion-icon></p>
            </div>
        </div>
    )
}


export default AdminTopNav



