import React from 'react'
import Checkbox from '../Inputs/CheckBox/CheckBox'
import EditComp from '../UI/EditComp/EditComp'
import DeleteComp from '../UI/DeleteComp/DeleteComp'
import './SingleProduct.css'


const SingleProduct = (props) => {
    return(
        <div className="SingleProduct">
            {/* <div className="SingleProduct_Checkbox">
                <Checkbox 
                name={props.fieldName}
                value={props.fieldValue}
                />
            </div>   */}
            <div className="SingleProduct_Contents" onClick={props.readProductHandler}>
                <div className="SingleProductImage">
                    <img className="contain_img" src={props.src} alt={props.name} />
                </div>
                <p className="SingleProduct_Name">{props.name} </p>
                <p className="SingleProduct_Price">{props.price} </p>
                <p className="SingleProduct_Description">{props.description} </p>
            </div>
            <div className="SingleProduct_Edit">
                <EditComp clicked={props.editUserHandler} />
            </div>
            <div className="SingleProduct_Delete" >
                <DeleteComp  clicked={props.deleteProductHandler}/>
            </div>
        </div>
    )
}



export default SingleProduct