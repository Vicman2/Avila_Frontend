import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import  * as uiActions from '../../../../../store/actions/UIActions'
import  * as userActions from '../../../../../store/actions/userActions'
import InputForm from '../../../../../Platforms/UsersPlatform/components/UI/InputTypes/AuthInputs/AuthInputs'
import Loader from '../../../../../Platforms/UsersPlatform/components/UI/Loader/Loader'
import {setInLocalStorage, getInLocalStorage} from '../../../../../utility'
import Axios from '../../../../../axios'
import './Signup.css'
import Button from '../../../../../Platforms/UsersPlatform/components/UI/Button/Button';
import { withRouter } from 'react-router-dom'
import {SignUp as FORM_INPUTS} from '../../../../../utility/FormInput'

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
    

    signUpHandler = async (event) => {
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
                const {token} = res.data.data
                setInLocalStorage("token", token, 3600000);
                this.setState({formInputs: FORM_INPUTS, loading: false});
                this.props.notify({
                    status: 'success', 
                    content: res.data.message
                })
                this.props.login()
            }).then(data => {
                if(this.props.payloadBeforeAuth){
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
                                console.log(err)
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
        let loadingBtn = <Button big name="SIGN UP" clicked={this.signUpHandler} />
        if(this.state.loading){
            loadingBtn = <Loader />
        }
        return(
            <div className="SignIn">
                <p className="Auth_Title">SIGN UP</p>
                <div className="SignIn_Inputs">
                    {toDisplay}
                </div>
                <div className="Auth_Btn_Wrapper">
                    {loadingBtn}
                </div>
                <p className="Auth_Alt">Already have an account ? <span onClick={this.props.switchAuth}>Login</span></p>
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
        login: () => dispatch(userActions.login())
    }
}

export default compose(
    withRouter,
    connect(stateMappedToProps, actionMappedToProps)
) (SignUp)