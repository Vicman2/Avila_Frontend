import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './containers/UI/Footer/Footer';
import Notification from './containers/UI/Notification/Notification';
import {flowRight as compose} from 'lodash'
import { connect } from 'react-redux';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';



class App extends Component{
  state= {
    hamburger: false
  }
  clickedHamburger = ()=> {
    this.setState((prevState) => {
      return{hamburger: !prevState.hamburger }
    })
  }
  render(){
    return (
      <div className="App">
        <Navbar/>
        <Footer />
        <Notification
          show={this.props.showNotification}
          data={this.props.notificationData}
        />
        <HamburgerMenu 
          show={this.state.harmburger}
          clicked={this.clickedHamburger}
        />
      </div>
    )
  }
}


const stateMappedToProps = (state) => {
  return{
    showNotification : state.ui.showNotification,
    notificationData : state.ui.notificationData
  }
}


export default compose(
  connect(stateMappedToProps)
)(App);
