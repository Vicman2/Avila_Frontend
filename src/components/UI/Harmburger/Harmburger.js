import React from 'react'
import './Harmburger.css'

const Harmburger = (props) => {
    return (
        <div className="Harmburger" onClick={props.clicked}>
            <span className="Harmburger_1"></span>
            <span className="Harmburger_2"></span>
            <span className="Harmburger_3"></span>
            <span></span>
        </div>
    )
}

export default Harmburger