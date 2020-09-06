import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import Axios from '../../../axios'
import * as uiActions from '../../../store/actions/UIActions'
import * as userActions from '../../../store/actions/userActions'
import './Orders.css'
import { getInLocalStorage } from '../../../utility'
import Loader from '../../../components/UI/Loader/Loader'
import Order from '../../../components/Order/Order'
import { withRouter } from 'react-router-dom'


class Orders extends Component{
    state = {
        orderedProduct: [], 
        loading : true
    }
    componentDidMount(){
        this.getOrders(true)
    }
    getOrders = (scrollTo) => {
        if(scrollTo){
            window.scrollTo(0,0)
        }
        Axios.get("/api/orders/getProds", {
            headers: {
                "x-access-token" :  getInLocalStorage("token")
            }
        })
        .then(({data}) => {
            this.setState({
                loading: false,
                orderedProduct: data.data
            })
        }).catch(err => {
            if(err.response.data){
                console.log(err.response.data)
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    addToCart = (id) => {
        Axios.post(`/api/cart/add/${id}`, {}, {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(res => {
            this.props.notify({
                status: 'success',
                content: res.data.message
            })
            this.getOrders()
        })
        .catch(err => {
            if(err.response.data){
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    render(){
        let toDisplay = <div className="Loader_Contain">
            <Loader />
        </div> 
        if(!this.state.loading && this.state.orderedProduct.length > 0 ){
            toDisplay = this.state.orderedProduct.map(orderItem => {
                return(
                    <Order
                    key={orderItem._id}
                    src={orderItem.prodImageSrc}
                    name={orderItem.name}
                    price={orderItem.price}
                    reorder = {() => this.addToCart(orderItem._id)}
                    />
                )
            })
        }
        return(
            <div className="Orders ">
                {toDisplay}
            </div>
        )
    }
}

const stateMappedToProps = state => {
    return {
        isLoggedIn : state.users.isLoggedIn
    }
}

const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload)),
        updateCart : (num)=> dispatch(userActions.updateNoOfCart(num))
    }
}
export default compose(
    withRouter,
    connect(stateMappedToProps, actionMappedToProps)
) (Orders)