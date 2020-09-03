import React, {Component} from 'react'
import {flowRight as compose, isInteger} from 'lodash'
import {connect} from 'react-redux'
import * as uiActions from '../../store/actions/UIActions'
import * as userActions from '../../store/actions/userActions'
import Axios from '../../axios'
import axios from 'axios'
import './Products.css'
import Loader from '../../components/UI/Loader/Loader'
import Product from '../../components/Product/Product'
import { getInLocalStorage } from '../../utility'


class Products extends Component{
    state = {
        pageNo: 1, 
        noOfProducts: 16, 
        products: [], 
        totalProducts: null, 
        activePage:null, 
        loading: true,
        userFavourite : [],
        cart: []
    }
    componentDidMount(){
        this.fetchProducts(true)
    }
    fetchProducts= (scrollUp)=>{
        this.setState({loading: true})
        const productRequest = axios.get(`https://avila-backend.herokuapp.com/api/products/getProducts?pageNo=${this.state.pageNo}&noOfProducts=${this.state.noOfProducts}`)
        const userRequest = axios.get(`https://avila-backend.herokuapp.com/api/users/getUser`, {
            headers: {
                "x-access-token": getInLocalStorage("token")
            }
        })
        let fetchArray = [productRequest]
        if(getInLocalStorage("token")){
            fetchArray.push(userRequest)
        }
        axios.all(fetchArray)
        .then(axios.spread((...responses) => {
            this.setState({loading: false})
            const prodResponse = responses[0]
            const userResponse = responses[1]
            this.setState({
                products: prodResponse.data.data.requestedProduct,
                totalProducts:prodResponse.data.data.totalProducts,
                activePage:this.state.pageNo,
                loading:false, 
                userFavourite: userResponse ?  userResponse.data.data.favourites : [],
                cart: userResponse ? userResponse.data.data.cart: []
            })
            if(scrollUp){
                window.scrollTo(0,0)
            }
        } ))
        .catch(err => {
            console.log(err)
            this.setState({loading:false})
            this.props.notify({
                status: 'error', 
                content: "There was an error fetching products. Please refresh"
            })
            
        })
    }
    nexPage = async ()=>{
        let  numberOfPages = this.state.totalProducts/this.state.noOfProducts
        numberOfPages = isInteger(numberOfPages) ? numberOfPages : parseInt(numberOfPages) + 1
        if(this.state.activePage < numberOfPages){
            await this.setState((state) => {
                return {pageNo: state.pageNo + 1, activePage: state.activePage + 1}
            })
            this.fetchProducts(true)
            window.scrollTo(0,0)
        }  
    }
    prevPage = async()=> {
        let  numberOfPages = this.state.totalProducts/this.state.noOfProducts
        numberOfPages = isInteger(numberOfPages) ? numberOfPages : parseInt(numberOfPages) + 1
        if(this.state.activePage > 1){
            await this.setState((state) => {
                return {pageNo: state.pageNo - 1, activePage: state.activePage - 1}
            })
            this.fetchProducts(true)
        }
    }
    numPage = async(pageNo) => {
        await this.setState({pageNo , activePage: pageNo})
        this.fetchProducts(true)
    }
    clickedProduct = (id)=>{
        this.props.history.push(`/products/${id}`)
    }
    addToFavourties =(id)=>{
        if(!this.props.isLoggedIn){
            this.props.history.push('/account')
        }else{
            const token = getInLocalStorage("token")
            Axios.put(`/api/users/addFavourite/${id}`, {},{
                headers: {
                    "x-access-token": token
                }
            })
            .then(res => {
                this.fetchProducts(false)
                window.scrollTo(0,0)
                this.props.notify({
                    status: 'success',
                    content: res.data.message
                })
            }).catch(err => {
                this.setState({loading:false})
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
    removeFromFavourites = (id) => {
        const token = getInLocalStorage("token");
        Axios.delete(`/api/users/removeFavourite/${id}`,{
            headers: {
                "x-access-token": token
            }
        })
        .then(res => {
            this.fetchProducts(false)
            window.scrollTo(0,0)
            this.props.notify({
                status: 'success',
                content: res.data.message
            })
        })
        .catch(err => {
            this.setState({loading:false})
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
                this.fetchProducts(false)
            }).then(data => {
                if(this.state.cart.length> 0){
                    this.props.updateCart(this.state.cart.length)
                }
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
        let display = null
        if(this.state.loading && this.state.products.length === 0){
            display =<div className="Product_Loader">
                <Loader />
            </div>
        }else{
            display = this.state.products.map(prod => {
                let addedToFavouite = this.state.userFavourite.find(fav => fav === prod._id)
                let addedToCart = this.state.cart.find(cartItem => cartItem.product === prod._id)
                return(
                    <Product
                    clicked={()=>this.clickedProduct(prod._id)}
                    key={prod._id}
                    src={prod.prodImageSrc}
                    name={prod.name}
                    price={prod.price}
                    addFavourite= {()=>this.addToFavourties(prod._id)}
                    removeFavourite = {() => this.removeFromFavourites(prod._id)}
                    favourites={addedToFavouite}
                    addToCart ={() => this.addToCart(prod._id)}
                    addedToCart = {addedToCart}
                    />
                )
            })
        }
        let pagination = <div></div>
        if(this.state.totalProducts){
            let  numberOfPages = this.state.totalProducts/this.state.noOfProducts
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
        return(
            <div className="Products">
                <div className="Product_Title_Cont">
                    <p className="Products_Title">PRODUCTS</p>
                </div>
                <div className="Products_List contain">
                    {display}
                </div>
                <div className="Products_Pagination">
                    {pagination}
                </div>
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
    connect(stateMappedToProps, actionMappedToProps)
) (Products)