import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import  * as uiActions from '../../../store/actions/UIActions'
import  * as userActions from '../../../store/actions/userActions'
import InputForm from '../../../components/UI/InputTypes/AuthInputs/AuthInputs'
import {setInLocalStorage} from '../../../utility'
import Axios from '../../../axios'
import './Login.css'
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader'


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
            type: 'password', 
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
    componentDidMount(){
        window.scrollTo(0,0)
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
    onLoginHandler = async(event) => {
        let data  = {}
        event.preventDefault();
        await this.setState({isSubmited: true});
        if(this.state.isSubmited && this.state.isFormValid){
            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value
            }
            await this.setState({loading: true})
            Axios.post('/api/users/login', data)
            .then(res => {
                let {token, cart} = res.data.data
                let cartNum  = cart.length>0 ? cart.length: null
                this.props.updateCart(cartNum)
                setInLocalStorage("token", token, 3600000);
                this.setState({formInputs: FORM_INPUTS, loading: false});
                this.props.notify({
                    status: 'success', 
                    content: res.data.message
                })
                this.props.login()
            }).catch(err=> {
                this.setState({loading: false})
                if(err.response.data){
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

        let btnLoader = <Loader />
        if(!this.state.loading){
            btnLoader = <Button big name="LOGIN" clicked={this.onLoginHandler} />
        }
        
        return(
            <div className="Login">
                <p className="Auth_Title">Login</p>
                {toDisplay}
                <div className="Forgotten_Password">
                    <p>Forgotten password ?</p>
                </div>
                <div className="Auth_Btn_Wrapper">
                    {btnLoader}
                </div>
                <p className="Auth_Alt">Don't have an account? <span onClick={this.props.switchAuth}>Sign up</span> </p>
            </div>
        )
    }
}
const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload)), 
        login: () => dispatch(userActions.login()),
        updateCart : (num)=> dispatch(userActions.updateNoOfCart(num))
    }
}

export default compose(
    connect(null, actionMappedToProps)
) (Login)