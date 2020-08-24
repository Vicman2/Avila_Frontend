import React, {Component} from 'react'
import { connect } from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as uiActions from '../../store/actions/UIActions'
import './Account.css'
import Login from '../Auth/Login/Login'
import SignUp from '../Auth/Signup/Signup'




class Account extends Component{
    state={
        auth: 'signUp'
    }
    render(){
        let toDisplay = null
        if(!this.props.isLoggedIn){
            
        }
        return(
            <div className="Account">
               <Login />
            </div>
        )
    }
}

const propsMappedToState= state => {
    return{
        isLoggedIn: state.users.isLoggedIn
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