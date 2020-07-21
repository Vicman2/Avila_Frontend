import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './containers/UI/Footer/Footer';
import Notification from './containers/UI/Notification/Notification';
import {flowRight as compose} from 'lodash'
import { connect } from 'react-redux';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home/Home'
import Products from './containers/Products/Products';
import Account from './containers/Account/Account';
import Cart from './containers/Cart/Cart';



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
        <Navbar
        clickedHamburger={this.clickedHamburger}
        />
        <Notification
          show={this.props.showNotification}
          data={this.props.notificationData}
        />
        <HamburgerMenu 
          show={this.state.hamburger}
          clicked={this.clickedHamburger}
        />
        <Switch>
          <Route path="/products" component={Products} />
          <Route path="/account" component={Account} />
          <Route path="/cart" component={Cart} />
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
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
