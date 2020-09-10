import React from 'react'
import './AdminSideNav.css'
import SingleSideNav from './SingleDideNav/SingleSideNav'



const AdminSideNav = (props) => {
    const navItems = [
        {location: "/admin", name:"Home" , exact: true, iconName: "home"},
        {location: "/admin/users", name:"Users", iconName: "people"},
        {location: "/admin/products", name:"Products",  iconName: "podium"},
        {location: "/admin/feedback", name:"Feedback", iconName: "book"},
        {location: "/admin/sales", name:"Sales Table", iconName: "pulse"},
    ]
    return(
        <div className="AdminSideNav">
            {navItems.map(navItem => {
                return(
                    <SingleSideNav
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