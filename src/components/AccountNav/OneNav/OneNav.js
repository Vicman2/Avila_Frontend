import React from 'react'
import './OneNav.css'

const OneNav = (props) => {
    const classes = ["OneNav"]
    if(props.activated) {
        classes.push("activeScreen")
    }
    return(
        <div className={classes.join(" ")} onClick={props.switchNav}>
            <ion-icon name={props.icon}></ion-icon>
            <p>{props.title}</p>
        </div>
    )
}
export default OneNav