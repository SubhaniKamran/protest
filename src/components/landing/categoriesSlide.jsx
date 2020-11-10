import React, { Component } from "react";
import basketBalPic from "../../assets/imageslanding/basketBalPic.png"
import baseballPic from "../../assets/imageslanding/baseballPic.png"
import gymImg from "../../assets/imageslanding/gymImg.png"
import "../../assets/css/customlanding.scoped.css"
export default class CategoriesSlide extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
        <div style={{backgroundColor: '#181A1F'}}>

                        
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 ourDrills">
                     <center>  <h3 style={{color: '#ffffff'}}>O<span>ur Dri</span>lls</h3>
                     <p style={{color: "#fff", maxWidth: "900px"}}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                     </p>
                     </center>
                </div>
            </div>
        
                            
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-12 noColPadd">
                    <a href="/login">
                        <img src={basketBalPic} alt="" />
                        <div className="drillCation">
                            <h3><span>Basketball</span></h3>
                        </div>
                    </a>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12 noColPadd">
                    <a href="/login">
                        <img src={baseballPic} alt="" />
                        <div className="drillCation">
                            <h3><span>BASEBALL</span></h3>
                        </div>
                    </a>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12 noColPadd">
                    <a href="/login">
                        <img src={gymImg} alt="" />
                        <div className="drillCation">
                            <h3><span>Gymnastic</span></h3>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    );
  }
}