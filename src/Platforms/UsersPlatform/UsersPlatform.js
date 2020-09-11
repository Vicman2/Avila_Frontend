import React, { Component } from 'react';
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
import ProdPreview from './containers/ProdPreview/ProdPreview'
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary'
import { getInLocalStorage } from '../../utility';
import * as userActions from '../../store/actions/userActions'
import Axios from '../../axios'
import AOS from 'aos'
import './UsersPlatform.css'




class Users extends Component{
  state= {
    hamburger: false,
    showFooter : true
  }
  componentDidMount(){
    AOS.init()
    // let token = getInLocalStorage('token')
    // let isAdmin = getInLocalStorage("isAdmin")
    // if(token){
    //   this.props.login(isAdmin)
    //   this.getCart()
    // }
  }

  getCart = () => {
    let token = getInLocalStorage("token")
    Axios.get('/api/cart/get', {
      headers: {
          "x-access-token": token
        }
    }).then(({data}) => {
        if(data.data.lenght !== 0){
          this.props.updateCart(data.data.length)
        }
    }).catch(err => {
        console.log(err)
    })
  }

  
  clickedHamburger = ()=> {
    this.setState((prevState) => {
      return{hamburger: !prevState.hamburger }
    })
  }



  
  render(){



    return (
      <ErrorBoundary>
        <div className="UserPlatform">
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
            <Route path="/products/:id" component={ProdPreview} />
            <Route path="/products" component={Products} />
            <Route path="/account" component={Account} />
            <Route path="/cart" component={Cart} />
            <Route path="/" exact component={Home} />
          </Switch>
          <Footer hide={this.props.showFooter} />
        </div>
      </ErrorBoundary>
    )
  }
}


const stateMappedToProps = (state) => {
  return{
    cartNum : state.users.cartNo,
    isLoggedIn: state.users.isLoggedIn,
    showNotification : state.ui.showNotification,
    notificationData : state.ui.notificationData, 
    showFooter: state.ui.showFooter, 
    isAdmin: state.users.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (isAdmin)=> dispatch(userActions.login(isAdmin)),
    updateCart : (num)=> dispatch(userActions.updateNoOfCart(num))
  }
}


export default compose(
  connect(stateMappedToProps, mapDispatchToProps)
)(Users);