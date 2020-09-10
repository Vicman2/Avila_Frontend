import React, { Component } from 'react'
import './Administration.css'
import AdminTopNav from './AdminNav/AdminTopNav/AdminTopNav'
import { Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from './ProtectedRotues/ProtectedRoutes'
import AdminProducts from './AdminProducts/AdminProducts'
import AdminUsers from './AdminUsers/AdminUsers'
import AdminHome from './AdminHome/AdminHome'
import AdminSideNav from './AdminNav/AdminSideNav/AdminSideNav'




class Administration extends Component{
    state = {

    }
    render(){
        return(
            <div className="Administration Administration_Contain">
               <AdminTopNav />
               <AdminSideNav />
                <Switch>
                    <ProtectedRoute path="/admin/products" component={AdminProducts} />
                    <ProtectedRoute path="/admin/Users" component={AdminUsers} />
                    <ProtectedRoute path="/" component={AdminHome} />
                </Switch>
            </div>
        )
    }
}


export default Administration