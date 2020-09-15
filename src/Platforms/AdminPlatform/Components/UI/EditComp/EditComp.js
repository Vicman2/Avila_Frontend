import React from 'react'
import './EditComp.css'



const EditComp = (props) => {
    return(
        <div className="EditComp" onClick={props.clicked}>
            <p className="EditComp_Icon"><ion-icon name="pencil"></ion-icon></p>
            <p className="EditComp_Text">Edit</p>
        </div>
    )
}


export default EditComp