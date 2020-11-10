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

import btmSl1 from "../../assets/imageslanding/btmSl1.png"
import btmSl2 from "../../assets/imageslanding/btmSl2.png"
import btmSl3 from "../../assets/imageslanding/btmSl3.png"


export default class CategoriesSlide extends Component {
  constructor(props) {
    super(props);

  }

  render() {


    const settings = {
      infinite: true,
      slidesToShow: 3,
      speed: 1000,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000
    };

    return (
      <div>
            <div className="row trainerTopArea">
                <h3>Ou<span>r Train</span>er</h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
                <div className="trainerTopCarousel container">
                        <div className="trainerTopCarouselLeft col-md-2">
                            <h3>Katlimine Core</h3>
                            <h4><span>Gymnas</span>tic Instructor</h4>
                            <p>Your body hears everything that your mind says. You have to have a positive attitude if you want to achieve your goals.If you run a fitness gym, this is one slogan that can bring customers in. No one likes having to drive miles out of their way to go to the gym. </p>
                            <ul className="list-unstyled list-inline">
                                <li><a href="#"><img src={social1} alt="" /></a></li>
                                <li><a href="#"><img src={social2} alt="" /></a></li>
                                <li><a href="#"><img src={social3} alt="" /></a></li>
                            </ul>
                        </div>
                        <div className="trainerTopCarouselRight col-md-10">
                          
                        <Slider {...settings}>

                            <div>
                                 <img src={powerfulguy} alt="" width={'200px'}/>
                            </div>

                            <div>
                                 <img src={powerfulguy} alt="" width={'200px'}/>
                            </div>

                            <div>
                                 <img src={powerfulguy} alt="" width={'200px'}/>
                            </div>

                            <div>
                                 <img src={powerfulguy} alt="" width={'200px'}/>
                            </div>

                        </Slider>

                    </div>

                 </div>

            </div>

            <div className="trainerBottomArea">
                  <div className="row">
                    <div className="trainerBtmCarousel">
                        <div>
                            <img src={btmSl1} alt="" />
                        </div>
                        <div>
                            <img src={btmSl2} alt="" />
                        </div>
                        <div>
                            <img src={btmSl3} alt="" />
                        </div>
                        <div>
                            <img src={btmSl1} alt="" />
                        </div>
                        <div>
                            <img src={btmSl2} alt="" />
                        </div>
                        <div>
                            <img src={btmSl3} alt="" />
                        </div>
                    </div>
                </div>
            </div>

      </div>
    );
  }
}