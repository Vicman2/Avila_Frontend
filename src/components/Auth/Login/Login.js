import React, {Component} from 'react'
import './Login.css'


const FORM_INPUTS = {
    email: {
        elemType: "input",
        config: {
            type: 'text', 
            placeholder: "Email", 
        },
        value:"",
        validation: function(){
            let valid = false;
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(emailRegex.test(this.value)){
                valid = true
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please input a valid email address",
        touched: false,
    },
    password: {
        elemType: "input",
        config: {
            type: 'text', 
            placeholder: "Password", 
        },
        value:"",
        validation: function(){
            let valid = true;
            return valid
        },
        isValid: false,
        errorMessage: "Please input a valid email address",
        touched: false,
    },
}

class Login extends Component{
    
    render(){
        let toDisplay = null;
        
        return(
            <div className="Login">
                <p className="Auth_Title">Login</p>

            </div>
        )
    }
}


export default Login