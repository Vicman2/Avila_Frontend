import React, {Component} from 'react'
import InputForm from '../../../components/UI/InputTypes/AuthInputs/AuthInputs'
import './Signup.css'
import Button from '../../../components/UI/Button/Button';


const FORM_INPUTS = {
    name: {
        label:"Name",
        elemType: "input",
        config: {
            type: 'text',
            required:"required"
        },
        value:"",
        validation: function(){
            let valid = false;
            if(this.value.trim() !== '' && this.value.length >=3){
                valid = true;
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please enter your name",
        touched: false,
    },
    phone: {
        label:"Phone",
        elemType: "input",
        config: {
            type: 'text',
            required:"required"
        },
        value:"",
        validation: function(){
            let valid = false;
            const phoneRegex = /^[0]\d{10}$/
            if(phoneRegex.test(this.value)){
                valid = true
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please enter a valid nigerian phone number",
        touched: false,
    },
    
    email: {
        label:"Email",
        elemType: "input",
        config: {
            type: 'text', 
            required:"required"
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
            required:"required" 
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
    address: {
        label:"Address",
        elemType: "input",
        config: {
            type: 'text', 
            required:"required"
        },
        value:"",
        validation: function(){
            let valid = false;
            if(this.value.trim() !== '' && this.value.length >=10){
                valid = true;
            }
            return valid
        },
        isValid: false,
        errorMessage: "Enter a default address please",
        touched: false,
    },
    sex: {
        elemType: 'select',
        value: "", 
        isValid: true,
        touched: false,
        name: 'sex',
        validation: function(){
            let valid = false;
            if(this.value.trim() !== ''){
                valid = true;
            }
            return valid
        },
        options: [
            {name: 'Select Gender', value: ''},
            {name: 'Female', value: 'female'},
            {name: "Male", value: 'male'}, 
        ], 
        config:{}
    }
    
}

class SignUp extends Component{
    state = {
        isFormValid: false,
        loading: false,
        isSubmited: false,
        errors: [],
        formInputs : {
            name:{...FORM_INPUTS.name},
            phone: {...FORM_INPUTS.phone},
            email:{...FORM_INPUTS.email},
            password: {...FORM_INPUTS.password},
            address: {...FORM_INPUTS.address}, 
            sex: {...FORM_INPUTS.sex}
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
            let options = element.config.options ? element.config.options: null
            let name = element.config.name ? element.config.name: null
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
                options={options}
                name={name}
                label={element.config.label}
                />
            )
        })
        
        return(
            <div className="Login">
                <p className="Auth_Title">SIGN UP</p>
                <div className="SignIn_Inputs">
                    {toDisplay}
                </div>
                <div className="Auth_Btn_Wrapper">
                    <Button big name="SIGN UP" />
                </div>
                <p className="Auth_Alt">Already have an account ? signup</p>
            </div>
        )
    }
}


export default SignUp