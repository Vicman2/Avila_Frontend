import React from 'react'
import './DeleteComp.css'



const DeleteComp = (props) => {
    return(
        <div className="DeleteComp" onClick={props.clicked}>
            <p className="DeleteComp_Icon"><ion-icon name="trash"></ion-icon></p>
            <p className="DeleteComp_Text">Delete</p>
        </div>
    )
}


export default DeleteComp