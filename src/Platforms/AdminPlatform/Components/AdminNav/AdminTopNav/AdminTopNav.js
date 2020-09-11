import React from 'react'
import './AdminTopNav.css'
import logo  from './Assets/AVILA-logo.png'



const AdminTopNav = (props) => {
    return(
        <div className="AdminTopNav contain">
            <div className="AdninTopNavLogo">
                <img className="contain_img" src={logo} alt="logo"/>
            </div>
            <div className="AdminTopNav_Right">
                <p>Vicman</p>
                <p><ion-icon name="chevron-down-outline"></ion-icon></p>
            </div>
        </div>
    )
}


export default AdminTopNav



