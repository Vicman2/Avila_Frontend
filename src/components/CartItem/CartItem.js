import React from 'react'
import './CartItem.css'


const CartItem = (props) => {
    return(
        <div className="CartItem">
            <div className="CartItem_ImgName">
                <div className="CartItem_Image">
                    <img className="contain_img" src={props.prodImage} alt={props.name} />
                </div>
                <p className="CartItem_name">{props.name}</p>
            </div>
            <div className="CartItem_Counter">
                <p onClick={props.decreaseQuantity}><ion-icon name="remove"></ion-icon></p>
                <p>{props.qty} </p>
                <p onClick={props.increaseQuantity}><ion-icon name="add"></ion-icon></p>
               
            </div>
            <p className="CartItem_Delete" onClick={props.deleteItem}><ion-icon name="trash"></ion-icon></p>
            <p className="CartItem_Price">{props.price * props.qty}</p>
        </div>
    )
}

export default CartItem