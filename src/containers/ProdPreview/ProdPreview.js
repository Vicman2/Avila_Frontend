import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as uiActions from '../../store/actions/UIActions'
import './ProdPreview.css'
import Loader from '../../components/UI/Loader/Loader'
import Axios from '../../axios'
import Aux from '../../HOC/Aux/Aux'
import Button from '../../components/UI/Button/Button'
import RelatedProducts from '../RelatedProducts/RelatedProducts'


class ProdPreview extends Component{
    state= {
        product :null,
        loading:true
    }
    componentDidMount(){
        let {id} = this.props.match.params
        window.scrollTo(0,0)
        Axios.get(`/api/products/getProduct/${id}`)
        .then(res => {
            this.setState({
                product: res.data.data, 
                loading: false
            })
        }).catch(err => {
            this.setState({loading:false})
            this.props.notify({
                status: 'error', 
                content: "There was an error fetching products. Please refresh"
            })
            
        })
    }
    render(){
        console.log(this.state.product)
        let display=null
        if(this.state.loading){
            display =  <div className="Product_Loader">
                <Loader />
            </div> 
        }
        if(this.state.product){
            const {prodImageSrc, name,price, details} = this.state.product
            display = <Aux>
                <div className="ProdPreview_Landing">
                    <div className="ProdPreview_Img">
                        <img className="contain_img" src={prodImageSrc} alt={name} />
                    </div>
                    <div className="ProdPreview_Titles">
                        <p className="ProdPreview_Name">{name} </p>
                        <p className="ProdPreview_Rating">
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                        </p>
                        <p className="ProdPreview_Highlight">Making your premium body fresher</p>
                        <p className="ProdPreview_Price">#{price.toLocaleString()} </p>
                        <p className="ProdPreview_Category">Category Skin care</p>
                    </div>
                </div>
                <div className="ProdPreview_AddToCart">
                    <Button name="ADD TO CART" />
                </div>
                
                <p className="ProdPreview_Desc_Title">Description</p>
                <p className="ProdPreview_Description">{details} </p>
            </Aux>
        }
        return(
            <div className="ProdPreview contain">
                {display}
                <RelatedProducts />
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
) (ProdPreview)