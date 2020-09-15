import React from 'react'
import Checkbox from '../Inputs/CheckBox/CheckBox'
import DeleteComp from '../UI/DeleteComp/DeleteComp'
import EditComp from '../UI/EditComp/EditComp'
import './SingleUser.css'

const SingleUser = (props) => {
    return(
        <div className="SingleUser" >
            <div className="SingleUser_Checkbox">
                <Checkbox 
                name={props.fieldName}
                value={props.fieldValue}
                />
            </div>
            <div className="SingleUser_Details" onClick={props.readUserHandler}>
                <div className="SingleUser_Name_Email">
                    <p className="SignleUser_Name">{props.name} </p>
                    <p className="SingleUser_Email">{props.email}</p>
                </div>
                <p className="SingleUser_Gender">{props.gender ? props.gender: "none"} </p>
                <p className="SingleUser_Phone">{props.phone} </p>
                <p className="SingleUser_Address">{props.address} </p>

            </div>
            <div className="SingleUser_Edit">
                <EditComp clicked={props.editUserHandler} />
            </div>
            <div className="SingleUser_Delete" >
                <DeleteComp  clicked={props.deleteUserHandler}/>
            </div>
        </div>
    )
}

export default SingleUser