import React from 'react'
import './FilePicker.css'

const FilePicker = (props) => {
    return(
        <div className="FilePicker">
            <label htmlFor={props.id}>{props.name} </label>
            <input onChange={props.changed} type="file" name="file" id={props.id} />
        </div>
    )
}

export default FilePicker