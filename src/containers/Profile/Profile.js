import React, {Component} from 'react'
import './Profile.css'
import Axios from '../../axios'
import { getInLocalStorage } from '../../utility'
import Loader from '../../components/UI/Loader/Loader'
import Aux from '../../HOC/Aux/Aux'



class Profile extends Component{
    state = {
        edit: false, 
        userDetails : null
    }
    componentDidMount(){
        this.getProfile()
    }
    getProfile = () => {
        Axios.get('/api/users/getUser', {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then (res => {
            window.screenTop(0,0)
            this.setState({userDetails: res.data.data})
        })
    }
    render(){
        let toDisplayProfile = <div class="Profile_Loader">
            <Loader />
        </div>
        if(this.state.userDetails){
            let {name, email, phone, address, sex} = this.state.userDetails
            toDisplayProfile = <Aux>
                <p className="Account_Edit">Edit</p>
                <div className="Profile_KeyValue">
                    <p className="Profile_Key">Name</p>
                    <p className="Profile_Value">{name} </p>
                </div>
                <div className="Profile_KeyValue">
                    <p className="Profile_Key">Email</p>
                    <p className="Profile_Value">{email} </p>
                </div>
                <div className="Profile_KeyValue">
                    <p className="Profile_Key">Phone</p>
                    <p className="Profile_Value">{phone}</p>
                </div>
                <div className="Profile_KeyValue">
                    <p className="Profile_Key">Address</p>
                    <p className="Profile_Value">{address} </p>
                </div>
                <div className="Profile_KeyValue">
                    <p className="Profile_Key">Sex</p>
                    <p className="Profile_Value">{sex} </p>
                </div>
            </Aux>
        }
        
        return(
            <div className="Profile">
                <p className="Account_Info_Title">ACCOUNT INFORMATION</p>
                {toDisplayProfile}
            </div>
        )
    }
}

 
export default Profile