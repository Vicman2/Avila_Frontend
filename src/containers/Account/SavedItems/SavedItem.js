import React, {Component} from 'react'
import {connect} from 'react-redux'
import {flowRight as compose} from 'lodash'
import Axios from '../../../axios'
import * as uiActions from '../../../store/actions/UIActions'
import './SavedItem.css'
import { getInLocalStorage } from '../../../utility'
import Loader from '../../../components/UI/Loader/Loader'
import Product from '../../../components/Product/Product'


class SavedItem extends Component{
    state = {
        loading: false, 
        favourites: []
    }
    componentDidMount(){
        this.fetchFavourites()
    }
    fetchFavourites = ()=>{
        window.scrollTo(0,0)
        const token = getInLocalStorage('token');
        Axios.get('/api/users/getFavourites', {
            headers: {
                "x-access-token": token
            }
        }).then(res => {
           this.setState({favourites : res.data.data})
        }).catch(err => {
            if(err.response.data){
                console.log(err.response.data)
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    removeFromFavourites = (id) => {
        const token = getInLocalStorage("token");
        Axios.delete(`/api/users/removeFavourite/${id}`,{
            headers: {
                "x-access-token": token
            }
        })
        .then(res => {
            this.fetchFavourites()
            this.props.notify({
                status: 'success',
                content: res.data.message
            })
        }).catch(err => {
            this.setState({loading:false})
            if(err.response.data){
                this.props.notify({
                    status: 'error', 
                    content: err.response.data.message
                })
            }
        })
    }
    render(){
        let toDisplay = <div className="Loader_Contain">
            <Loader />
        </div> 
        if(this.state.favourites.length> 0){
            toDisplay = this.state.favourites.map(fav => {
                return(
                    <div className="OneSaved">
                        <Product
                        clicked={()=>this.clickedProduct(fav._id)}
                        key={fav._id}
                        src={fav.prodImageSrc}
                        name={fav.name}
                        price={fav.price}
                        removeFavourite = {() => this.removeFromFavourites(fav._id)}
                        favourites
                        />
                    </div>
                )
            })
        }
        return(
            <div className="SavedItem">
               {toDisplay}
            </div>
        )
    }
}


const stateMappedToProps = state => {
    return {
        isLoggedIn : state.users.isLoggedIn
    }
}

const actionMappedToProps = dispatch => {
    return{
        notify: (payload)=>dispatch(uiActions.promptNotification(payload))
    }
}
export default compose(
    connect(stateMappedToProps, actionMappedToProps)
) (SavedItem)

