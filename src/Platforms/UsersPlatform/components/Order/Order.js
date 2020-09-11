import React from 'react'
import './Order.css'


const Order = (props) => {
    return(
        <div className="Order">
            <div className="Order_Image_Cont">
                <img className="contain_img" src={props.src} alt={props.name} />
            </div>
            <p className="Order_ProdName">{props.name}</p>
            <div className="Order_Price_Reorder">
                <p className="Order_ProdPrice">#{props.price.toLocaleString()} </p>
                <p className="Order_Reorder" onClick={props.reorder}>Reorder</p>
            </div>
        </div>
    )
}

export default Order