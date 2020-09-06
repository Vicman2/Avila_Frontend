import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import Axios from '../../../axios'
import * as uiActions from '../../../store/actions/UIActions'
import * as userActions from '../../../store/actions/userActions'
import './SavedItem.css'
import { getInLocalStorage } from '../../../utility'
import Loader from '../../../components/UI/Loader/Loader'
import Product from '../../../components/Product/Product'
import emptySVG from './Assets/emptyFavourite.svg'
import { withRouter } from 'react-router-dom'
import Button from '../../../components/UI/Button/Button'


class SavedItem extends Component{
    state = {
        loading: true, 
        favourites: [],
        cart:[]
    }
    componentDidMount(){
        this.fetchFavourites(true)
    }
    fetchFavourites = (scrollTop)=>{
        if(scrollTop)(
            window.scrollTo(0,0)
        )
        const token = getInLocalStorage('token');
        Axios.get('/api/users/getFavourites', {
            headers: {
                "x-access-token": token
            }
        }).then(res => {
           this.setState({favourites : res.data.data, loading: false})
           this.getCart()
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
    removeFromFavourites = (id) => {
        const token = getInLocalStorage("token");
        Axios.delete(`/api/users/removeFavourite/${id}`,{
            headers: {
                "x-access-token": token
            }
        })
        .then(res => {
            this.fetchFavourites()
            this.props.notify({
                status: 'success',
                content: res.data.message
            })
        }).catch(err => {
            this.setState({loading:false})
            if(err.response.data){
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    
    getCart = ()=>{
        Axios.get('/api/cart/get', {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        }).then(({data}) => {
            console.log(data.data)
            this.setState({
                cart: data.data
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

    addToCart = (id) => {
        if(!this.props.isLoggedIn){
            this.props.history.push('/account')
        }else{
            Axios.post(`/api/cart/add/${id}`, {}, {
                headers: {
                    "x-access-token": getInLocalStorage("token")
                }
            }).then(res => {
                this.props.notify({
                    status: 'success',
                    content: res.data.message
                })
                this.fetchFavourites()
                this.getCart()
            
            }).then(()=> {
                this.props.updateCart(this.state.cart.length)
            })
            .catch(err => {
                if(err.response.data){
                    console.log(err.response.data)
                    this.props.notify({
                        status: 'error', 
                        content: err.response.data.message
                    })
                }
            })
        }
    }
    render(){
        let toDisplay = <div className="Loader_Contain">
            <Loader />
        </div> 
        if(this.state.favourites.length> 0){
            toDisplay = this.state.favourites.map(fav => {
                let isInCart 
                if(this.state.cart.length > 0){
                    isInCart = this.state.cart.find(cartItem => cartItem.product._id === fav._id)
                }
                return(
                    <div  key={fav._id} className="OneSaved">
                        <Product
                        clicked={()=>this.clickedProduct(fav._id)}
                        src={fav.prodImageSrc}
                        name={fav.name}
                        price={fav.price}
                        removeFavourite = {() => this.removeFromFavourites(fav._id)}
                        addToCart = {() => this.addToCart(fav._id)}
                        addedToCart = {isInCart}
                        favourites
                        />
                    </div>
                )
            })
        }else if(!this.state.loading && this.state.favourites.length === 0){
            toDisplay =<div className="EmptyFav">
                <div className="SavedItem_Empty">
                    <img className="contain_img" src={emptySVG} alt="empty" />
                </div>
                <Button name="CONTINUE SHOPPING" clicked={() => this.props.history.push('/products')} />
            </div>
        }   
        return(
            <div className="SavedItem">
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
) (SavedItem)

