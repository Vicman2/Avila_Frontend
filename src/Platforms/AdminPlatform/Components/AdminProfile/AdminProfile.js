import React from 'react'
import Modal from '../../Container/UI/Modal/Modal'
import './AdminProfile.css'



const AdminProfile = (props) => {
    return(
        <Modal
        show={props.show}
        actionName="Amininstator Information"
        cancel={props.handleModal}
        confirm={props.handleModal}
        >
            <div className="AdminProfile">
                <div className="AdminProfile_Field">
                    <p className="AdminProfile_Key">Name</p>
                    <p className="AdminProfile_Value">{props.data.name} </p>
                </div>
                <div className="AdminProfile_Field">
                    <p className="AdminProfile_Key">Email</p>
                    <p className="AdminProfile_Value AdminProfile_EmailValue">{props.data.email} </p>
                </div>
                <div className="AdminProfile_Field">
                    <p className="AdminProfile_Key">Phone</p>
                    <p className="AdminProfile_Value AdminProfile_Details">{props.data.phone} </p>
                </div>
                <div className="AdminProfile_Field">
                    <p className="AdminProfile_Key">Gender</p>
                    <p className="AdminProfile_Value AdminProfile_Details">{props.data.sex} </p>
                </div>
                <div className="AdminProfile_Field">
                    <p className="AdminProfile_Key">Role</p>
                    <p className="AdminProfile_Value AdminProfile_Details">{props.data.role} </p>
                </div>
                <div className="AdminProfile_Field">
                    <p className="AdminProfile_Key">Address</p>
                    <p className="AdminProfile_Value AdminProfile_Address">{props.data.address} </p>
                </div>
            </div>
        </Modal>
    )
}

export default AdminProfile