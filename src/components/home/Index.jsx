import React, { Component } from "react";
import MobileNavbar from "../Mobile-navbar/Index";
import InnerBanner from "./inner-banner/Index";
import InnerContent from "./inner-content/Index";
class Home extends Component {
	state = {};
	render() {
	
		return (
			<>

				<InnerBanner />
				<InnerContent />
				<MobileNavbar item={"Home"}/>
			</>
		);
	}
}

export default Home;
