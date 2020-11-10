import React, { Component } from "react";
import UserSm from "../../../assets/images/userSm.png";
import DurationIcon from "../../../assets/images/durationIcon.png";
import VidNameIconLg from "../../../assets/images/vidNameIconLg.png";
import config from "../../../config";
import axios from "axios";
import Auth from "../../Services/Auth";
import userIcon from "../../../assets/images/user.png";

class InnerBanner extends Component {
	state = {
		data: [],
	};
	getDrillsData = () => {
		const drillId = this.props.id;
		axios
			.get(`${config.API_URL}/admin/drills/${drillId}`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState({
					data: [...response.data.data.drills],
				});
			});
	};
	componentDidMount() {
		this.getDrillsData();
	}

	durations = (videos) => {
		const length = videos.length;
		var sum = 0;
		if (length > 0) {
			videos.map((video, index) => {

				sum = sum + video.duration;

			})

		}
		if (sum >= 0) {
			return (

				<li style={{ color: "white" }}>
					<img src={DurationIcon} alt='' /> {sum}
				</li>


			);
		}
	}

	render() {
		const { data } = this.state;
		if (data != null && data.length > 0) {
			{
				return (
					<div className='innerBanner innerPagesBanner innerBannerOptions'  style={{marginBottom: "-25px"}}>
						<div className='container' style={{backgroundColor: "rgba(24, 26, 31, 0.8)", paddingTop: "10px",  paddingBottom: "30px"}}>
							{data.map((drills, index) => {
								const backgroundImg = `${config.IMG_URL}/image/drills/${drills.thumbnail}`;
								return (
									<div
										key={index}
										className='innerBannerArea'
										style={{ backgroundImage: "url(" + backgroundImg + ")", backgroundRepeat: "no-repeat", backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										backgroundSize: "cover",
										borderRadius: "10px",
										opacity: 0.78
									}}
									>
										{/* <div className='videoSettings'>
											<div className='col-md-6 col-sm-6 col-xs-6'>
												<ul className='videoLeftSettings uploader list-unstyled'>
													<li style={{color: "#ffffff"}}>
									

														{(drills.athlete === undefined || drills.athlete === "null") ? (
																<img src={UserSm} style={{borderRadius: "50px", opacity: 0.5, width: "25px" }}/>
																
															) : (
																<img src={drills.athlete ? `${config.IMG_URL}/image/${drills.athlete.image}` : UserSm} style={{borderRadius: "50px", opacity: 0.5, width: "25px" }} onError={(e)=>{e.target.src=UserSm}}/>
															)
														}
												
														
														&nbsp; {drills.athlete ? drills.athlete.name : "Name Not Found"}
													</li>
												</ul>
											</div>
										</div> */}
										<h3>
											<img src={VidNameIconLg} alt='' /> {drills.name}{" "}
										</h3>
										<div className='durationSettings'>
											<ul className='list-unstyled list-inline'>
												{
													drills.videos.length > 0
														?
														(
															this.durations(drills.videos)
														)
														: (
															""
														)
												}
												<li>{drills.videos ? drills.videos.length : 0} Drills</li>
											</ul>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			}
		} else {
			return (
				<div className='innerBanner innerPagesBanner innerBannerOptions'>
					<div className='container'>
						<div className='row'>
							<h2 style={{ color: "#fee6cc", textAlign: "center" }}>Drill Not Found</h2>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default InnerBanner;
