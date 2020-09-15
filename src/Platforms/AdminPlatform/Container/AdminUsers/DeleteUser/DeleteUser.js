import React, {Component} from 'react'
import './DeleteUser.css'
import Modal from '../../UI/Modal/Modal'
import Axios from '../../../../../axios'
import { getInLocalStorage } from '../../../../../utility'
import * as uiActions from '../../../../../store/actions/UIActions'
import { flowRight } from 'lodash'
import { connect } from 'react-redux'

class DeleteUser extends Component{
    state= {
        loading: false
    }

    deleteUserHandler = async (event) => {
        event.preventDefault();
        await this.setState({loading: true})
        Axios.delete(`/api/users/delete/${this.props.data._id}`,{
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        } )
        .then(res => {
            console.log(res.data)
            this.setState({loading: false})
            this.props.notify({
                status: 'success', 
                content: res.data.message
            })
            this.props.handleModal()
            this.props.fetchUsers()
        }).catch(err=> {
            this.setState({loading: false})
            if(err.response){
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    render(){
        return(
            <Modal
            loading={this.state.loading}
            show={this.props.show}
            actionName="Are you  sure you want to delete the account"
            cancel={this.props.handleModal}
            confirm={this.deleteUserHandler}
            >
            </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      notify: (payload)=> dispatch(uiActions.promptNotification(payload)),
    }
}



export default flowRight(
    connect(null, mapDispatchToProps)
) (DeleteUser)


