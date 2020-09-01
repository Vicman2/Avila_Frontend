import React, {Component} from 'react'
import InputForm from '../../../../components/UI/InputTypes/AuthInputs/AuthInputs'
import './EditProfile.css'
import Button from '../../../../components/UI/Button/Button';
import Axios from '../../../../axios'
import {flowRight as compose} from 'lodash'
import { getInLocalStorage } from '../../../../utility';
import { connect } from 'react-redux';
import * as uiActions from '../../../../store/actions/UIActions'






class EditProfile extends Component{
    state = {
        formInputs :  {
            name: {
                label:"Name",
                elemType: "input",
                config: {
                    type: 'text',
                    required:"required"
                },
                value:this.props.data.name,
                validation: function(){
                    let valid = false;
                    if(this.value.trim() !== '' && this.value.length >=3){
                        valid = true;
                    }
                    return valid
                },
                isValid: true,
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
                value:this.props.data.phone,
                validation: function(){
                    let valid = false;
                    const phoneRegex = /^[0]\d{10}$/
                    if(phoneRegex.test(this.value)){
                        valid = true
                    }
                    return valid
                },
                isValid: true,
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
                value:this.props.data.email,
                validation: function(){
                    let valid = false;
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if(emailRegex.test(this.value)){
                        valid = true
                    }
                    return valid
                },
                isValid: true,
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
                value:this.props.data.address,
                validation: function(){
                    let valid = false;
                    if(this.value.trim() !== '' && this.value.length >=10){
                        valid = true;
                    }
                    return valid
                },
                isValid: true,
                errorMessage: "Enter a default address please",
                touched: false,
            }
        },
        isSubmitted: false,
        isFormValid: true

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
    editProfileHandler = async (event) => {
        let data  = {}
        event.preventDefault();
        await this.setState({isSubmitted: true});
        if(this.state.isSubmitted && this.state.isFormValid){
            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value
            }
            await this.setState({loading: true})
            Axios.put(`/api/users/edit/${this.props.data._id}`,data, {
                headers: {
                    "x-access-token": getInLocalStorage("token")
                }
            })
            .then(res => {
                this.props.notify({
                    status: 'success', 
                    content: res.data.message
                })
                this.props.switch()
            }).catch(err=> {
                this.setState({loading: false})
                if(err.resp){
                    this.props.notify({
                        status: 'error', 
                        content: err.response.data.message
                    })
                }
            })
        }
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
            <div className="EditProfile SignIn_Inputs">
                {toDisplay}
                <div className="Edit_Contain_Div">
                    <div className="Edit_BtnWrapper">
                        <Button name="Cancel" clicked={this.props.switch}/>
                        <Button name="Save details" clicked={this.editProfileHandler} />
                    </div>
                </div>
            </div>
        )
    }
}



const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload)), 
    }
}

export default compose(
    connect(null, actionMappedToProps)
) (EditProfile)
