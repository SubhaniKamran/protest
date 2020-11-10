import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../common/ProtectRoute";
import Home from "../home/Index";
import Drill from "../drills/Index";
import DrillsCategory from "../drills-category/Index";
import DrillsDetail from "../single-drill-detail/Index";
import HomeNavbar from "../home-navbar/Index";
import Search from "../search/Index";
import Activity from "../activity/Index";
import Profile from "../profile/Index";
import peopleProfile from "../friendProfile/Index";
import SingleVideo from "../single-video/Index";
import SingleActivity from "../single-activity/Index";
import Payment from "../payment/Index";
import Subscription from "../subscription/Index";
import Logout from "../logout/Index";
import SpecficDrillCategory from "../specific-drills/Index";

class SearchBarLayout extends Component {
	state = {};

	render() {
		return (
			<>
				<HomeNavbar history={this.props} />
				<Switch>
					<ProtectedRoute path='/home' component={Home} />
					<ProtectedRoute path='/drills' exact component={Drill} />
					<ProtectedRoute path='/drill/category/:id' exact component={SpecficDrillCategory} />
					<ProtectedRoute path='/drills/category/:id' exact component={DrillsCategory} />
					<ProtectedRoute path='/drills/detail/:id' exact component={DrillsDetail} />
					<ProtectedRoute path='/search/:name' exact component={Search} />
					<ProtectedRoute path='/search' exact component={Search} />
					<ProtectedRoute path='/activites' exact component={Activity} />
					<ProtectedRoute path='/profile' exact component={Profile} />
					<ProtectedRoute path='/peopleProfile/:id' exact component={peopleProfile} />
					<ProtectedRoute path='/single/video/:id/:videoId' exact component={SingleVideo} />
					<ProtectedRoute path='/single/activity' exact component={SingleActivity} />
					<ProtectedRoute path='/payment/:id' exact component={Payment} />
					<ProtectedRoute path='/subscription' exact component={Subscription} />
					<ProtectedRoute path='/logout' exact component={Logout} />
				</Switch>
			</>
		);
	}
}

export default SearchBarLayout;
