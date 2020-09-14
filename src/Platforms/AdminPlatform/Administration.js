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
import Notification from '../UsersPlatform/containers/UI/Notification/Notification'
import {flowRight as compose} from 'lodash'
import { connect } from 'react-redux'
import * as userActions from '../../store/actions/userActions'
import Modal from './Container/UI/Modal/Modal'




class Administration extends Component{
    state = {

    }
    render(){
        return(
            <div className="Administration Administration_Contain">
                <Notification
                show={this.props.showNotification}
                data={this.props.notificationData}
                />
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


const stateMappedToProps = (state) => {
    return{
      isLoggedIn: state.users.isLoggedIn,
      showNotification : state.ui.showNotification,
      notificationData : state.ui.notificationData, 
      isAdmin: state.users.isAdmin
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      login: (isAdmin)=> dispatch(userActions.login(isAdmin)),
    }
  }
  


export default  compose(
    connect(stateMappedToProps, mapDispatchToProps)
) (Administration)