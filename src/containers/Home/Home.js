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
                        swipeable={true}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} 
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        deviceType={this.props.deviceType}
                        itemClass="carousel-item-padding-40-px"
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
            </div>
        )
    }
}


export default Home