import React, { Component } from "react";
import { Link } from "react-router-dom";
import categoryHolder from "../../../assets/images/categoryHolder.png";
import Slider from "react-slick";
import config from "../../../config";
import axios from "axios";
import { Redirect } from "react-router";
import Auth from "../../Services/Auth";

class InnerBanner extends Component {
	state = {
		data: [],
	};

	getAllData = () => {
		axios
			.get(`${config.API_URL}/admin/categories`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState({
					data: [...response.data.data.category],
				});
			});
	};
	componentDidMount() {
		this.getAllData();
	}
	drillsCategory(id) {
		this.props.history.push(`/home:${this.state.userID}`);
	}

	render() {

		var settings = {}
		
		if(window.screen.width <= 770)
		
		{
			 settings = {
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 4,
				slidesToScroll: 1,
			};
		}else
		{
			 settings = {
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 6,
				slidesToScroll: 1,
			};
		}

		const token = Auth.getToken();
		const data = this.state.data;
		if (data.length > 0) {
			return (
				<div className='innerBanner'>
					<div className='container'>
						<div className='innerBannerContent'>
							<Slider {...settings} className="mobHomeSlider">
								{data.map((category, i) => {
									return (
										<Link to={`/drills/category/${category._id}`}>
											<div key={i} className='bannerContent card-overlay mobHomeSlider"'>
												
												{(category.image === undefined || category.image === "null") ? (
															<img className="mobHomeSlider" style={{opacity: 0.7, border: "1px solid #FEE6CC"}} src={categoryHolder} />
															
														) : (
															<img className="mobHomeSlider"  style={{opacity: 0.7, border: "1px solid #FEE6CC"}} src={`${config.IMG_URL}/image/${category.image}`} onError={(e)=>{e.target.src=categoryHolder}}/>
														)
													}

												<h3>{category.name}</h3>
												
											</div>
										</Link>
									);
								})}
							</Slider>
						</div>
					</div>
				</div>
			);
		} else {
			return "Record not found";
		}
	}
}

export default InnerBanner;
