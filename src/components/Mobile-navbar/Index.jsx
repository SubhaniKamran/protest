import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuLogo1 from "../../assets/images/menu1.png";
import menuLogo2 from "../../assets/images/menu2.png";
import menuLogo3 from "../../assets/images/menu3.png";
import menuLogo4 from "../../assets/images/menu4.png";

class MobileNavbar extends Component {
	state = {

		currentItem :  this.props.item

	};


	render() {
		return (
			<div className='mobileFixedBottomMenu navbar-fixed-bottom'>
				<ul className='list-inline list-unstyled text-center'>

					<li className={(this.state.currentItem == "Home") ? "mobMenuActive": ""} id="item" onClick={this.handleState}>


						<Link to="/home" >
							<img src={menuLogo1} alt='' />
								Home
						</Link>

					</li>
					<li className={(this.state.currentItem == "Drills") ? "mobMenuActive": ""} id="item" onClick={this.handleState}>



						<Link to="/drills">
							<img src={menuLogo2} alt='' />
								Drills
						</Link>


					</li>
					<li className={(this.state.currentItem == "Activity") ? "mobMenuActive": ""} id="item" onClick={this.handleState}>



						<Link to="/activites">
							<img src={menuLogo3} alt='' />Activity
						</Link>


					</li>
					<li className={(this.state.currentItem == "Find Friends") ? "mobMenuActive": ""} id="item" onClick={this.handleState}>

						<Link to="/search/Friends">
							<img src={menuLogo4} alt='' />
							Find Friends
						</Link>


					</li>
				</ul>
			</div>
		);
	}
}

export default MobileNavbar;
