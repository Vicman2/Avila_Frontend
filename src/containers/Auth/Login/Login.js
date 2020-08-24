import React, {Component} from 'react'
import InputForm from '../../../components/UI/InputTypes/AuthInputs/AuthInputs'
import './Login.css'
import Button from '../../../components/UI/Button/Button';


const FORM_INPUTS = {
    email: {
        label:"Email",
        elemType: "input",
        config: {
            type: 'text',
            required: "required"
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
        label:"Password",
        elemType: "input",
        config: {
            type: 'text', 
            required: "required"
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
    state = {
        isFormValid: false,
        loading: false,
        isSubmited: false,
        errors: [],
        formInputs : {
            email:{...FORM_INPUTS.email},
            password: {...FORM_INPUTS.password}
        }
    }
    formElementChangeHandler = async (event, elemName)=> {
        let formInputs = {...this.state.formInputs}
        let element = formInputs[elemName]
        element.value= event.target.value;
        element.isValid = element.validation()
        element.touched = true;
        await this.setState({formInputs: formInputs})
        await this.checkValidity()
    }
    checkValidity = async()=>{
        let  theFormIsValid = true;
        for(let elemName in this.state.formInputs){
            if(this.state.formInputs[elemName].isValid === false){
                theFormIsValid = false;
                break;
            }
        }
        await this.setState({isFormValid: theFormIsValid})
    }
    
    render(){
        let formElements = [];
        for(let elementName in this.state.formInputs){
            formElements.push({
                id: elementName, 
                config: this.state.formInputs[elementName]
            })
        }
        let toDisplay = formElements.map(element => {
            return (
                <InputForm 
                key={element.id}
                elemType={element.config.elemType}
                config={element.config.config}
                value={element.config.value}
                iconName={element.config.iconName}
                errorMessage={element.config.errorMessage}
                changed={(event)=>this.formElementChangeHandler(event, element.id)}
                valid={element.config.isValid}
                touched={element.config.touched}
                label={element.config.label}
                />
            )
        })
        
        return(
            <div className="Login">
                <p className="Auth_Title">Login</p>
                {toDisplay}
                <div className="Forgotten_Password">
                    <p>Forgotten password ?</p>
                </div>
                <div className="Auth_Btn_Wrapper">
                    <Button big name="LOGIN" />
                </div>
                <p className="Auth_Alt">Don't have an account? Sign up </p>
            </div>
        )
    }
}


export default Login