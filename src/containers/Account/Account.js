import React, {Component} from 'react'
import { connect } from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as uiActions from '../../store/actions/UIActions'
import './Account.css'
import Login from '../Auth/Login/Login'
import SignUp from '../Auth/Signup/Signup'
import AccountNav from '../../components/AccountNav/AccountNav'
import Profile from '../Profile/Profile'




class Account extends Component{
    state={
        signedIn: false, // Initailly set to false to know if the user already have an account
    }
    swithAuthMethod = () => {
        this.setState((prevState) => {
            return {
                ...prevState, 
                signedIn: !prevState.signedIn
            }
        })
    }
    render(){
        let toDisplay = null
        let login =  <div className="Account_Auth">
            <Login switchAuth={this.swithAuthMethod} />
        </div>
        let Navs = <AccountNav />
        let signIn = <div className="Account_Auth">
            <SignUp switchAuth={this.swithAuthMethod}  />
        </div>
        if(!this.props.isLoggedIn && !this.state.signedIn){
            toDisplay  = signIn
        }else if(!this.props.isLoggedIn && this.state.signedIn){
            toDisplay = login
        }else{
            toDisplay = <div className="Account_validCont">
                {Navs}
                <Profile />
            </div>
        }
        return(
            <div className="Account contain">
                {toDisplay}
            </div>
        )
    }
}

const propsMappedToState= state => {
    return{
        isLoggedIn: state.users.isLoggedIn, 
        onAuthComp : state.ui.unAuthComponent
    }
}

const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload))
    }
}
export default compose(
    connect(propsMappedToState, actionMappedToProps)
) (Account)