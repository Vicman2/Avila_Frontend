import React from 'react'
import './Button.css'


const Button = (props) => {
    const classes = ["Button"];
    if(props.big) classes.push("btn_big")
    return(
        <div className={classes.join(" ")}>
            <button onClick={props.clicked} disabled={props.disabled} style={props.style} > {props.name}</button>
        </div>
    )
}

export default Button