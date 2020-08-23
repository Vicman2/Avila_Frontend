import React, {Component} from 'react'
import { connect } from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as uiActions from '../../store/actions/UIActions'
import './RelatedProducts.css'
import Axios from '../../axios'



class RelatedProducts extends Component{
    state={
        products :null
    }
    componentDidMount(){
        Axios.get(`/api/products/getProducts?pageNo=1&noOfProducts=4`)
        .then(res => {
            this.setState({
                products: res.data.data.requestedProduct,
            })
        }).catch(err => {
            this.props.notify({
                status: 'error', 
                content: "There was an error fetching products. Please refresh"
            })
            
        })
    }
    render(){
        let toDisplay = null
        if(this.state.products){
            toDisplay = this.state.products.map(rProd => {
                return(
                    <div className="Popular_Products">
                        <img className="contain_img" src={rProd.prodImageSrc} alt=""/>
                    </div>
                )
            })
        }
        return(
            <div className="RelatedProducts">
                {toDisplay}
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
) (RelatedProducts)