import React from 'react'
import './Backdrop.css'

const Backdrop  = (props) => {
    let toggled = props.toggled;
    let classes = ["Backdrop"]
    if(toggled){
        classes.push("ShowMe")
    }else{
        classes.push('Hide')
    }
    return (
        <div 
        className={classes.join(" ")} 
        onClick={props.clicked}></div>
    )
}

export default Backdrop