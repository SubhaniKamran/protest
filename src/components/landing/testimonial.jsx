import React, { Component } from "react";
import Slider from "react-slick";
import social1 from "../../assets/imageslanding/social1.png"
import social2 from "../../assets/imageslanding/social2.png"
import social3 from "../../assets/imageslanding/social3.png"
import slider1 from "../../assets/imageslanding/slider1.png"
// import btmSl1 from "../../assets/imageslanding/btmSl1.png"
import powerfulguy from "../../assets/imageslanding/powerfulguy.png"
// import btmSl3 from "../../assets/imageslanding/btmSl3.png"
import "../../assets/css/customlanding.scoped.css"
import testimonials from "../../assets/imageslanding/testimonials.png";


export default class CategoriesSlide extends Component {
  constructor(props) {
    super(props);

  }


  render() {


    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      speed: 1000,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000
    };

    return (
      <div>
         
                <div className="testimonailSection">
                    <div className="container">
                        <h3>Tes<span>tmoni</span>als</h3>
                        <div className="testimonailCarousel">
                            <div>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero</p>
                                <img src={testimonials} alt="" />
                                <h4>Ahmed Elsayed</h4>
                                <h5>CLIENT</h5>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero</p>
                                <img src={testimonials} alt="" />
                                <h4>Ahmed Elsayed</h4>
                                <h5>CLIENT</h5>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero</p>
                                <img src={testimonials} alt="" />
                                <h4>Ahmed Elsayed</h4>
                                <h5>CLIENT</h5>
                            </div>
                        </div>
                    </div>
                </div>

      </div>
    );
  }
}