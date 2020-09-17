import React, { Component } from 'react'
import Modal from '../../UI/Modal/Modal'
import './EditProduct.css'
import {productInput as FormInputs} from '../../../../../utility/FormInput'
import InputForm from '../../../../UsersPlatform/components/UI/InputTypes/AuthInputs/AuthInputs'
import Axios from '../../../../../axios'
import * as uiActions from '../../../../../store/actions/UIActions'
import {flowRight as compose} from 'lodash'
import { connect } from 'react-redux';
import { getInLocalStorage } from '../../../../../utility';
import FilePicked from '../../../Components/Inputs/FilePicker/FilePicker'
import { generateBase64FromImage } from '../../../../../utility/imageUtility'


class EditProduct extends Component{
    state = {
        isFormValid: true,
        loading: false,
        isSubmited: false,
        formInputs: {
            name: {
                ...FormInputs.name, 
                touched: true, 
                isValid: true, 
                value: this.props.data.name
            },
            price: {
                ...FormInputs.price, 
                touched: true, 
                isValid: true,
                value: this.props.data.price
            },
            details: {
                ...FormInputs.description, 
                touched: true, 
                isValid: true,
                value: this.props.data.details
            }
        },
        pickerBackground: this.props.data.prodImageSrc, 
        file:{
            value:null,
            isValid: true,
        },
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
        theFormIsValid = theFormIsValid && this.state.file.isValid
        await this.setState({isFormValid: theFormIsValid})
    }

    fileChanger = async (event) => {
        const  picker =  event.target.files[0]
        if(!picker) return
        const image =await  generateBase64FromImage(event.target.files[0])
        await this.setState((prevState) => {
            return{
                pickerBackground: image, 
                file: {
                    ...prevState.file,
                    value: picker,
                    isValid: true
                }
            }
        })
        await this.checkValidity()
    }

    editProductHandler = async (event) => {
        let data  = {}
        event.preventDefault();
        await this.setState({isSubmited: true})
        if(this.state.isSubmited && this.state.isFormValid){

            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value
            }


            const formData = new FormData()
            for(const key in data){
                formData.append(key, data[key])
            }
            const prodImage = this.state.file.value || this.props.data.prodImageSrc
            formData.append('prodImage', prodImage)
            console.log(formData)
            await this.setState({loading: true})
            Axios.put(`/api/products/editProduct/${this.props.data._id}`, formData, {
                headers: {
                    "x-access-token": getInLocalStorage("token")
                }
            } )
            .then(res => {
                this.setState({loading: false, formInputs: FormInputs})
                this.props.notify({
                    status: 'success', 
                    content: res.data.message
                })
                this.props.handleModal()
                this.props.fetchProducts()
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
        let style= {
            pickerSection: {
                backgroundImage: `url(${this.state.pickerBackground})`
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
            confirm={this.editProductHandler}
            loading={this.state.loading}
            >
                <div className="AddProducts">
                    <div className="AddProducts_TextInputs">
                        {toDisplay}
                    </div>
                    <div className="AddProducts_ImagePicker">
                        <div className="ImageBox" style={style.pickerSection}>
                            <FilePicked
                            name="Edit image"
                            id="EditFile"
                            changed={(e) => this.fileChanger(e)}
                             />
                        </div>
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
)  (EditProduct)