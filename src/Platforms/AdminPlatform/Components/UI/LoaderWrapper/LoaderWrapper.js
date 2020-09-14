import React from 'react'
import Loader from '../../../../UsersPlatform/components/UI/Loader/Loader'
import './LoaderWrapper.css'


const LoaderWrapper = (props )=> {
    return(
        <div className="LoaderWrapper">
            <Loader />
        </div>
    )
}


export default LoaderWrapper