import React, { Component } from "react";
import { Link } from "react-router-dom";
import userIcon from "../../../assets/images/user.png";
import playIcon from "../../../assets/images/play.png";
import videoThumbnail from "../../../assets/images/thumbnail.png";
import videoNameIcon from "../../../assets/images/videoNameIcon.png";
import config from "../../../config";
import axios from "axios";
import Auth from "../../Services/Auth";
import durationIcon from "../../../assets/images/durationIcon.png";
import heartIcon from "../../../assets/images/heart.png";
import ReactFacebookLogin from "react-facebook-login";
import { WaveLoading  } from 'react-loadingg';


class InnerContent extends Component {
	state = {
		data: [],
		page: 1,
		totalItems: 0,
		visible: 4,
		loading: true

	};

	loadMore = this.loadMore.bind(this);
	getDrillsData = () => {
		axios
			.get(`${config.API_URL}/admin/drills/?page=${this.state.page}`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState({
					data: [...this.state.data, ...response.data.data.drills],
					page: this.state.page + 1,
					totalItems: response.data.count,
					loading: false
				});
			
			});
	};
	componentDidMount() {
		this.getDrillsData();
	}
	loadMore() {
		this.getDrillsData();
	}
	dateDifferenceInDays(date1, date2) {
		const diffInMs = Math.abs(date1 - date2);
		// console.log(diffInMs)
		// console.log(parseInt(diffInMs/(1000 * 60 * 60 * 24)))
		if (parseInt(diffInMs / (1000 * 60 * 60 * 24)) > 7) {
			return "";
		} else {
			return (
				<li>
					<span className='new' style={{ color: 'white' }}>New</span>
				</li>
			);
		}
	}
	isPremimum(status) {
		console.log(status);
		if (status == false) {
			return "";
		} else {
			return (
				<li>
					<span className='premium'>Premium</span>
				</li>
			);
		}
	}

	addToFavourite = (drillId) => {
		const response = {
			favouriteDrillVideos: drillId,
			isAdded: true,
		};
		axios
			.post(`${config.API_URL}/user/favoriteVideo`, response, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => { });
	};

	totalLikes = (videos) => {
		const length = videos.length;
		var sum = 0;
		if (length > 0) {
			videos.map((video, index) => {

				sum = sum + video.totalLikes;

			})

		}

		if (sum >= 0) {
			return (
				<div>
					<img src={heartIcon} alt='' /> <span style={{marginRight: "6px"}}>{sum}</span>
				</div>

			);
		}
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
					<img src={durationIcon} alt='' /> {sum}
				</li>

			);
		}
	}

	durationDisplay = (seconds) =>{
		const format = val => `0${Math.floor(val)}`.slice(-2)
		const hours = seconds / 3600
		const minutes = (seconds % 3600) / 60
	  
		return [hours, minutes, seconds % 60].map(format).join(':')
	  }

	render() {
		if (this.state.loading) {
			return (
					
					<WaveLoading size={"large"}  />
				
			);
		  }
		const data = this.state.data;
		if (data.length > 0) {
			return (
				<div className='mainInnerContent'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-7 col-sm-8 col-xs-12 hidden-xs hidden-sm'>
								{data.map((drills, index) => {
									return (
										<div key={index} className='videoMain form-group'>
											<Link to={`/drills/detail/${drills._id}`}>
												<div className='videoHeader'>
													<div className='row'>
														<div className='col-md-1 col-sm-2 col-xs-2'>
																								
														{(drills.athlete.image === undefined || drills.athlete.image === "null") ? (
															
																<img src={userIcon} style={{ width: "55px", borderRadius: "50%", height: "55px" }} onError={(e)=>{e.target.src=userIcon}}/>
																
															) : (

																<img src={drills.athlete ? `${config.IMG_URL}/image/${drills.athlete.image}` : userIcon} style={{ width: "55px", borderRadius: "50%", height: "55px" }} onError={(e)=>{e.target.src=userIcon}}/>
															)
														}
														
															
														</div>
														<div className='col-md-11 col-sm-10 col-xs-9'>
															<h4>{drills.athlete ? drills.athlete.name : "Name Not Found"}</h4>
														</div>
													</div>
												</div>
												<div className='videoMainArea' style={{backgroundColor: "#000000", borderRadius: "5px"}}>
												<Link to={`/drills/detail/${drills._id}`}>
																										
														
														{(drills.thumbnail === undefined || drills.thumbnail === "null") ? (
																<img src={videoThumbnail} style={{borderRadius: "5px", opacity: 0.5}}/>
																
																
															) : (
																<img src={drills && drills.thumbnail ? `${config.IMG_URL}/image/drills/${drills.thumbnail}` : videoThumbnail} style={{borderRadius: "5px", opacity: 0.5}} onError={(e)=>{e.target.src=videoThumbnail}}/>
															)
														}
														
														<div className='videoPlay'>
																<img src={playIcon} alt='' />
														</div>
													</Link>
													<div className='durationSettings'>
														<ul className='list-unstyled'>
															{console.log(drills)}
															<li style={{ color: "white" }}>
																<img src={durationIcon} alt='' /> {this.durationDisplay(drills.duration)}
															</li>
															
														</ul>
													</div>
													{/* <div className='videoName'>
														<img src={videoNameIcon} alt='' />
														<span>Video name will show here </span>
													</div> */}
													<div className='videoSettings'>
														<div className='col-md-6 col-sm-6 col-xs-6'>
															<ul className='videoLeftSettings list-unstyled'>
																<li>
																	<span className='easy'>
																		{drills.difficultyLevel ? drills.difficultyLevel.name : "Name Not Found"}
																	</span>
																</li>
															</ul>
														</div>
														<div className='col-md-6 col-sm-6 col-xs-6'>
															<ul className='videoRightSettings list-unstyled'>
																
																{
																this.dateDifferenceInDays(new Date(), new Date(drills.createdAt))}
																{/* {this.isPremimum(drills.isPremium)} */}
															</ul>
														</div>
													</div>
												</div>
											</Link>
										</div>
									);
								})}
								<hr />
								{this.state.totalItems < data.length && (
									<div className='col-md-12 col-sm-12 col-xs-12 hidden-xs text-center'>
										<button type='button' onClick={this.loadMore} className={"btn btn-sm btn-primary"}>
											Load More
										</button>
									</div>
								)}
							</div>
							<div className='col-md-5 col-sm-12 col-xs-12 '>
								<div className='drillsArea'>
									<div className='row hidden-xs hidden-sm'>
										<div className='col-md-6 col-sm-6 col-xs-6'>
											<h3>Drills</h3>
										</div>
										<div className='col-md-6 col-sm-6 col-xs-6 text-right'>
											<Link to='/drills'>See All </Link>
										</div>
									</div>
									<div className='drillsMain' style={{ marginBottom: "50px"}}>
										{data.slice(0, this.state.visible).map((drills, index) => {
											return (
												<div key={index} className='videoMain form-group'>
													<Link to={`/drills/detail/${drills._id}`}>
													<div className='videoMainArea' style={{backgroundColor: "#000000", borderRadius: "5px"}}>
														
														{(drills.thumbnail === undefined || drills.thumbnail === "null") ? (
																<img src={videoThumbnail} style={{borderRadius: "5px", opacity: 0.5}}/>
																
															) : (
																<img src={drills && drills.thumbnail ? `${config.IMG_URL}/image/drills/${drills.thumbnail}` : videoThumbnail} style={{borderRadius: "5px", opacity: 0.5}} onError={(e)=>{e.target.src=videoThumbnail}}/>
															)
														}
														
														<div className='videoName'>
															<img src={videoNameIcon} alt=''  />
															<span>{drills.name} </span>
														</div>

														<div className='videoSettings'>
															<Link to={`/drills/detail/${drills._id}`}>
																<div className='col-md-6 col-sm-6 col-xs-6'>
																	<ul className='videoLeftSettings uploader list-unstyled'>
																	{/* whiteSpace: "nowrap", textOverflow: "ellipsis", width: "150px", overflow: "hidden" */}
																		<li>
																			<span className="textoverflow">
																				<img
																					style={{ width: "25px", borderRadius: "50px" }}
																					src={
																						drills.athlete
																							? `${config.IMG_URL}/image/${drills.athlete.image}`
																							: userIcon
																					}
																					alt=''
																					onError={(e)=>{e.target.src=userIcon}}
																				/>{" "}
																				&nbsp; {drills.athlete ? drills.athlete.name : "Name Not Found"}
																			</span>
																		</li>
																	</ul>
																</div>
															</Link>
															<div className='col-md-6 col-sm-6 col-xs-6'>
																<ul className='videoRightSettings favourite list-unstyled'>

																	{

																	}
																	<li>

																		{
																			(drills.videos)
																				? (
																					this.totalLikes(drills.videos)
																				)
																				:

																				(
																					""
																				)
																		}
																		{/* <a href='#' onClick={() => this.addToFavourite(drills._id)}> */}

																		{/* </a> */}
																	</li>
																</ul>
															</div>
														</div>

														<div className='durationSettings'>
															<ul className='list-unstyled'>
																<li>{drills.videos ? drills.videos.length : 0} Drills</li>
																<li>
																	{/* {
																		(drills.videos)
																			? (
																				this.totalLikes(drills.videos)
																			)
																			:

																			(
																				""
																			)
																	} */}
																	<img src={durationIcon} alt='' /> {this.durationDisplay(drills.duration)}
																</li>
															</ul>
														</div>
													</div>
													</Link>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (<WaveLoading size={"large"}  />);
		}
	}
}

export default InnerContent;
