import React from 'react'
import './Profile.css'


const Profile = (props) => {
    return(
        <div className="Profile">
            <p className="Account_Info_Title">ACCOUNT INFORMATION</p>
            <p className="Account_Edit">Edit</p>
            <div className="Profile_KeyValue">
                <p className="Profile_Key">Name</p>
                <p className="Profile_Value">SHALOM VICTOR </p>
            </div>
            <div className="Profile_KeyValue">
                <p className="Profile_Key">Email</p>
                <p className="Profile_Value">Whateverisyourname@gmail.com </p>
            </div>
            <div className="Profile_KeyValue">
                <p className="Profile_Key">Phone</p>
                <p className="Profile_Value">+234 90 300 000 0000</p>
            </div>
            <div className="Profile_KeyValue">
                <p className="Profile_Key">Address</p>
                <p className="Profile_Value">No 2 nowhere on earth estate east of the nile</p>
            </div>
            <div className="Profile_KeyValue">
                <p className="Profile_Key">Sex</p>
                <p className="Profile_Value">Female</p>
            </div>
        </div>
    )
}

export default Profile