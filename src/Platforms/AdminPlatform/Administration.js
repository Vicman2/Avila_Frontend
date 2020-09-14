import React, { Component } from 'react'
import './Administration.css'
import AdminTopNav from './Components/AdminNav/AdminTopNav/AdminTopNav'
import { Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRotues/ProtectedRoutes'
import AdminProducts from './Container/AdminProducts/AdminProducts'
import AdminUsers from './Container/AdminUsers/AdminUsers'
import AdminHome from './Container/AdminHome/AdminHome'
import AdminSideNav from './Components/AdminNav/AdminSideNav/AdminSideNav'
import FeedBack from './Container/FeedBack/FeedBack'
import Sales from './Container/Sales/Sales'




class Administration extends Component{
    state = {

    }
    render(){
        return(
            <div className="Administration Administration_Contain">
               <AdminTopNav />
               <div className="Administration_Content">
                    <AdminSideNav />
                    <div className="contain Admin_Detailing">
                        <Switch>
                            <ProtectedRoute path="/products" component={AdminProducts} />
                            <ProtectedRoute path="/users" component={AdminUsers} />
                            <ProtectedRoute path="/feedback" component={FeedBack} />
                            <ProtectedRoute path="/sales" component={Sales} />
                            <ProtectedRoute path="/" component={AdminHome} />
                        </Switch>
                    </div>
               </div>
            </div>
        )
    }
}


export default Administration