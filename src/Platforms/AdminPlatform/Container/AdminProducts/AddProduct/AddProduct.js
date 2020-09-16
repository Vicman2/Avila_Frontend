import React, { Component } from 'react'
import Modal from '../../UI/Modal/Modal'
import './AddProduct.css'
import {productInput as FormInputs} from '../../../../../utility/FormInput'

import InputForm from '../../../../UsersPlatform/components/UI/InputTypes/AuthInputs/AuthInputs'
import Axios from '../../../../../axios'
import * as uiActions from '../../../../../store/actions/UIActions'
import {flowRight as compose} from 'lodash'
import { connect } from 'react-redux';
import {SignUp} from '../../../../../utility/FormInput'
import { getInLocalStorage } from '../../../../../utility';


class AddProduct extends Component{
    state = {
        formInputs: {
            name: {...FormInputs.name},
            price: {...FormInputs.price},
            description: {...FormInputs.description}
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
        console.log(this.props.show)
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
            <Modal
            show={this.props.show}
            actionName="Add Product"
            cancel={this.props.handleModal}
            confirm={this.addProductHandler}
            loading={this.state.loading}
            >
                <div className="AddProducts">
                    {toDisplay}
                </div>
            </Modal>
        )
    }
}

export default AddProduct