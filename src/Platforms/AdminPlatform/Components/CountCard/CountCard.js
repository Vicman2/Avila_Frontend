import React from 'react'
import './CountCard.css'


const CountCard  = (props) => {
    return(
        <div className="CountCard">
            <p className="CountCard_Number">{props.number}</p>
            <p className="CountCard_Name">{props.name}</p>
        </div>
    )
}

export default CountCard