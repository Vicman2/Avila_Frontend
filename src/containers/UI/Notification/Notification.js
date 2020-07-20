import React, {Component} from 'react'
import * as actionTypes from '../../../store/actions/UIActions'
import './Notification.css'
import { connect } from 'react-redux'


class Notification extends Component{
    state = {
        show: this.props.show, 
        data: this.props.data
    }
    componentDidUpdate(prevState, prevProps){
        if(prevProps.show !== this.props.show){
            this.setState({show: this.props.show, data: this.props.data})
        }
    }
    render(){
        const classes = ["Notification"]
        if(this.state.show){
            classes.push("Show_Notification");
        }else{
            classes.push("Hide_Notification");
        }
        const classesContent = ["Notification_Content"];
        let iconName = null
        switch (this.state.data.status) {
            case "warning":
                classesContent.push("Notification_Warning")
                iconName = "alert"
                break;
                case "error":
                    classesContent.push("Notification_Error")
                    iconName = "alert"
                    break;
                case "success":
                    classesContent.push("Notification_Success")
                    iconName = "checkmark-circle-outline"
                    break;
            default:
                classesContent.push("Notification_Primary")
                iconName = "information-circle"
                break;
        }
        if(this.state.show){
            setTimeout(() => {
                this.props.cancelNotification()
            }, 3000)
        }

        return(
            <div className={classes.join(" ")}>
                <div className={classesContent.join(" ")}>
                    <p>{this.state.data.content}</p>
                    <p><ion-icon name={iconName}></ion-icon></p>
                </div>
            </div>
        )
    }
}

const actionsMappedToProps = dispatch => {
    return {
        cancelNotification: () => dispatch(actionTypes.cancelNotification())
    }
}

export default connect(null, actionsMappedToProps) (Notification)