import React, { Component } from "react";
import AllDrills from "../../../assets/images/allDrills.png";

class InnerBanner extends Component {
	state = {
		data: [],
	};

	render() {

		return (
			<div className="innerBanner innerPagesBanner"  style={{marginBottom: "-35px"}}>
				<div className="container" style={{backgroundColor: "rgba(24, 26, 31, 0.8)", paddingTop: "10px",  paddingBottom: "30px"}}>
					<div className="innerBannerArea" 
						 style={{ backgroundImage: "url(" + AllDrills + ")", backgroundRepeat: 'no-repeat',
						 backgroundRepeat: "no-repeat",
						 backgroundSize: "cover",
						 borderRadius: "10px",
						 opacity: 0.75,
						 height: "20px"
					    	}} 
						 >
						<h3>All Drills</h3>
					</div>
				</div>
			</div>

		);

	}
}

export default InnerBanner;
