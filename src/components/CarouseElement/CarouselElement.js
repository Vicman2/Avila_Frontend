import React, {Component} from 'react'
import './CarouselElement.css'



const CarouselElement = (props) => {
    return(
        <div className="CarouselElement">
            <img className="contain_img" src={props.src} alt="Prod1" />
        </div>
    )
}

export default CarouselElement