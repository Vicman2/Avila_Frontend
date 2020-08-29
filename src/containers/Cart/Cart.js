import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import Axios from '../../axios'
import * as uiActions from '../../store/actions/UIActions'
import './Cart.css'
import { getInLocalStorage } from '../../utility'
import { withRouter } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import emptySVG from './Assets/emptyCart.svg'
import CartItem from '../../components/CartItem/CartItem'
import Button from '../../components/UI/Button/Button'
import Aux from '../../HOC/Aux/Aux'


class Cart extends Component{
    state =  {
        loading: true, 
        cartItems: [],
        totalPrice: null
    }
    componentDidMount(){
        this.getCart();
    }
    getCart = ()=>{
        
        Axios.get('/api/cart/get', {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(({data}) => {
            let arrayOfPrices = data.data.map(prod => {
                return prod.quantity * prod.product.price
            })
            let arrayPrice = arrayOfPrices.reduce((a, b) => a + b)
            this.setState({
                loading: false, 
                cartItems: data.data, 
                totalPrice: arrayPrice
            })
        }).catch(err => {
            this.setState({loading:false})
            if(err.response && err.response.data){
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    increaseQuantity= (id) => {
        Axios.put(`/api/cart/inc/${id}`, {}, {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(({data}) => {
            this.getCart()
        }).catch(err => {
            this.setState({loading:false})
            if(err.response && err.response.data){
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    decreaseQuantity = (id) => {
        Axios.put(`/api/cart/dec/${id}`, {}, {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(({data}) => {
            this.getCart()
        }).catch(err => {
            this.setState({loading:false})
            if(err.response && err.response.data){
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    deleteItem = (id) => {
        Axios.delete(`/api/cart/remove/${id}`, {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(({data}) => {
            this.getCart();
            this.props.notify({
                status: 'primary', 
                content: data.message
            })
        }).catch(err => {
            if(err.response && err.response.data){
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    render(){
        let toRender = <Loader />
        if(!this.state.loading && this.state.cartItems.length === 0){
            toRender = <div className="EmptyFav">
                <div className="SavedItem_Empty">
                    <img className="contain_img" src={emptySVG} alt="empty" />
                </div>
                <Button name="CONTINUE SHOPPING"  clicked={() => this.props.history.push('/products')}/>
            </div>
        }else if(!this.state.loading && this.state.cartItems.length >0){
            toRender = this.state.cartItems.map(cartItem => {
                return(
                    <CartItem
                    key={cartItem._id}
                    prodImage={cartItem.product.prodImageSrc}
                    name={cartItem.product.name}
                    qty={cartItem.quantity}
                    price={cartItem.product.price}
                    increaseQuantity={() => this.increaseQuantity(cartItem.product._id)}
                    decreaseQuantity = {() => this.decreaseQuantity(cartItem.product._id)}
                    deleteItem = {() => this.deleteItem(cartItem.product._id)}
                    />
                )
            })
        }
        let toDisplay= null ;
        if(this.state.totalPrice){
            toDisplay = <Aux>
                <div className="Cart_Total_Price">
                    <div className="Cart_Total">
                        <p className="Total_Title">Total</p>
                        <p className="Total_Price">#{this.state.totalPrice.toLocaleString()}</p>
                    </div>
                </div>
                <div className="Cart_ChoiceButton">
                    <div className="CartChoice">
                        <Button name="PROCEED TO CHECKOUT"  />
                        <Button name="CANCEL PURCHASE"/>
                    </div>
                </div>
            </Aux>
        }
        return(
            <div className="Cart contain">
                <p className="Cart_Title">My Cart</p>
                <div className="Cart_Listing">
                    {toRender}
                </div>
                {toDisplay}
            </div>
        )
    }
}

const propsMappedToState= state => {
    return{
        isLoggedIn: state.users.isLoggedIn,
        onAuthComp : state.ui.unAuthComponent
    }
}

const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload))
    }
}
export default compose(
    withRouter,
    connect(propsMappedToState, actionMappedToProps)
) (Cart)