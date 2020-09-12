import React from 'react'
import './ProgressBar.css';



const ProgressBar = (props) => {
    let percent = (props.number/props.total) * 100
    percent = `${percent.toString()}%`
    const style= {
        filler: {
            backgroundColor: props.fillerColor, 
            width: percent
        }
    }
    return(
        <div className="ProgressBar">
            <div className="ProgressBar_Texts">
                <p className="ProgressBar_Name">{props.name}</p>
                <p className="ProgressBar_Number">{props.number}</p>
            </div>
            <div className="ProgressBar_Inner">
                <div className="ProgressBar_Filler" style={style.filler}></div>
            </div>
        </div>
    )
}


export default ProgressBar