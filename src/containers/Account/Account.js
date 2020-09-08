import React, {Component} from 'react'
import { connect } from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as uiActions from '../../store/actions/UIActions'
import * as userActions from '../../store/actions/userActions'
import './Account.css'
import Login from '../Auth/Login/Login'
import SignUp from '../Auth/Signup/Signup'
import AccountNav from '../../components/AccountNav/AccountNav'
import Profile from './Profile/Profile'
import SavedItem from './SavedItems/SavedItem'
import Orders from './Orders/Orders'




class Account extends Component{
    state={
        signedIn: false,
        activeScreen : 'profile' // Initailly set to false to know if the user already have an account
    }
    componentDidMount(){
        this.props.hideFooter()
    }
    swithAuthMethod = () => {
        this.setState((prevState) => {
            return {
                ...prevState, 
                signedIn: !prevState.signedIn
            }
        })
    }
    
    switchAccountComp =  (comp) => {
        this.setState({activeScreen: comp})
    }
    logOutHandler = () => {
        localStorage.removeItem("token");
        this.props.logOut()
    }
    render(){
        let toRenderScreen = <Profile />
        switch (this.state.activeScreen){
            case "savedItem":
                toRenderScreen = <SavedItem />
                break;
            case "orders":
                toRenderScreen = <Orders />
                break
            case "logout":
                this.logOutHandler()
                break
            default:
                toRenderScreen = <Profile />
                break;
        }
        let toDisplay = null
        let login =  <div className="Account_Auth">
            <Login switchAuth={this.swithAuthMethod} />
        </div>
        let Navs = <AccountNav
         switchNav ={this.switchAccountComp}
         activeNav = {this.state.activeScreen}
         />
        let signIn = <div className="Account_Auth">
            <SignUp switchAuth={this.swithAuthMethod}  />
        </div>
        if(!this.props.isLoggedIn && !this.state.signedIn){
            toDisplay  = signIn
        }else if(!this.props.isLoggedIn && this.state.signedIn){
            toDisplay = login
        }else if(this.props.isLoggedIn ){
            toDisplay = <div className="Account_validCont">
                {Navs}
                {toRenderScreen}
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
        notify: (payload)=>dispatch(uiActions.promptNotification(payload)),
        logOut : () => dispatch(userActions.logOut()), 
        hideFooter: () => dispatch(uiActions.hideFooter())
    }
}
export default compose(
    connect(propsMappedToState, actionMappedToProps)
) (Account)