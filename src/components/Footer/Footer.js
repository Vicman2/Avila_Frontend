import React, {Component} from 'react'
import Input from '../UI/Inputs/Input/Input'
import './Footer.css'
import Button from '../UI/Button/Button'
import logo from './Assets/AVILA-logo.png'
import instagram from './Assets/instagram.png'
import facebook from './Assets/facebook.png'
import twitter from './Assets/twitter.png'
import NavItem from '../Navbar/NavItems/NavItem/NavItem'
import { NavLink } from 'react-router-dom'



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

export default Footer