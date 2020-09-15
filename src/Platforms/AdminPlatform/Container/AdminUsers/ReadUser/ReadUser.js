import React from 'react'
import { Component } from 'react'
import Modal from '../../UI/Modal/Modal'
import './ReadUser.css'



class ReadUser extends Component{
    render(){
        const {data} =  this.props
        return(
            <Modal
            show={this.props.show}
            actionName="User Information"
            cancel={this.props.handleModal}
            confirm={this.props.handleModal}
            >
                <div className="ReadUser">
                   <div className="ReadUser_Field">
                       <p className="ReadUser_Key">Name </p>
                       <p className="ReadUser_Value">{this.props.data.name} </p>
                   </div>
                   <div className="ReadUser_Field">
                       <p className="ReadUser_Key">Email</p>
                       <p className="ReadUser_Value ReadUser_EmailValue">{this.props.data.email} </p>
                   </div>
                   <div className="ReadUser_Field">
                       <p className="ReadUser_Key">Phone</p>
                       <p className="ReadUser_Value">{this.props.data.phone} </p>
                   </div>
                   <div className="ReadUser_Field">
                       <p className="ReadUser_Key">Role </p>
                       <p className="ReadUser_Value">{this.props.data.role} </p>
                   </div>
                   <div className="ReadUser_Field">
                       <p className="ReadUser_Key">Address</p>
                       <p className="ReadUser_Value">{this.props.data.address} </p>
                   </div>
                   <div className="ReadUser_Field">
                       <p className="ReadUser_Key">Sex</p>
                       <p className="ReadUser_Value">{this.props.data.sex} </p>
                   </div>
                </div>
            </Modal>
        )
    }
}


export default ReadUser