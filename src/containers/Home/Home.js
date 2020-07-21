import React, {Component} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Home.css'
import Button from '../../components/UI/Button/Button'
import prod1 from './Assets/prod1.png'
import prod2 from './Assets/prod2.png'
import prod3 from './Assets/prod3.png'
import prod4 from './Assets/prod4.png'


class Home extends Component{
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
          
        return(
            <div className="Home">
                <div className="Home_Sec1 contain">
                    <div className="Home_Landing">
                        <p className="Home_Avila">Shalom<br /> Avila Natural Distributor</p>
                        <p className="Home_WeProvide">we provide the best natural skincare and Food product</p>
                        <Button name="Explore products" />
                    </div>
                    <div className="Home_Landing_Carousel">
                        <Carousel
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        >
                            <div className="CarouselImage">
                                <img className="contain_img" src={prod1} alt="Prod1" />
                            </div>
                            <div className="CarouselImage"> 
                                <img className="contain_img" src={prod2} alt="Prod1" />
                            </div>
                            <div className="CarouselImage"> 
                                <img className="contain_img" src={prod3} alt="Prod1" />
                            </div>
                            <div className="CarouselImage"> 
                                <img className="contain_img" src={prod4} alt="Prod1" />
                            </div>
                        </Carousel>
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
                    <div className="Home_Pop_Header">
                        <span className="header_span"></span>
                            <p className="The_Headers">POPULAR AVILA PRODUCTS</p>
                        <span className="header_span"></span>
                    </div>
                    <p className="Home_Covered">we’ve got you covered</p>
                </div>
            </div>
        )
    }
}


export default Home