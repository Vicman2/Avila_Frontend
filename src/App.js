import React, { Component } from 'react';
import './App.css';
import {flowRight as compose} from 'lodash'
import { connect } from 'react-redux';
import ErrorBoundary from './Platforms/UsersPlatform/containers/ErrorBoundary/ErrorBoundary'
import { getInLocalStorage } from './utility';
import * as userActions from './store/actions/userActions'
import AOS from 'aos'
import Administration from './Platforms/AdminPlatform/Administration';
import Users from './Platforms/UsersPlatform/UsersPlatform'




class App extends Component{
  componentDidMount(){
    AOS.init()
    let token = getInLocalStorage('token')
    let isAdmin = getInLocalStorage("isAdmin")
    if(token){
      this.props.login(isAdmin)
    }
  }

  render(){
    let toDisplay = null
    if(getInLocalStorage("isAdmin")){
      toDisplay = <Administration />
    }else{
      toDisplay = <Users />
    }


    return (
      <ErrorBoundary>
        <div className="App">
            {toDisplay}
        </div>
      </ErrorBoundary>
    )
  }
}


const stateMappedToProps = (state) => {
  return{
    isLoggedIn: state.users.isLoggedIn,
    isAdmin: state.users.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (isAdmin)=> dispatch(userActions.login(isAdmin))
  }
}


export default compose(
  connect(stateMappedToProps, mapDispatchToProps)
)(App);
