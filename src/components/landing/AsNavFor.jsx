import React, { Component } from "react";
import Slider from "react-slick";
import PIC1 from "../../assets/imageslanding/pic1.png";
import PIC2 from "../../assets/imageslanding/pic2.png";
import PIC3 from "../../assets/imageslanding/pic3.png";

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    return (
      <div>
        <Slider
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
          arrows={false}
        >
          <div>
             <img src={PIC1} alt="" />
          </div>
          <div>
             <img src={PIC2} alt="" />
          </div>
          <div>
             <img src={PIC3} alt="" />
          </div>
        </Slider>
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          autoplay={true}
          autoplaySpeed={2000}
          arrows={false}
            >
          <div>
             <img src={PIC1} alt="" className="imgactive" width={'180px'}/>
          </div>
          <div>
             <img src={PIC2} alt="" className="imgactive" width={'180px'}/>
          </div>
          <div>
             <img src={PIC3} alt="" className="imgactive" width={'180px'}/>
          </div>
        </Slider>
      </div>
    );
  }
}