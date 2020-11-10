import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import { WaveLoading  } from 'react-loadingg';

class ForgotPassword extends Component {
	state = {
		showFirstTab: true,
		showSecondTab: false,
		showThirdTab: false,
		firstTab: false,
		secondTab: false,
		message: "",
		forgetpass_email: "",
		data: {

			new_password: "",
			confirm_password: "",
			reset_token: ""

		},
		code: "",
		loading: false
	};


	switchTab = (e, tab) => {
		e.preventDefault();
		switch (tab) {
			case "showSecondTab":
				this.setState({
					firstTab: true
				});
				this.submitHandler();

				break;
			case "showThirdTab":
				this.setState({
					showFirstTab: false,
					showSecondTab: false,
					showThirdTab: true,
					secondTab: true,

				});
				break;
			default:
				return;
		}
	};

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	submitHandler = () => {

		if (this.state.forgetpass_email === "") {
			this.setState({
				message: "Enter email",
			});
		} else {

			if (this.state.firstTab == true) {


				const data = {
					forgetpass_email: this.state.forgetpass_email
				};
				this.setState({
					loading: true
				})
				console.log(data);
				axios.post(`${config.API_URL}/forgetpassword`, data).then((response) => {
					if (response.data.success) {
						console.log("resposne is" + JSON.stringify(response));
						console.log(response.data.data.user.code)
						this.setState({
							showFirstTab: false,
							showSecondTab: true,
							showThirdTab: false,
							code: response.data.data.user.code,
							data: {
								reset_token: response.data.data.user.resetPasswordKey,
								new_password: "",
								confirm_password: "",

							},
							loading: false

						});

					} else if (response.data.success === false) {
						this.setState({
							message: response.data.errors.email.message,
						});
					}
				});


			}

		}
	};

	
	handleOnChange = (e) => {
		let data = { ...this.state.data };
		data[e.currentTarget.name] = e.currentTarget.value;
		this.setState({
			data,
		});
	};



	submitResetPassowrd = (e) => {
		if (this.state.data.new_password === "" && this.state.data.confirm_password == "") {
			this.setState({
				message: "Enter password and confirm password",
			});
		}
		else if(this.state.data.new_password != this.state.data.confirm_password){
            this.setState({
				message: "password and confirm password not match",
			});
		}else if(this.state.data.new_password.length <8 && this.state.data.confirm_password.length <8){
			this.setState({
				message: "password length must be greater than 8 characters",
			});
		}
		else {
			if (this.state.secondTab == true) {

				console.log("data" + JSON.stringify(this.state.data));

				axios.post(`${config.API_URL}/resetpassword`, this.state.data).then((response) => {
					if (response.data.success == true) {
						this.props.history.push("/login");
						
					}
				
				});
		


			}
		}
	}



	render() {

		const { showFirstTab, showSecondTab, showThirdTab } = this.state;
		if (this.state.loading) {
			return (
					
					<WaveLoading size={"large"}  />
				
			);
		  }
		
		return (
			<div className='loginBg forgotScreen'>

				<div className='container'>
					<div className='loginArea forgotBg'>
						<p style={{color: "#FEE6CC"}}>{this.state.message}</p>
						<h2>Forgot Password</h2>
						<div className='formArea' style={{ display: showFirstTab ? "block" : "none" }}>
							<form action='#' method='post'>
								<div className='form-group'>
									<input type='email' className='form-control' name="forgetpass_email" value={this.state.forgetpass_email} onChange={this.handleInput} placeholder='Enter Email' />
								</div>
								<div className='form-group'>
									<button type='submit' className='btn btnLogin' onClick={(e) => this.switchTab(e, "showSecondTab")}>
										Next
									</button>
								</div>
							</form>
						</div>

						<div className='formArea' style={{ display: showSecondTab ? "block" : "none" }}>
							<form action='#' method='post'>
								<div className='form-group'>
									<input type='text' className='form-control' name="reset_token" value={this.state.data.reset_token} onChange={this.handleOnChange} placeholder='Enter verification code' />
								</div>
								<div className='form-group'>
									<p>Please enter a code that sent</p>
									<p>
										<Link href='#'>{this.state.forgetpass_email}</Link>
									</p>
								</div>
								<div className='form-group'>
									<button type='submit' className='btn btnLogin' onClick={(e) => this.switchTab(e, "showThirdTab")}>
										Next
									</button>
								</div>
							</form>
						</div>

						<div className='formArea'>
							<form action='#' method='post' style={{ display: showThirdTab ? "block" : "none" }}>

								<div className='form-group'>
									<input type='password' className='form-control' name="new_password" placeholder='Password' value={this.state.data.new_password} onChange={this.handleOnChange}
									/>

								</div>
								<div className='form-group'>
									<input type='password' className='form-control' name="confirm_password" value={this.state.data.confirm_password} placeholder='Confirm Password' onChange={this.handleOnChange}
									/>
								</div>
								<div className='form-group'>
									<button type='button' className='btn btnLogin' onClick={(e) => this.submitResetPassowrd(e)}>
										RESET
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
