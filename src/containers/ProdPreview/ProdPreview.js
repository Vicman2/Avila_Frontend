import React, {Component} from 'react'
import './ProdPreview.css'
import Loader from '../../components/UI/Loader/Loader'
import Axios from '../../axios'
import Aux from '../../HOC/Aux/Aux'


class ProdPreview extends Component{
    state= {
        product :null
    }
    componentDidMount(){
        let {id} = this.props.match.params
        Axios.get(`/products/getProduct/${id}`)
        .then(res => {
            this.setState({product: res.data.data})
        })
    }
    render(){
        console.log(this.state.product)
        let display= <div className="Product_Loader">
            <Loader />
        </div> 
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
                <p className="ProdPreview_Desc_Title">Description</p>
                <p className="ProdPreview_Description">{details} </p>
            </Aux>
        }
        return(
            <div className="ProdPreview contain">
                {display}
            </div>
        )
    }
}


export default ProdPreview