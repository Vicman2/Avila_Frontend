import React, {Component} from 'react'
import './AddUser.css'
import InputForm from '../../../../UsersPlatform/components/UI/InputTypes/AuthInputs/AuthInputs'
import Modal from '../../UI/Modal/Modal';
import Axios from '../../../../../axios'


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
            type: 'password',
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
        isValid: false,
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
        errorMessage: "Select is a gender please"
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
            Axios.post('/api/users/create',data )
            .then(res => {
                this.setState({loading: false})
                this.props.notify({
                    status: 'success', 
                    content: res.data.message
                })
                this.props.handleModal()
            }).catch(err=> {
                this.setState({loading: false})
                if(err.response){
                    this.props.notify({
                        status: 'error', 
                        content: err.response.message
                    })
                }
            })
        }
    }
    render(){
        const style={
            inputStyle : {
                margin: "15px 0",
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


export default AddUser