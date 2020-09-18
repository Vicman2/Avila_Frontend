import React, {Component} from 'react'
import { connect } from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as uiActions from '../../../../store/actions/UIActions'
import './RelatedProducts.css'
import Axios from '../../../../axios'
import { withRouter } from 'react-router-dom'
import Aux from '../../../../HOC/Aux/Aux'
import LoaderWrapper from '../../../AdminPlatform/Components/UI/LoaderWrapper/LoaderWrapper'



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
    preview = (id) => {
        this.props.history.push(`/products/${id}`)
    }
    render(){
        let toDisplay = null
        let title = null;
        if(this.props.showTitle) {
            title = <p className="RelatedProducts_title">RelatedProducts</p>
        }
        if(this.state.products){
            toDisplay = this.state.products.map(rProd => {
                return(
                    <div key={rProd._id} className="Popular_Products" onClick={() => this.preview(rProd._id)}>
                        <img className="contain_img" src={rProd.prodImageSrc} alt=""/>
                    </div>
                )
            })
        }
        let totalDisplay = <LoaderWrapper />
        if(this.state.products){
                totalDisplay = <Aux>
                {title}
                <div className="RelatedProducts">
                    {toDisplay}
                </div>
            </Aux>
        }
        return(
            <Aux>
                {totalDisplay}
            </Aux>
        )
    }
}

const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload))
    }
}
export default compose(
    withRouter,
    connect(null, actionMappedToProps)
) (RelatedProducts)