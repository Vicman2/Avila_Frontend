import React, {Component} from 'react'
import Button from '../../../UsersPlatform/components/UI/Button/Button'
import Axios from '../../../../axios'
import './AdminUsers.css'
import { getInLocalStorage } from '../../../../utility'
import {flowRight as compose, isInteger} from 'lodash'
import * as userActions from '../../../../store/actions/userActions'
import * as uiActions from '../../../../store/actions/UIActions'

import { connect } from 'react-redux'
import LoaderWrapper from '../../Components/UI/LoaderWrapper/LoaderWrapper'
import SingleUser from '../../Components/SingleUser/SingleUser'
import Aux from '../../../../HOC/Aux/Aux'
import AddUser from './AddUser/AddUser'
import EditUser from './EditUser/EditUser'
import ReadUser from './ReadUser/ReadUser'
import DeleteUser from './DeleteUser/DeleteUser'


class AdminUsers extends Component{
    state = {
        loading : false,
        activePage: 1,
        pageNo: 1, 
        noOfUsers: 20,
        users :[], 
        totalUsers: null, 
        addUser: false, 
        editUser: false, 
        deleteUser: false, 
        readUser: false, 
        userToPerformAction: null
    }
    clickedAdd = () => {
        this.setState((prevstate) => {
            return{
                addUser:!prevstate.addUser
            }
        })
    }
    clickedEdit = (id) => {
        const user = this.state.users.find(user => user._id == id)
        this.setState((prevstate) => {
            return{
                editUser:!prevstate.editUser,
                userToPerformAction: user
            }
        })
    }
    clickedDelete = (id) => {
        const user = this.state.users.find(user => user._id == id)
        this.setState((prevstate) => {
            return{
                deleteUser:!prevstate.deleteUser,
                userToPerformAction: user
            }
        })
    }
    clickedRead = (id) => {
        const user = this.state.users.find(user => user._id == id)
        this.setState((prevstate) => {
            return{
                readUser:!prevstate.readUser,
                userToPerformAction: user
            }
        })
    }
    nexPage = async ()=>{
        let  numberOfPages = this.state.totalUsers/this.state.noOfUsers
        numberOfPages = isInteger(numberOfPages) ? numberOfPages : parseInt(numberOfPages) + 1
        if(this.state.activePage < numberOfPages){
            await this.setState((state) => {
                return {pageNo: state.pageNo + 1, activePage: state.activePage + 1}
            })
            this.getUsers(true)
        }  
    }
    prevPage = async()=> {
        let  numberOfPages = this.state.totalUsers/this.state.noOfUsers
        numberOfPages = isInteger(numberOfPages) ? numberOfPages : parseInt(numberOfPages) + 1
        if(this.state.activePage > 1){
            await this.setState((state) => {
                return {pageNo: state.pageNo - 1, activePage: state.activePage - 1}
            })
            this.getUsers(true)
        }
    }
    numPage = async(pageNo) => {
        await this.setState({pageNo , activePage: pageNo})
        this.getUsers(true)
    }


    componentDidMount(){
       this.getUsers(true)
    }
    getUsers = (scrollUp) => {
        let {pageNo, noOfUsers} = this.state
        this.setState({loading:true})
        Axios.get(`/api/users/many?pageNo=${pageNo}&noOfUsers=${noOfUsers}`, {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(({data})=> {
            const {requestedUsers, totalUsers} = data.data
            this.setState({users: requestedUsers, totalUsers: totalUsers, loading: false})
            if(scrollUp){
                window.scrollTo(0,0)
            }
        }).catch(err => {
            this.setState({loading:false})
            if(err.response){
                this.props.notify({
                    status: "error", 
                    content: err.response.message
                })
            }
        })
    }
   
    render(){
        const {users, loading} = this.state
        const style = {
            greenButton: {
                backgroundColor: "#38BE6E"
            }, 
            redButton: {
                backgroundColor: "#F02929"
            }
        }
        let usersToDisplay = <LoaderWrapper />
        if(users.length > 0 && !loading){
            usersToDisplay = users.map(user => {
                return(
                    <SingleUser
                    key={user._id}
                    fieldName="Users"
                    fieldValue="noDelete"
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    address={user.address}
                    gender={user.sex}
                    editUserHandler={() =>this.clickedEdit(user._id)}
                    readUserHandler= {() => this.clickedRead(user._id)}
                    deleteUserHandler= {() => this.clickedDelete(user._id)}
                    />
                )
            })
        }
        let pagination = <div></div>
        if(this.state.totalUsers && !loading){
            let  numberOfPages = this.state.totalUsers/this.state.noOfUsers
            numberOfPages = isInteger(numberOfPages) ? numberOfPages : parseInt(numberOfPages) + 1
            let arrayPage = []
            for(let i = 1; i<= numberOfPages; i++){
                arrayPage.push(i)
            }
            arrayPage = arrayPage.map(page => {
                let classes = ["Product_newPage"];
                if(page === this.state.activePage){
                    classes.push("Prod_Active_Page");
                }
                return(
                    <div 
                    key={page}
                    onClick={() =>this.numPage(page)}
                    className={classes.join(" ")}>
                        {page}
                    </div>
                )
            })
            const prevLink= ["Product_newPage"];
            if(this.state.activePage && this.state.activePage === 1){
                prevLink.push("Deactive_Nav");
            }
            const nextLink = ["Product_newPage"];
            if(this.state.activePage && this.state.activePage === numberOfPages){
                nextLink.push("Deactive_Nav");
            }
            pagination =<div className="Pagin_Section">
                <p onClick={this.prevPage} className={prevLink.join(" ")}>Prev</p>
                <div className="Page_Numeration">{arrayPage} </div>
                <p onClick={this.nexPage} className={nextLink.join(" ")}>Next</p>
            </div>
        }
        let actionComponent = null
        if(this.state.userToPerformAction){
            actionComponent =<Aux>
                <EditUser
                fetchUsers={() =>this.getUsers(true)}
                handleModal={this.clickedEdit}
                show={this.state.editUser}
                data={this.state.userToPerformAction}
               />
                <ReadUser
                fetchUsers={() =>this.getUsers(true)}
                handleModal={this.clickedRead}
                show={this.state.readUser}
                data={this.state.userToPerformAction}
                />
                <DeleteUser
                fetchUsers={() =>this.getUsers(true)}
                handleModal={this.clickedDelete}
                show={this.state.deleteUser}
                data={this.state.userToPerformAction}
                />
            </Aux>
            
        }
        return(
            <Aux>
                {actionComponent}
                <AddUser
                fetchUsers={() =>this.getUsers(true)}
                handleModal= {this.clickedAdd}
                show={this.state.addUser}
                />
                
                <div className="AdminUsers">
                    <div className="AdminUser_ActionButtons_Container">
                        <div className="AdminUser_BtnWrapper">
                            <div className="AdminUser_ActionButtons">
                                <Button name="Create User" clicked={this.clickedAdd}  style={style.greenButton}/>
                            </div>
                            {/* <div className="AdminUser_ActionButtons">
                                <Button name="Delete User"  style={style.redButton}/>
                            </div> */}
                        </div>
                    </div>
                    <div className="AdminUser_Listing">
                        {usersToDisplay}
                    </div>
                    <div className="Products_Pagination">
                        {pagination}
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