import React from 'react'
import './CheckBox.css'



const Checkbox = (props) => {
    return(
        <div className="CheckBox">
            <input type="checkbox" name={props.name} value={props.value} />
        </div>
    )
}


export default Checkbox