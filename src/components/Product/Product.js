import React from 'react'
import './Product.css'
import Button from '../UI/Button/Button'
import { withRouter } from 'react-router-dom'



const Product = (props) =>{
    let favIcon = <ion-icon name="heart-outline" onClick={props.addFavourite}></ion-icon>
    if(props.favourites){
        favIcon = <ion-icon name="heart" onClick={props.removeFavourite}></ion-icon>
    }
    return(
        <div className="Product">
            <div className="ProdImage_Cont" onClick={props.clicked}>
                <img className="contain_img" src={props.src}  alt={props.name}/>
            </div>
            <div className="ProdContain_Detials">
                <div className="NamePrice">
                    <p className="Product_Name" onClick={props.clicked}>{props.name} </p>
                    <p className="Product_Price">#{props.price.toLocaleString()} </p>
                </div>
                <div className="Product_Favourite">
                    {favIcon}
                </div>
            </div>
            <div className="Product_Buy_Btn">
                <Button name="Buy Now" />
            </div>
        </div>
    )
}


export default  withRouter(Product) 