import React, {Component} from 'react'
import Input from '../../../components/UI/InputTypes/Inputs/Input/Input';
import './Footer.css';
import Button from '../../../components/UI/Button/Button';
import logo from './Assets/AVILA-logo.png';
import instagram from './Assets/instagram.png';
import facebook from './Assets/facebook.png';
import twitter from './Assets/twitter.png';
import { NavLink } from 'react-router-dom';
import Axios from '../../../axios';
import Loader from '../../../components/UI/Loader/Loader';
import * as uiActions from '../../../store/actions/UIActions'
import {flowRight as compose} from 'lodash';
import { connect } from 'react-redux';


const emailInput = {
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


class Footer extends Component{
    state = {
        loading:false,
        isFormValid: true,
        isSubmitted: false,
        emailInput: emailInput
    }
    emailValidationHandler =(event)=> {
        const UpdatedFormElement = {...this.state.emailInput}
        UpdatedFormElement.value = event.target.value;
        UpdatedFormElement.touched = true;
        this.setState({emailInput: UpdatedFormElement});
    }
     submitEmail = async (e)=>{
        e.preventDefault();
        let isValid = this.state.emailInput.validation()
        const emailInput1 = {...this.state.emailInput, touched:true}
        await this.setState({isFormValid: isValid, isSubmitted: true, emailInput: emailInput1});
        if(this.state.isFormValid && this.state.isSubmitted){
            this.setState({loading:true})
            let data ={email: this.state.emailInput.value}
            Axios.post('/api/users/subscribe', data)
            .then(data => {
                this.setState({emailInput, loading:false})
                this.props.notify({
                    status: 'success', 
                    content: "You have successfully subscribed to our news chanel"
                })
            }).catch(err => {
                this.setState({emailInput, loading:false})
                if(err.response && err.response.data){
                    this.props.notify({
                        status: 'error', 
                        content: err.response.data.message
                    })
                }
            })
        }

    }
    render(){
        const classes = ["Footer"];
        if(!this.props.hide){
            classes.push("Hide_Footer");
        }
       let toShow = <Button name="Subscribe" clicked={(e)=>this.submitEmail(e)} big/>
       if(this.state.loading){
           toShow = <div className="Footer_Loader">
               <Loader />
            </div>
       }
        return(
            <div className={classes.join(" ")}>
                <div className="Footer_green contain">
                    <p className="Footer_Sub">SUBSCRIBE To our newsletter</p>
                    <p className="Footer_Focused">Stay updated to get amazing offers and discounts on our products</p>
                    <form className="Footer_Form">
                        <div className="Email_Input">
                            <Input 
                            elemType={this.state.emailInput.elemType} 
                            config={this.state.emailInput.config}
                            errorMessage={this.state.emailInput.errorMessage}
                            valid={this.state.isFormValid}
                            touched={this.state.emailInput.touched}
                            value={this.state.emailInput.value}
                            changed={(event)=>this.emailValidationHandler(event)}/>
                        </div>
                        {toShow}
                    </form>
                </div>
                <div className="Footer_White contain">
                    <div className="Footer_white_row1">
                        <div className="The_About">
                            <div className="logo_div">
                                <img src={logo} alt="Logo" />
                            </div>
                            <p className="Footer_About">Avila Naturalle is multi-channel natural body care
                                and household brand, which combines a dynamic
                                distribution network with a retail strategy as well
                                as e-commerce. Avila Naturalle is a subsidiary of 
                                Top Confectionery Limited Nigeria which has a 
                                major focus on encouraging the usage of natural 
                                products and essentials oils</p>

                        </div>
                        <div className="Footer_Contact">
                            <p className="Footer_Contact_Us">Contact us</p>
                            <p className="Footer_Num"> <ion-icon name="call-outline"></ion-icon> +234 900 0000 900 000</p>
                            <p className="Footer_Email"><ion-icon name="mail-outline"></ion-icon>  info@avilanaturalle.com</p>
                        </div>
                        <div className="Footer_Socials">
                            <p className="Footer_Contact_Us">Connect with us on social media</p>
                            <p className="Footer_Handles">
                                <img src={instagram} alt="instagram" />
                                <img src={facebook} alt="facebook" />
                                <img src={twitter} alt="twitter" />
                            </p>
                        </div>
                    </div>
                    
                    <div className="Footer_Ending">
                        <p>Designed By Offordile Chimaobi Victor</p>
                        <p>© 2020  Avila Naturalle</p>
                        <div className="Footer_Navs">
                            <NavLink to="/terms">Terms</NavLink> 
                            <NavLink to="/privacy">Privacy Policy</NavLink> 
                            <NavLink to="/careers">Careers</NavLink> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload))
    }
}

export default compose(
    connect(null, actionMappedToProps)
) (Footer)