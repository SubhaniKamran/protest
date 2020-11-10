import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import MobileNavbar from "../Mobile-navbar/Index";
import InnerBanner from "./inner-banner/Index";
import InnerContent from "./inner-content/Index";

import Auth from "../Services/Auth";

class Profile extends Component {
	state = {};

	render() {
		const searchProfile = this.props.match.params.id;
		
		return (
			<>
				<InnerBanner   searchProfile={searchProfile}/>
				<InnerContent  searchProfile={searchProfile} />
				<MobileNavbar item={"Home"}/>
			</>
		);
	}
}

export default Profile;
