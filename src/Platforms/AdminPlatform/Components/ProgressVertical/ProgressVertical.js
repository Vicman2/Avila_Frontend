import React from 'react'
import "./ProgressVertical.css"


const ProgressVertical = (props) => {
    let percent = (props.number/props.total) * 100
    percent = `${percent.toString()}%`
    const style= {
        filler: {
            height: percent
        }
    }
    return(
        <div className="ProgressVertical">
            <div className="ProgressVertical_Inner">
                <div className="ProgressVertical_Outer" style={style.filler}></div>
            </div>
            <p className="ProgressVertical_Name">{props.name}</p>
        </div>
    )
}

export default ProgressVertical