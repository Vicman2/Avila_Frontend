import React, {Component} from 'react'
import Carousel from "react-multi-carousel";
import Axios from '../../../../axios'
import "react-multi-carousel/lib/styles.css";
import './Home.css'
import Button from '../../components/UI/Button/Button'
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import CarouselElement from '../../components/CarouseElement/CarouselElement'
import * as uiActions from '../../../../store/actions/UIActions'
import { flowRight } from 'lodash';
import { connect } from 'react-redux';



class Home extends Component{
    state = {
        products : []
    }
    componentDidMount(){
        Axios.get(`/api/products/getProducts?pageNo=1&noOfProducts=20`)
        .then(response => {
            this.setState({products: response.data.data.requestedProduct})
        }).catch(err=> {
            if(err.response){
                this.props.notify({
                    status: "error", 
                    message: err.response.data.message
                })
            }
        })
    }
    goToProduct = () => {
        this.props.history.push('/products')
      }
    render(){
        const responsive = {
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1,
              slidesToSlide: 1
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 1,
              slidesToSlide: 1 
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
              slidesToSlide: 1 
            }
          }

          let carousel = null 
          if(this.state.products.length > 0){
            carousel = 
                <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                >
                {this.state.products.map(prod => {
                    return(
                        <CarouselElement
                            key={prod._id}
                            src ={prod.prodImageSrc}
                        />
                    )
                })}
                    
                </Carousel>
          }
          
        return(
            <div className="Home">
                <div className="Home_Sec1 contain">
                    <div className="Home_Landing" data-aos="fade-right">
                        <p className="Home_Avila">Shalom<br /> Avila Natural Distributor</p>
                        <p className="Home_WeProvide">we provide the best natural skincare and Food product</p>
                        <Button name="Explore products" clicked={this.goToProduct }/>
                    </div>
                    <div className="Home_Landing_Carousel" data-aos="fade-left">
                       {carousel}
                    </div>
                </div>

                <div className="Home_sec2 contain">
                    <div className="About_Header">
                        <p className="The_Headers">About Us</p>
                    </div>
                    <div className="Home_About_sec">
                        <p>Welcome to AVILA NATURALLE, a leading natural
                            skincare and Food company in Nigeria. We hope
                             you find your journey on this site memorable 
                             and rewarding.<br/>
                            This site is designed to provide you with valuable
                            information about us, our corporate brand essence, 
                            core values, Vision and Mission, and of course our
                             array of Bodycare and Food products.Depending on what
                              your interests are, we have structured this site to 
                              help you have an easy journey through.</p>
                        <p> Avila Naturalle is a leading manufacturer of 100% NATURAL body
                             care and household brands in West Africa. A subsidiary of Top Confectionery 
                            Limited Nigeria, Avila is focussed on encouraging the use of pure and
                            natural body care (skincare, haircare, mouth care, foot care)
                            products and other essential oils. Avila Naturalle is committed 
                            to promoting the care of our body through natural means as a way of
                             eradicating cancer and other related skin challenges.
                        </p>
                    </div>
                </div>

                <div className="Home_Sec3 contain">
                    <div className="Home_Sec3_Header_Wrapper">
                        <div className="Home_Pop_Header">
                            <span className="header_span"></span>
                                <p className="The_Headers">POPULAR AVILA PRODUCTS</p>
                            <span className="header_span"></span>
                        </div>
                        <p className="Home_Covered">we’ve got you covered</p>
                    </div>

                    <RelatedProducts />
                </div>
            </div>
        )
    }
}

const dispatchMappedToProps = dispatch => {
    return{
        notify: (payload) => dispatch(uiActions.promptNotification(payload))
    }
}


export default flowRight(
    connect(null, dispatchMappedToProps)
)  (Home)