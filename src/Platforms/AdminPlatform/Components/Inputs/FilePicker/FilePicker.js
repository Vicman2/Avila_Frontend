import React from 'react'
import './FilePicker.css'

const FilePicker = (props) => {
    return(
        <div className="FilePicker">
            <label htmlFor="file">{props.name} </label>
            <input onChange={props.changed} type="file" name="file" id="file" />
        </div>
    )
}

export default FilePicker