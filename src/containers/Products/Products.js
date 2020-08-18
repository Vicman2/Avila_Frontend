import React, {Component} from 'react'
import {flowRight as compose} from 'lodash'
import {connect} from 'react-redux'
import * as uiActions from '../../store/actions/UIActions'
import Axios from '../../axios'
import './Products.css'
import Loader from '../../components/UI/Loader/Loader'
import Product from '../../components/Product/Product'


class Products extends Component{
    state = {
        pageNo: 1, 
        noOfProducts: 15, 
        products: []
    }
    componentDidMount(){
        Axios.get(`/products/getProducts?pageNo=${this.state.pageNo}&noOfProducts=${this.state.noOfProducts}`)
        .then(res => {
            this.setState({products: res.data.data.requestedProduct})
        }).catch(err => {
            this.setState({})
            this.props.notify({
                status: 'error', 
                content: "There was an error fetching products. Please refresh"
            })
        })
    }
    render(){
        let display = null
        if(this.state.products.length === 0){
            display =<div className="Product_Loader">
                <Loader />
            </div>
        }else{
            display = this.state.products.map(prod => {
                return(
                    <Product 
                    src={prod.prodImageSrc}
                    name={prod.name}
                    price={prod.price}
                    />
                )
            })
        }
        return(
            <div className="Products">
                <div className="Product_Title_Cont">
                    <p className="Products_Title">PRODUCTS</p>
                </div>
                <div className="Products_List contain">
                    {display}
                </div>
            </div>
        )
    }
}



const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload))
    }
}

export default compose(
    connect(null, actionMappedToProps)
) (Products)