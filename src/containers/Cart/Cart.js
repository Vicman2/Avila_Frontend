import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import Axios from '../../axios'
import * as uiActions from '../../store/actions/UIActions'
import * as userActions from '../../store/actions/userActions'
import './Cart.css'
import { getInLocalStorage } from '../../utility'
import { withRouter } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import emptySVG from './Assets/emptyCart.svg'
import CartItem from '../../components/CartItem/CartItem'
import Button from '../../components/UI/Button/Button'
import Aux from '../../HOC/Aux/Aux'
import Rave, {RequeryTransaction} from 'react-flutterwave-rave'


class Cart extends Component{
    state =  {
        loading: true, 
        cartItems: [],
        totalPrice: null, 
        userDetails: null, 
        toCheckout: false, 
        public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
        secret_key: process.env.REACT_APP_FLUTTERWAVE_SECRET_KEY
    }
    componentDidMount(){
        window.scrollTo(0,0)
        this.getCart();
        this.getUser();
    }
    getCart = (scrollUp)=>{
        Axios.get('/api/cart/get', {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(({data}) => {
            let arrayOfPrices, arrayPrice
            if(data.data.length >0){
                this.props.updateCart(data.data.length)
                arrayOfPrices = data.data.map(prod => {
                    return prod.quantity * prod.product.price
                })
                arrayPrice = arrayOfPrices.reduce((a, b) => a + b)
            }else{
                this.props.updateCart(null)
            }
            this.setState({
                loading: false, 
                cartItems: data.data, 
                totalPrice: arrayPrice
            })
            if(scrollUp){
                window.scrollTo(0,0)
            }
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
    getUser = () => {
        let token = getInLocalStorage("token")
        if(token){
            Axios.get('/api/users/getUser', {
                headers: {
                    "x-access-token": token
                }
            }).then(({data}) => {
                const {email, phone, name} = data.data
                this.setState({
                    userDetails: {email, phone, name}
                })
            }).catch((err) => {
                console.log(err)
            })
        }
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

    paymentCallback = async  (response) => {
        await Axios.post('/api/orders/make',{}, {
            headers: getInLocalStorage("token")
        }).then(res => {
            console.log(res)
            this.props.history.push('/products');
            this.props.notify({
                status: 'success',
                content: "Order created successfully"
            })
        }).catch(err => {
            console.log(err)
        })
    }
    paymentOnClose = () => {
        this.props.history.push('/cart');
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
        let paymentButton = null; 
        if(this.state.userDetails){
            paymentButton = <div className="Button">
                <Rave
                pay_button_text="Make payments"
                payment_method="card"
                customer_email={this.state.userDetails.email}
                customer_phone={this.state.userDetails.phone}
                amount={"" + this.state.totalPrice + ""}
                ravePubKey={this.state.public_key}
                callback={this.paymentCallback}
                onclose={this.paymentOnClose}
                />
            </div>
            
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
                        <Button name="CANCEL PURCHASE" clicked={() => this.props.history.push('/products')}/>
                        {paymentButton}
                    </div>
                </div>
            </Aux>
        }
        let totalRender = <Aux>
            <p className="Cart_Title">My Cart</p>
                <div className="Cart_Listing">
                    {toRender}
                </div>
                {toDisplay}
        </Aux>
        return(
            <div className="Cart contain">
                {totalRender}
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
        notify: (payload)=>dispatch(uiActions.promptNotification(payload)), 
        updateCart : (num)=> dispatch(userActions.updateNoOfCart(num))
    }
}
export default compose(
    withRouter,
    connect(propsMappedToState, actionMappedToProps)
) (Cart)