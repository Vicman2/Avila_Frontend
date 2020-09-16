import React, {Component} from 'react'
import Modal from '../../UI/Modal/Modal'
import './ReadProduct.css'



class ReadProduct extends Component{
    render(){
        return(
            <Modal
            show={this.props.show}
            actionName="Product Information"
            cancel={this.props.handleModal}
            confirm={this.props.handleModal}
            >
                <div className="ReadProduct_ImageContain">
                    <div className="ReadProduct_Image">
                        <img className="contain_img" src={this.props.data.prodImageSrc}  alt={this.props.data.name} />
                    </div>
                </div>
                <div className="ReadProduct">
                    <div className="ReadProduct_Field">
                        <p className="ReadProduct_Key">Name</p>
                        <p className="ReadProduct_Value">{this.props.data.name} </p>
                    </div>
                    <div className="ReadProduct_Field">
                        <p className="ReadProduct_Key">Price</p>
                        <p className="ReadProduct_Value ReadProduct_EmailValue">{this.props.data.price} </p>
                    </div>
                    <div className="ReadProduct_Field">
                        <p className="ReadProduct_Key">Details</p>
                        <p className="ReadProduct_Value ReadProduct_Details">{this.props.data.details} </p>
                    </div>
                </div>
            </Modal>
        )
    }
}


export default ReadProduct