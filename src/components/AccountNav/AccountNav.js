import React from 'react'
import './AccountNav.css'

const AccountNav = (props) => {
    return(
        <div className="AccountNav contain">
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
            <div className="AccountNav_Item">
                <ion-icon name="power-outline"></ion-icon>
                <p>Logout</p>
            </div>
        </div>
    )
}


export default AccountNav