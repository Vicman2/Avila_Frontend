import React from 'react'
import Aux from '../../../../HOC/Aux/Aux'
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
        case('select'):
        let options = props.options.map(option => {
            return(
                <option key={option.value} value={option.value}>{option.name} </option>
            )
        })
            inputElement = (
                <Aux>
                    <select
                    className="AuthInputs__Element INPUT_SELECT"
                    onChange={props.changed}
                    name={props.name}>
                        {options}
                    </select>
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
        <div className="Input_Auto">
            {inputElement}
            <label className="AuthInputs__Element_label"> {props.label} </label>
        </div>
    )
}

export default AuthInputs