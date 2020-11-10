import React, { Component } from "react";
import { Route, withRouter, Link, Redirect } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import UserImage from "../../assets/images/user.png";
import MobileLogo from "../../assets/images/mobLogo.png";
import SearchIcon from "../../assets/images/searchIcon.png";
import MobileUser from "../../assets/images/mobUser.png";
import BackBtn from "../../assets/images/backArrow.png";
import Auth from "../Services/Auth";
import config from "../../config";
import Axios from "axios";

import FontAwesome from 'react-fontawesome';
import { Subscriptions} from '@material-ui/icons';



class HomeNavbar extends Component {
	state = {
		search: "",
		isVisible: false,
		searchVisible: false,
		data: []
	};
	container = React.createRef();
	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
		Axios.get(`${config.API_URL}/user/detail`, {
			headers: {
				Authorization: Auth.getToken(),
			},
		}).then((response) => {
			this.setState({
				data: [response.data.data.user[0]]
			})


		})
			.catch((error) => console.log(error));
	}


	handleChange = (e) => {
		this.setState({
			search: e.currentTarget.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { history } = this.props;
		const { search } = this.state;
		history.push(`/search/${search}`);
		window.location.href = `/search/${search}`;
	};
	handleToggle = () => {

		const { isVisible } = this.state;
		this.setState({
			isVisible: !isVisible,
		});
	};

	handleSearchToggle = () => {
		const { searchVisible } = this.state;
		this.setState({
			searchVisible: !searchVisible,
		});
	};
	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	handleClickOutside = (event) => {
		if (this.container.current && !this.container.current.contains(event.target)) {
			this.setState({
				isVisible: false,
			});
		}
	};

	logOut=()=>{	
		localStorage.removeItem('token');
		window.location.href="/login";
	}

	handleFocusOut = () =>{
		this.setState({
			searchVisible: false
		})
	}

	render() {
		const { isVisible, searchVisible } = this.state;
		const show = isVisible ? "show" : "";
		const data = this.state.data;
		return (
			<>
				<nav className='navbar navbar-default desktopNav' style={{backgroundColor: "#3B3C4E"}}>
					<div className='container'>
						<div className='navbar-header'>
							<button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#defaultNavbar1'>
								<span className='sr-only'>Toggle navigation</span>
								<span className='icon-bar'></span>
								<span className='icon-bar'></span>
								<span className='icon-bar'></span>
							</button>
							<Link to='/home'>
								<p className='navbar-brand'>
									<img src={Logo} alt='' />
								</p>
							</Link>
						</div>
						<div className='col-md-6 col-sm-6 headerSearch' style={{padding: "0"}}>
							<form className='navbar-form navbar-left' role='search' onSubmit={this.handleSubmit.bind(this)}>
								<div className='form-group'>
									<input
										type='text'
										className='form-control'
										name='search'
										onChange={this.handleChange}
										style={{color: "#FEE6CC"}}
										placeholder='SEARCH BY CATEGORY, ATHLETE'
									/>
								</div>
							</form>
						</div>
						<div className='collapse navbar-collapse' id='defaultNavbar1'>
							<ul className='nav navbar-nav navbar-right user'>
								<li>
									<Link to='/activites' style={{borderTop: "none", color: "#FEE6CC", fontSize:"18px"}}>Activity</Link>
								</li>
								<li className='dropdown' >
									<Link to='#' className='dropdown-toggle innerDropdown' data-toggle='dropdown' onClick={this.handleToggle} role='button' aria-expanded='false'>


										<img src={UserImage} alt='' style={{borderRadius: "50px"}} draggable={false}/>
										<span className='caret' style={{color: "#FEE6CC"}}></span>
									</Link>
									<ul className={"dropdown-menu " + show + " userdropdown "} role='menu' style={{marginTop:"10px", borderRadius: "5px"}} >
										<li>
											<Link to='/profile' onClick={this.handleToggle}>

												<FontAwesome
												name="user-circle"
												style={{fontSize: "25px"}}
												/>
												&nbsp;
												Profile
											</Link>
										</li>
										<li>
											<Link to='/subscription' onClick={this.handleToggle}>
											<Subscriptions
												style={{fontSize: "25px"}}
												/>
												&nbsp;
												Subscription
												</Link>
										</li>
										<li>
											<a onClick={this.logOut} style={{cursor: "pointer"}}>
											<FontAwesome
												name="sign-out"
												style={{fontSize: "25px"}}
												/>
												&nbsp;
												Logout</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<nav className='mobileNavbar' style={{paddingBottom: "5px", backgroundColor: "#3B3C4E"}}>
					<div className={searchVisible ? "col-xs-3" : "col-xs-8 " + " mobLogo"}>
						<p className='backLink' onClick={this.props.history.goBack} style={{visibility: (this.props.history.location.pathname === "/home")? "hidden" : "visible"}}>
							<img src={BackBtn} alt='' /> Back
						</p>
						<Link to='/home' style={{ display: searchVisible ? "none" : "block" }}>
							<img src={MobileLogo} alt='' style={{width: "110px"}}/>
						</Link>
					</div>
					<div className={"mobSearch col-xs-7"} style={{ display: searchVisible ? "block" : "none" }}>


						<form className='navbar-form navbar-left' role='search' onSubmit={this.handleSubmit.bind(this)}>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									name="search"
									onChange={this.handleChange}
									onBlur={this.handleFocusOut}
									style={{paddingLeft: "40px",color: "#FEE6CC"}}
									placeholder='SEARCH BY CATEGORY, ATHLETE NAME' />
							</div>
						</form>
					</div>
					<div className={searchVisible ? "col-xs-2" : "col-xs-4 " + " mobMenuItems"}>
						<ul className='list-unstyled list-inline'>
							<li style={{ display: searchVisible ? "none" : "" }}>
								<Link onClick={this.handleSearchToggle} id='mobSearchBtn'>
									<img src={SearchIcon} alt='' />
								</Link>
							</li>
							<li className='dropdown' style={{paddingLeft: "10px"}}>
								<Link href='#' className='dropdown-toggle' data-toggle='dropdown' onClick={this.handleToggle} role='button' aria-expanded='false'>
									<img src={MobileUser} alt='' />
								</Link>
								<ul style={{marginTop:"10px", borderRadius: "5px"}} className={"dropdown-menu userdropdown " + show + ((this.state.searchVisible == true) ? " toggledownMobile " : "")} role='menu'>
									<li>
										<Link to='/profile' onClick={this.handleToggle}>

											<FontAwesome
											name="user-circle"
											style={{fontSize: "25px"}}
											/>
											&nbsp;
											Profile
										</Link>
									</li>
									<li>
										<Link to='/subscription' onClick={this.handleToggle}>
										<Subscriptions
											style={{fontSize: "25px"}}
											/>
											&nbsp;
											Subscription
											</Link>
									</li>
									<li>
										<a onClick={this.logOut} style={{cursor: "pointer"}}>
										<FontAwesome
											name="sign-out"
											style={{fontSize: "25px"}}
											/>
											&nbsp;
											Logout</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div className='clearfix'></div>
				</nav>
			</>
		);
	}
}

export default withRouter(HomeNavbar);
