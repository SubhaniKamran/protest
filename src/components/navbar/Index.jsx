import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

class Navbar extends Component {
	state = {};
	render() {
		return (
			<nav className='navbar navbar-default hidden-xs'>
				<div className='container'>
					<div className='navbar-header'>
						<button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#defaultNavbar1'>
							<span className='sr-only'>Toggle navigation</span>
							<span className='icon-bar'></span>
							<span className='icon-bar'></span>
							<span className='icon-bar'></span>
						</button>
						<Link className='navbar-brand' to="/">
							<img src={logo} alt='logo' />
						</Link>
					</div>
					<div className='collapse navbar-collapse' id='defaultNavbar1'>
						<ul className='nav navbar-nav navbar-right'>
							{/* <li>
								<Link to='/home'>HOMEPAGE</Link>
							</li>
							<li>
								<Link to='/subscription'>PRICING</Link>
							</li> */}
							<li className='dropdown signinHeader'>
								<Link to='/login' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>
									<span className='signinHeaderTxt'>Hi! Sign In</span>MY FITNESS<span className='caret'></span>
								</Link>
								<ul className='dropdown-menu' role='menu'>
									<div><h1>OK</h1></div>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
