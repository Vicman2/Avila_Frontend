import React from 'react'
import './AdminSideNav.css'
import SingleSideNav from './SingleSideNav/SingleSideNav'



const AdminSideNav = (props) => {
    const navItems = [
        {location: "/", name:"Home" , exact: true, iconName: "home"},
        {location: "/users", name:"Users", iconName: "people"},
        {location: "/products", name:"Products",  iconName: "podium"},
        {location: "/feedback", name:"Feedback", iconName: "book"},
        {location: "/sales", name:"Sales Table", iconName: "pulse"},
    ]
    return(
        <div className="AdminSideNav">
            {navItems.map(navItem => {
                return(
                    <SingleSideNav
                    key={navItem.name}
                    location={navItem.location}
                    name={navItem.name}
                    exact={navItem.exact}
                    iconName={navItem.iconName}
                    />
                )
            })}
        </div>
    )
}


export default AdminSideNav