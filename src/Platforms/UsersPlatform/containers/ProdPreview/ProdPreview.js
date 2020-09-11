import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import * as uiActions from '../../../../store/actions/UIActions'
import './ProdPreview.css'
import Loader from '../../../../Platforms/UsersPlatform/components/UI/Loader/Loader'
import Axios from '../../../../axios'
import Aux from '../../../../HOC/Aux/Aux'
import Button from '../../../../Platforms/UsersPlatform/components/UI/Button/Button'
import RelatedProducts from '../RelatedProducts/RelatedProducts'
import { getInLocalStorage } from '../../../../utility'


class ProdPreview extends Component{
    state= {
        product :null,
        loading:true
    }
    componentDidMount(){
        let {id} = this.props.match.params
        this.fetchData(id)
        this.props.showFooter()
    }
    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.fetchData(this.props.match.params.id)
        }
    }
    fetchData = (id) => {
        Axios.get(`/api/products/getProduct/${id}`)
        .then(res => {
            window.scrollTo(0,0)
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
                this.props.history.push('/cart')
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
    }
    render(){
        let display=null
        if(this.state.loading){
            display =  <div className="Product_Loader">
                <Loader />
            </div> 
        }
        if(this.state.product){
            const {prodImageSrc, name,price, details, _id} = this.state.product
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
                    <Button name="ADD TO CART" clicked ={() =>this.addToCart(_id)} />
                </div>
                
                <p className="ProdPreview_Desc_Title">Description</p>
                <p className="ProdPreview_Description">{details} </p>
            </Aux>
        }
        return(
            <div className="ProdPreview contain">
                {display}
                <RelatedProducts showTitle />
            </div>
        )
    }
}
const stateMappedToProps = state => {
    return{
        isLoggedIn : state.users.isLoggedIn
    }
}

const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload)), 
        showFooter : () => dispatch(uiActions.showFooter())
    }
}
export default compose(
    connect(stateMappedToProps, actionMappedToProps)
) (ProdPreview)