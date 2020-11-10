import React, { Component } from "react";
import config from "../../../config";
import { Link } from "react-router-dom";
import axios from "axios";
import Auth from "../../Services/Auth";
import moment from 'moment';
import DropIn from "braintree-web-drop-in-react";
import VisaCard from "../../../assets/images/visaCard.png";
import { WaveLoading } from 'react-loadingg';
import BackArrow from "../../../assets/images/backArrow.png";
import MasterCard from "../../../assets/images/masterCard.png";
import Paypal from "../../../assets/images/paypal.png";
import { Redirect } from "react-router-dom";


class InnerContent extends Component {
	instance;
	state = {
		amount: "",
		clientToken: null,
		payment_method_nonce: null,
		loggedinUser: [],
		data: "",
		subscriberStatus: false,
		price:""

	};
	async componentDidMount() {
		const id = this.props.id
		const alreadySubscribed = this.props.id;

		const token = localStorage.getItem("token");
		await axios.get(`${config.API_URL}/loginUser`, {
			headers: {
				Authorization: token,
			},
		}).then((response) => {
			this.setState({
				loggedinUser: response.data.loginUser
			})
		})

		axios.get(`${config.API_URL}/admin/subscription`, {
			headers: {
				Authorization: token,
			},
		})
		.then((response) => {
			this.setState({
				data: response.data.data.subscriptions[0].name,
				price: response.data.data.subscriptions[0].price
			})
		})




		if(alreadySubscribed == "9jsda0mxa8y89yh7ashy79y9asdx98")
		{
			this.setState({
				subscriberStatus: true
			})
		}else
		{

			this.setState({
				subscriberStatus: false
			})



			const { subscribeDetail } = this.state.loggedinUser
			var start = moment(subscribeDetail.subscribeDate);
			var current = moment().startOf('minute');
			const duration = moment.duration(current.diff(start)).asDays()
			if(subscribeDetail.subscribe && duration<=30){
					alert("subscribed");
					window.location.href = "/subscription";
				}else{	
				axios.get(`${config.API_URL}/admin/subscription/${id}`, {
					headers: {
						Authorization: token,
					},
				})
					.then((response) => {
						const { price } = response.data.data.subscriptions
						this.setState({
							price: price
						})
					})

				await axios.get(`${config.API_URL}/checkoutNew`)
					.then((response) => {
						this.setState({
							clientToken: response.data.token,
						});
					})
				}

				



		}


		

	}
	async buy() {
		
		if(!this.state.subscriberStatus)
		{
			// Send the nonce to your server
			const data = await this.instance.requestPaymentMethod();
			let params = {
				data: data,
				sub_id: this.props.id
			}
			await axios
				.post(`${config.API_URL}/checkout`, params, {
					headers: {
						Authorization: Auth.getToken(),
					},
				}).then((response)=>{
					console.log(response)
					if(response.data.result.success){
						alert('you subscribe successfully')
						window.location.href="/home"
					}
					else{
						alert('Error')
					}
				})
		}

	}


	render() {
		if(this.state.subscriberStatus)
		{
			return (
				<div className="mainInnerContent" >
					<div className="container" >
						<div className="paymentScreen">
						
							<div className="paymentTop" >
								
								<div className="row" >
									<div className="col-md-12">
										<h2 style={{color: "#FEE6CC"}}>Service Purchased</h2>
									</div>
									<div className="clearfix"></div>
									{/* <hr style={{borderBottom: "#707070 solid 1px"}}> */}
								</div>
								<hr/>
								<div className="row">
								<div className="col-md-6 col-sm-6 col-xs-6">
										<h3 style={{color: "#FEE6CC"}}>
											{this.state.data}
										</h3>
									</div>

									<div className="col-md-6 col-sm-6 col-xs-6 text-right">
										<h3 style={{color: "#FEE6CC"}}><span style={{fontSize: "20px"}}>$</span> {this.state.price}</h3>
									</div>
									<div className="clearfix"></div>
									{/* <hr style={{ border: "#707070 dashed 1px"}}> */}
								</div>
								<hr  style={{border: "1px dashed rgb(254, 230, 204, 0.5)"}}/>
								<div className="row">
									<div className="col-md-6 col-sm-6 col-xs-6"></div>
									<div className="col-md-6 col-sm-6 col-xs-6 text-right">
										<h3>Total  &nbsp;&nbsp;  ${this.state.price}</h3>
									</div>
									<div className="clearfix"></div>
								</div>
							</div>
	
						</div>
					</div>
				</div>


			);
		}else{
			if (!this.state.clientToken) {
				return (
					   
						<WaveLoading  />
					
				);
			} else {
				return (
					<div className="mainInnerContent" >
						<div className="container" >
							<div className="paymentScreen">
							
								<div className="paymentTop" >
									
									<div className="row" >
										<div className="col-md-12">
											<h2 style={{color: "#FEE6CC"}}>Order Summary</h2>
										</div>
										<div className="clearfix"></div>
										{/* <hr style={{borderBottom: "#707070 solid 1px"}}> */}
									</div>
									<hr/>
									<div className="row">
									<div className="col-md-6 col-sm-6 col-xs-6">
											<h3 style={{color: "#FEE6CC"}}>
												{this.state.data}
											</h3>
										</div>
	
										<div className="col-md-6 col-sm-6 col-xs-6 text-right">
											<h3 style={{color: "#FEE6CC"}}><span style={{fontSize: "20px"}}>$</span> {this.state.price}</h3>
										</div>
										<div className="clearfix"></div>
										{/* <hr style={{ border: "#707070 dashed 1px"}}> */}
									</div>
									<hr  style={{border: "1px dashed rgb(254, 230, 204, 0.5)"}}/>
									<div className="row">
										<div className="col-md-6 col-sm-6 col-xs-6"></div>
										<div className="col-md-6 col-sm-6 col-xs-6 text-right">
											<h3>Total  &nbsp;&nbsp;  ${this.state.price}</h3>
										</div>
										<div className="clearfix"></div>
									</div>
								</div>
								{
									(this.state.subscriberStatus == true) ? "":
									<div className="paymentTop" style={{height: "400px"}}>
										<DropIn
											options={{ authorization: this.state.clientToken }}
											onInstance={(instance) => (this.instance = instance)}
										/>
										<Link to="#" onClick={this.buy.bind(this)} className="btn btnFilled" style={{float: "right"}}>Pay Now</Link>
									</div>
								}
								
							</div>
						</div>
					</div>
	
	
				);
			}
	
		}

	}
}

export default InnerContent;
