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
import * as uiActions from '../../store/actions/UIActions'
import AdminProfile from './Components/AdminProfile/AdminProfile'
import Axios from '../../axios'
import { getInLocalStorage } from '../../utility'




class Administration extends Component{
    state = {
      showProfile: false,
      userDetails: null
    }
    componentDidMount(){
      this.getProfile()
    }
    getProfile = () => {
      Axios.get('/api/users/getUser', {
          headers: {
              "x-access-token": getInLocalStorage("token")
          }
      }).then (res => {
          this.setState({userDetails: res.data.data})
      }).catch(err => {
        if(err.response){
          this.props.notify({
            status: "error", 
            content: err.response.data.message
          })
        }
      })
    }
    showProfileHandler = () => {
      this.setState(prevState => {
        return{
          ...prevState, 
          showProfile: !prevState.showProfile
        }
      })
    }

    render(){
      let toShowProfile = null;
      if(this.state.userDetails){
        toShowProfile = <AdminProfile
        handleModal= {this.showProfileHandler}
        show={this.state.showProfile}
        data={this.state.userDetails}
        />
      }

        return(
            <div className="Administration Administration_Contain">
                {toShowProfile}
                <Notification
                show={this.props.showNotification}
                data={this.props.notificationData}
                />

               <AdminTopNav
               showProfile={this.showProfileHandler}
              />
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
      logout: () => dispatch(userActions.logOut()),
      notify: (payload) => dispatch(uiActions.promptNotification(payload))
    }
  }
  


export default  compose(
    connect(stateMappedToProps, mapDispatchToProps)
) (Administration)