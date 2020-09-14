import React , {Component} from 'react'
import Button from '../../../../UsersPlatform/components/UI/Button/Button'
import LoaderWrapper from '../../../Components/UI/LoaderWrapper/LoaderWrapper'
import './Modal.css'



class Modal extends Component{
    render(){
        const classes = ["Modal"]
        if(this.props.show){
            classes.push("Modal_Show")
        }else{
            classes.push("Modal_Hide")
        }
        let loaderButton = <Button name="Confirm" clicked={this.props.confirm}  style={style.confirm}/>
        if(this.props.loading){
            loaderButton = <LoaderWrapper />
        }
        return(
            <div className={classes.join(" ")}>
                <div className="Modal_Content">
                    <p className="Modal_title">{this.props.actionName}</p>
                    <div className="ModalChildren">
                        {this.props.children}
                    </div>
                    <div className="Modal_Btns">
                        <div className="Modal_ActionButton">
                            <Button name="Cancel" clicked={this.props.cancel}  style={style.cancelBtn}/>
                        </div>
                        <div className="Modal_ActionButton">
                            {loaderButton}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const style = {
    cancelBtn: {
        background: "#FFFFFF",
        color: "#38BE6E",
        border: "1px solid #38BE6E"
    },
    confirm: {
        background: "#38BE6E",
        color: "#FFFFFF"
    }
}


export default Modal