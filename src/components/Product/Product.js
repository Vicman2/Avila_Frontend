import React from 'react'
import './Product.css'
import Button from '../UI/Button/Button'
import { withRouter } from 'react-router-dom'



const Product = (props) =>{
    return(
        <div className="Product" onClick={props.clicked}>
            <div className="ProdImage_Cont">
                <img className="contain_img" src={props.src}  alt={props.name}/>
            </div>
            <div className="ProdContain_Detials">
                <div className="NamePrice">
                    <p className="Product_Name">{props.name} </p>
                    <p className="Product_Price">#{props.price.toLocaleString()} </p>
                </div>
                <div className="Product_Favourite">
                    <ion-icon name="heart-outline"></ion-icon>
                </div>
            </div>
            <div className="Product_Buy_Btn">
                <Button name="Buy Now" />
            </div>
        </div>
    )
}


export default  withRouter(Product) 