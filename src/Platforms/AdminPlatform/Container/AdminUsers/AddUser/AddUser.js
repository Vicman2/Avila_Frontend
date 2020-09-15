import React, {Component} from 'react'
import './AddUser.css'
import InputForm from '../../../../UsersPlatform/components/UI/InputTypes/AuthInputs/AuthInputs'
import Modal from '../../UI/Modal/Modal';
import Axios from '../../../../../axios'
import * as uiActions from '../../../../../store/actions/UIActions'
import {flowRight as compose} from 'lodash'
import { connect } from 'react-redux';
import {SignUp} from '../../../../../utility/FormInput'
import { getInLocalStorage } from '../../../../../utility';

const  FORM_INPUTS = {
    ...SignUp, 
    role: {
        elemType: 'select',
        value: "user", 
        isValid: true,
        touched: true,
        name: 'sex',
        validation: function(){
            let valid = false;
            if(this.value.trim() !== ''){
                valid = true;
            }
            return valid
        },
        options: [
            {name: 'User', value: 'user'},
            {name: "Admin", value: 'admin'}, 
        ]
    }
}

class AddUser extends Component{
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
            sex: {...FORM_INPUTS.sex},
            role: {...FORM_INPUTS.role}
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
    addUserHandler = async (event) => {
        let data  = {}
        event.preventDefault();
        await this.setState({isSubmited: true});
        await this.setState((prevState) => {
            return{
                ...prevState, 
                formInputs: {
                    ...prevState.formInputs, 
                    sex: {
                        ...prevState.formInputs.sex, 
                        touched: true
                    }
                }
            }
        })
        if(this.state.isSubmited && this.state.isFormValid){
            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value
            }
            await this.setState({loading: true})
            Axios.post('/api/users/addByAdmin', data, {
                headers: {
                    "x-access-token": getInLocalStorage("token")
                }
            } )
            .then(res => {
                this.setState({loading: false, formInputs: FORM_INPUTS})
                this.props.notify({
                    status: 'success', 
                    content: res.data.message
                })
                this.props.handleModal()
                this.props.fetchUsers()
            }).catch(err=> {
                this.setState({loading: false})
                if(err.response){
                    this.props.notify({
                        status: 'error', 
                        content: err.response.data.message
                    })
                }
            })
        }
    }
    render(){
        const style={
            inputStyle : {
                margin: "0",
                width: "40%"
            }
        }
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
                style={style.inputStyle}
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
            actionName="Create User"
            cancel={this.props.handleModal}
            confirm={this.addUserHandler}
            loading={this.state.loading}
            >
                <div className="AddUser">
                    <div className="AddUser_Inputs">
                        {toDisplay}
                    </div>
                </div>
            </Modal>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
      notify: (payload)=> dispatch(uiActions.promptNotification(payload)),
    }
}
export default compose(
    connect(null, mapDispatchToProps)
)  (AddUser)