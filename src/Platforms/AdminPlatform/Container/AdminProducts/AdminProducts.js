import React, {Component} from 'react'
import './AdminProducts.css'
import Button from '../../../UsersPlatform/components/UI/Button/Button'
import Axios from '../../../../axios'
import { getInLocalStorage } from '../../../../utility'
import {flowRight as compose, isInteger} from 'lodash'
import * as userActions from '../../../../store/actions/userActions'
import * as uiActions from '../../../../store/actions/UIActions'
import { connect } from 'react-redux'
import LoaderWrapper from '../../Components/UI/LoaderWrapper/LoaderWrapper'
import Aux from '../../../../HOC/Aux/Aux'


class AdminProducts extends Component{
    state = {
        loading : false,
        activePage: 1,
        pageNo: 1, 
        noOfProducts: 10,
        products :[], 
        totalProducts: null, 
        addProduct: false, 
        editProduct: false, 
        deleteProduct: false, 
        readProduct: false, 
        prodToPerformAction: null
    }
    clickedAdd = () => {
        this.setState((prevstate) => {
            return{
                addProduct:!prevstate.addProduct
            }
        })
    }
    clickedEdit = (id) => {
        const prod = this.state.products.find(prod => prod._id == id)
        this.setState((prevstate) => {
            return{
                editProduct:!prevstate.editProduct,
                prodToPerformAction: prod
            }
        })
    }
    clickedDelete = (id) => {
        const prod = this.state.products.find(prod => prod._id == id)
        this.setState((prevstate) => {
            return{
                deleteUser:!prevstate.deleteUser,
                prodToPerformAction: prod
            }
        })
    }
    clickedRead = (id) => {
        const prod = this.state.products.find(prod => prod._id == id)
        this.setState((prevstate) => {
            return{
                readUser:!prevstate.readUser,
                prodToPerformAction: prod
            }
        })
    }
    nexPage = async ()=>{
        let  numberOfPages = this.state.totalProducts/this.state.noOfProducts
        numberOfPages = isInteger(numberOfPages) ? numberOfPages : parseInt(numberOfPages) + 1
        if(this.state.activePage < numberOfPages){
            await this.setState((state) => {
                return {pageNo: state.pageNo + 1, activePage: state.activePage + 1}
            })
            this.getProducts(true)
        }  
    }
    prevPage = async()=> {
        let  numberOfPages = this.state.totalProducts/this.state.noOfProducts
        numberOfPages = isInteger(numberOfPages) ? numberOfPages : parseInt(numberOfPages) + 1
        if(this.state.activePage > 1){
            await this.setState((state) => {
                return {pageNo: state.pageNo - 1, activePage: state.activePage - 1}
            })
            this.getProducts(true)
        }
    }
    numPage = async(pageNo) => {
        await this.setState({pageNo , activePage: pageNo})
        this.getProducts(true)
    }


    componentDidMount(){
       this.getProducts(true)
    }
    getProducts = (scrollUp) => {
        let {pageNo, noOfProducts} = this.state
        this.setState({loading:true})
        Axios.get(`/api/products/getProducts?pageNo=${pageNo}&noOfProducts=${noOfProducts}`)
        .then(({data})=> {
            const {requestedProduct, totalProducts} = data.data
            this.setState({products: requestedProduct, totalProducts: totalProducts, loading: false})
            if(scrollUp){
                window.scrollTo(0,0)
            }
        }).catch(err => {
            this.setState({loading:false})
            if(err.response){
                this.props.notify({
                    status: "error", 
                    content: err.response.message
                })
            }
        })
    }
    render(){
        console.log(this.state.products)
        return(
            <div className="AdminProducts">
                <p>This is the admin products</p>
            </div>
        )
    }
}

export default AdminProducts