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
import SingleProduct from '../../Components/SingleProduct/SingleProduct'
import ReadProduct from './ReadProduct/ReadProduct'


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
                readProduct:!prevstate.readProduct,
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
        const {products, loading} = this.state
        const style = {
            greenButton: {
                backgroundColor: "#38BE6E"
            }, 
            redButton: {
                backgroundColor: "#F02929"
            }
        }

        let pagination = <div></div>
        if(this.state.totalProducts && !loading){
            let  numberOfPages = this.state.totalProducts/this.state.noOfProducts
            numberOfPages = isInteger(numberOfPages) ? numberOfPages : parseInt(numberOfPages) + 1
            let arrayPage = []
            for(let i = 1; i<= numberOfPages; i++){
                arrayPage.push(i)
            }
            arrayPage = arrayPage.map(page => {
                let classes = ["Product_newPage"];
                if(page === this.state.activePage){
                    classes.push("Prod_Active_Page");
                }
                return(
                    <div 
                    key={page}
                    onClick={() =>this.numPage(page)}
                    className={classes.join(" ")}>
                        {page}
                    </div>
                )
            })
            const prevLink= ["Product_newPage"];
            if(this.state.activePage && this.state.activePage === 1){
                prevLink.push("Deactive_Nav");
            }
            const nextLink = ["Product_newPage"];
            if(this.state.activePage && this.state.activePage === numberOfPages){
                nextLink.push("Deactive_Nav");
            }
            pagination =<div className="Pagin_Section">
                <p onClick={this.prevPage} className={prevLink.join(" ")}>Prev</p>
                <div className="Page_Numeration">{arrayPage} </div>
                <p onClick={this.nexPage} className={nextLink.join(" ")}>Next</p>
            </div>
        }
        let productsToDisplay = <LoaderWrapper />
        if(products.length > 0 && !loading){
            productsToDisplay = products.map(prod => {
                return(
                    <SingleProduct
                    key={prod._id}
                    fieldName="Product"
                    fieldValue="noDelete"
                    name={prod.name}
                    price={prod.price}
                    src={prod.prodImageSrc}
                    description={prod.details}
                    // editUserHandler={() =>this.clickedEdit(user._id)}
                    readProductHandler= {() => this.clickedRead(prod._id)}
                    // deleteUserHandler= {() => this.clickedDelete(user._id)}
                    />
                )
            })
        }
        let actionComponent = null
        if(this.state.prodToPerformAction){
            actionComponent =<Aux>
                {/* <EditUser
                fetchUsers={() =>this.getUsers(true)}
                handleModal={this.clickedEdit}
                show={this.state.editUser}
                data={this.state.userToPerformAction}
               /> */}
                <ReadProduct
                fetchProducts={() =>this.getProducts(true)}
                handleModal={this.clickedRead}
                show={this.state.readProduct}
                data={this.state.prodToPerformAction}
                />
                {/* <DeleteUser
                fetchUsers={() =>this.getUsers(true)}
                handleModal={this.clickedDelete}
                show={this.state.deleteUser}
                data={this.state.userToPerformAction}
                /> */}
            </Aux>
            
        }

        return(
            <Aux>
                {actionComponent}
                <div className="AdminProduct_ActionButtons_Container">
                    <div className="AdminProduct_BtnWrapper">
                        <div className="AdminProduct_ActionButtons">
                            <Button name="Add Product" clicked={this.clickedAdd}  style={style.greenButton}/>
                        </div>
                        {/* <div className="AdminUser_ActionButtons">
                            <Button name="Delete User"  style={style.redButton}/>
                        </div> */}
                    </div>
                </div>
                <div className="AdminProducts_Listing">
                    {productsToDisplay}
                </div>
                <div className="Products_Pagination">
                    {pagination}
                </div>
            </Aux>
        )
    }
}

export default AdminProducts