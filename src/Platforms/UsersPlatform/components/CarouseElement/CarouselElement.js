import React, {Component} from 'react'
import './CarouselElement.css'



const CarouselElement = (props) => {
    return(
        <div className="CarouselElement">
            <div className="CarouselElement_Img_contain">
                <img className="contain_img" src={props.src} alt="Prod1" />
            </div>
        </div>
    )
}

export default CarouselElement