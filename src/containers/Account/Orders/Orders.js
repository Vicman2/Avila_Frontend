import React, {Component} from 'react'
import Axios from '../../../axios'
import './Orders.css'
import { getInLocalStorage } from '../../../utility'
import Loader from '../../../components/UI/Loader/Loader'
import Order from '../../../components/Order/Order'


class Orders extends Component{
    state = {
        orderedProduct: [], 
        loading : true
    }
    componentDidMount(){
        Axios.get("/api/orders/getProds", {
            headers: {
                "x-access-token" :  getInLocalStorage("token")
            }
        })
        .then(({data}) => {
            console.log(data.data)
            this.setState({
                loading: false,
                orderedProduct: data.data
            })
        })
    }
    render(){
        let toDisplay = <Loader />
        if(!this.state.loading && this.state.orderedProduct.length > 0 ){
            toDisplay = this.state.orderedProduct.map(orderItem => {
                return(
                    <Order
                    key={orderItem._id}
                    src={orderItem.prodImageSrc}
                    name={orderItem.name}
                    price={orderItem.price}
                    />
                )
            })
        }
        return(
            <div className="Orders ">
                {toDisplay}
            </div>
        )
    }
}


export default Orders