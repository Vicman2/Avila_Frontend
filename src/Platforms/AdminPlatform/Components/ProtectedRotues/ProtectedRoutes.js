import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getInLocalStorage } from '../../../../utility'


const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={props => {
                const isAdmin = getInLocalStorage("isAdmin")
                if(isAdmin){
                    return <Component {...props} />
                }else{
                    return <Redirect to={{pathname: "/"}} />
                }
            }}
        />
    )

}

export default ProtectedRoute