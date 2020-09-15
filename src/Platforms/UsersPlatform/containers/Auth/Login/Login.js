import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import  * as uiActions from '../../../../../store/actions/UIActions'
import  * as userActions from '../../../../../store/actions/userActions'
import InputForm from '../../../components/UI/InputTypes/AuthInputs/AuthInputs'
import {setInLocalStorage, getInLocalStorage} from '../../../../../utility'
import Axios from '../../../../../axios'
import './Login.css'
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader'
import { withRouter } from 'react-router-dom'
import {Login as FORM_INPUTS}  from '../../../../../utility/FormInput'


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
                console.log(res.data)
                let {token, cart, role} = res.data.data
                let cartNum  = cart.length>0 ? cart.length: null
                this.props.updateCart(cartNum)
                setInLocalStorage("token", token, 3600000);
                this.setState({formInputs: FORM_INPUTS, loading: false});
                this.props.notify({
                    status: 'success', 
                    content: res.data.message
                })
                let admin = (role == "admin") ? true : false
                if(admin){
                    setInLocalStorage("isAdmin", admin, 3600000)
                    this.props.history.push('/')
                    this.props.login(admin)
                }else{
                    setInLocalStorage("isAdmin", admin, 3600000)
                    this.props.login(admin)
                }

            }).then(data => {
                if(this.props.payloadBeforeAuth && !getInLocalStorage("isAdmin")){
                    switch (this.props.payloadBeforeAuth.action) {
                        case "addToCart":
                            Axios.post(`/api/cart/add/${this.props.payloadBeforeAuth.prodId}`, {}, {
                                headers: {
                                    "x-access-token": getInLocalStorage("token")
                                }
                            }).then(res => {
                                this.props.notify({
                                    status: 'success',
                                    content: res.data.message
                                })
                                this.props.history.push('/products')
                            }).catch(err => {
                                if(err.response.data){
                                    this.props.history.push('/products')
                                    this.props.notify({
                                        status: 'error', 
                                        content: err.response.data.message
                                    })
                                }  
                            })
                            break;
                        case "addToFavourite":
                            Axios.put(`/api/users/addFavourite/${this.props.payloadBeforeAuth.prodId}`, {},{
                                headers: {
                                    "x-access-token": getInLocalStorage("token")
                                }
                            })
                            .then(res => {
                                this.props.notify({
                                    status: 'success',
                                    content: res.data.message
                                })
                                this.props.history.push('/products')
                            }).catch(err => {
                                if(err.response.data){
                                    this.props.history.push('/products')
                                    this.props.notify({
                                        status: 'error', 
                                        content: err.response.data.message
                                    })
                                }
                                
                            })
                            break;
                    
                        default:
                            this.props.history.push('/products');
                    }
                }
            })
            .catch(err=> {
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

const stateMappedToProps = state  => {
    return{
        payloadBeforeAuth : state.users.payloadBeforeAuth
    }
}

const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload)), 
        login: (isAdmin) => dispatch(userActions.login(isAdmin)),
        updateCart : (num)=> dispatch(userActions.updateNoOfCart(num))
    }
}

export default compose(
    withRouter,
    connect(stateMappedToProps, actionMappedToProps)
) (Login)