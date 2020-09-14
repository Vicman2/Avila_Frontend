import React, {Component} from 'react'
import Button from '../../../UsersPlatform/components/UI/Button/Button'
import Axios from '../../../../axios'
import './AdminUsers.css'
import { getInLocalStorage } from '../../../../utility'
import {flowRight as compose} from 'lodash'
import * as userActions from '../../../../store/actions/userActions'
import * as uiActions from '../../../../store/actions/UIActions'

import { connect } from 'react-redux'
import LoaderWrapper from '../../Components/UI/LoaderWrapper/LoaderWrapper'
import SingleUser from '../../Components/SingleUser/SingleUser'
import Aux from '../../../../HOC/Aux/Aux'
import AddUser from './AddUser/AddUser'


class AdminUsers extends Component{
    state = {
        pageNo: 1, 
        noOfUsers: 10,
        users :[], 
        totalUsers: null, 
        addUser: false, 
        editUser: false, 
        deleteUser: false, 
        readUser: false
    }
    clickedAdd = () => {
        this.setState((prevstate) => {
            return{
                addUser:!prevstate.addUser
            }
        })
    }
    clickedEdit = () => {
        this.setState((prevstate) => {
            return{
                editUser:!prevstate.editUser
            }
        })
    }
    clickedDelete = () => {
        this.setState((prevstate) => {
            return{
                deleteUser:!prevstate.deleteUser
            }
        })
    }
    clickedRead = () => {
        this.setState((prevstate) => {
            return{
                readUser:!prevstate.readUser
            }
        })
    }


    componentDidMount(){
        let {pageNo, noOfUsers} = this.state
        Axios.get(`/api/users/many?pageNo=${pageNo}&noOfUsers=${noOfUsers}`, {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(({data})=> {
            const {requestedUsers, totalUsers} = data.data
            console.log(requestedUsers)
            this.setState({users: requestedUsers, totalUsers: totalUsers})
        }).catch(err => {
            if(err.response){
                this.props.notify({
                    status: "error", 
                    content: err.response.message
                })
            }
        })
    }
   
    render(){
        console.log(this.state.addUser)
        const {users} = this.state
        const style = {
            greenButton: {
                backgroundColor: "#38BE6E"
            }, 
            redButton: {
                backgroundColor: "#F02929"
            }
        }
        let usersToDisplay = <LoaderWrapper />
        if(users.length > 0){
            usersToDisplay = users.map(user => {
                return(
                    <SingleUser
                    key={user._id}
                    fieldName="Users"
                    filedValue="noDelete"
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    address={user.address}
                    />
                )
            })
        }
        return(
            <Aux>
                <AddUser
                handleModal= {this.clickedAdd}
                show={this.state.addUser}
                />
                <div className="AdminUsers">
                    <div className="AdminUser_ActionButtons_Container">
                        <div className="AdminUser_BtnWrapper">
                            <div className="AdminUser_ActionButtons">
                                <Button name="Create User" clicked={this.clickedAdd}  style={style.greenButton}/>
                            </div>
                            <div className="AdminUser_ActionButtons">
                                <Button name="Delete User"  style={style.redButton}/>
                            </div>
                        </div>
                    </div>
                    <div className="AdminUser_Listing">
                        {usersToDisplay}
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      notify: (payload)=> dispatch(uiActions.promptNotification(payload)),
    }
}



export default compose(
    connect(null, mapDispatchToProps)
) (AdminUsers)