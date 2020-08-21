import React from 'react'
import Aux from '../../../../../HOC/Aux/Aux'
import './AuthInputs.css'

const AuthInputs = (props) => {
    let inputElement = null;
    let classes = null;
    if(!props.valid && props.touched){
        classes = "ShowErrorMessage"
    }else{
        classes ="HideErrorMessage"
    }
    switch(props.elemType){
        case('input'):
        inputElement =(
            <Aux>
                <input 
                className="AuthInputs__Element" 
                onChange={props.changed} 
                {...props.config}
                value={props.value}/>
                <div className={classes}>{props.errorMessage}</div>
            </Aux>
        ) 
        break;
        case('textarea'):
        inputElement = (
            <Aux>
                <textarea  
                className="AuthInputs__Element"  
                onChange={props.changed} 
                value={props.value}
                {...props.config}></textarea>
                <div className={classes}>{props.errorMessage}</div>
            </Aux>
        )
        break;
        default: 
        inputElement = <input 
        className="AuthInputs__Element" 
        onChange={props.changed} {...props.config}
        value={props.value} />
    }
    return (
        <div className="Input">
            <label> {props.label} </label>
            {inputElement}
        </div>
    )
}

export default AuthInputs