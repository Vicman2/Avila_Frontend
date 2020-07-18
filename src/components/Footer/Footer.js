import React, {Component} from 'react'
import Input from '../UI/Inputs/Input/Input'
import './Footer.css'
import Button from '../UI/Button/Button'



class Footer extends Component{
    state = {
        isFormValid: false,
        emailInput: {
            elemType: "input",
            config: {
                type: 'text', 
                placeholder: "Email"
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
            touched: false
        }
    }
    emailValidationHandler =(event)=> {
        const UpdatedFormElement = {...this.state.emailInput}
        UpdatedFormElement.value = event.target.value;
        UpdatedFormElement.touched = true;
        let isValid = UpdatedFormElement.validation();
        UpdatedFormElement.isValid = isValid
        this.setState({emailInput: UpdatedFormElement, isFormValid: isValid});
    }
    submitEmail = (e)=>{
        e.preventDefault();
    }
    render(){
        return(
            <div className="Footer">
                <div className="Footer_green contain">
                    <p className="Footer_Sub">SUBSCRIBE To our newsletter</p>
                    <p className="Footer_Focused">Stay updated to get amazing offers and discounts on our products</p>
                    <form className="Footer_Form">
                        <div className="Email_Input">
                            <Input 
                            elemType={this.state.emailInput.elemType} 
                            config={this.state.emailInput.config}
                            errorMessage={this.state.emailInput.errorMessage}
                            valid={this.state.emailInput.isValid}
                            touched={this.state.emailInput.touched}
                            value={this.state.emailInput.value}
                            changed={(event)=>this.emailValidationHandler(event)}/>
                        </div>
                        <Button name="Subscribe" clicked={(e)=>this.submitEmail(e)} big/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Footer