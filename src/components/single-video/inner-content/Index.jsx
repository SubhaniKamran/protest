import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Redirect} from 'react-router';
import ReactPlayer from "react-player";
import config from "../../../config";
import axios from "axios";
import Auth from "../../Services/Auth";
import VideoLarge from "../../../assets/images/video.png";
import Play from "../../../assets/images/play.png";
import ArrowUp from "../../../assets/images/arrowUp.png";
import ArrowDown from "../../../assets/images/arrowDown.png";
import PlaySmall from "../../../assets/images/playSm.png";
// import AddToFav from "../../../assets/images/addToFav.png";
// import WatchList from "../../../assets/images/watchList.png";
// import unWatch from "../../../assets/images/unwatch.png";
import RepeatSm from "../../../assets/images/repeatSm.png";
import RepeatLg from "../../../assets/images/repeatLg.png";
// import FavChecked from "../../../assets/images/favChecked.png";
import "../../../assets/css/responsive-player.css";
import { withRouter } from "react-router";
import { func } from "joi";
import moment from 'moment';



import addToFavWeb from "../../../assets/images/web_view/my-fav-icons/MyFav_filled.svg";

import addToUnFavWeb from "../../../assets/images/web_view/my-fav-icons/MyFav_empty.svg";

import addtoWatchListWeb from "../../../assets/images/web_view/my-workout-icons/MyWorkout_Filled.svg";

import addtoUnWatchListWeb from "../../../assets/images/web_view/my-workout-icons/MyWorkout_empty.svg";

import addToFavMobile from "../../../assets/images/mobile_view/my-fav-icons/MyFav_filled.svg";

import addToUnFavMobile from "../../../assets/images/mobile_view/my-fav-icons/MyFav_empty.svg";

import addtoWatchListMobile from "../../../assets/images/mobile_view/my-workout-icons/MyWorkout_filled.svg";

import addtoUnWatchListMobile from "../../../assets/images/mobile_view/my-workout-icons/MyWorkout_empty.svg";

import { WaveLoading  } from 'react-loadingg';


class InnerContent extends Component {
	state = {
		data: [],
		videoCount: 0,
		index: 0,
		videosData: [],
		vidoePlay: null,
		isplay: true,
		increaseArrow: true,
		decreaseArrow: false,
		src: null,
		videoId: null,
		earnedPoint: false,
		favChecked: false,
		userDetail: [],
		favouriteDrillVideos: [],
		watchLaterDrillVideos: [],
		watchedVideos: [],
		videoId: '',
		drillId: '',
		videoFav: [],
		subscribedUser:"",
		changeVideo: false,
		loading: true
	};

	componentDidMount() {
		this.setState({
			videoId: this.props.videoId,
			drillId: this.props.id
		}, function () {
			this.getDrillsData();
			this.getUserDetail();
		});

	}

	getDrillsData = () => {

		axios
			.get(`${config.API_URL}/admin/drills/${this.state.drillId}`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState(
					{
						data: [...response.data.data.drills],
						
					},
					function () {

						this.setVideosdata();
						this.playerVideo();
					}
				);
			});
	};

	getUserDetail = () => {
		
		axios
			.get(`${config.API_URL}/user/detail`, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				const data = response.data.data.user[0];
				if (data.favouriteDrillVideos.length > 0) {
					this.setState(
						{
							favouriteDrillVideos: [...data.favouriteDrillVideos],
						});
				} else {
					this.setState(
						{
							favouriteDrillVideos: [],
						});
				}
				if (data.watchLaterDrillVideos.length > 0) {
					this.setState(
						{
							watchLaterDrillVideos: [...data.watchLaterDrillVideos],
						});
				} else {
					this.setState(
						{
							watchLaterDrillVideos: [],
						});
				}
				if (data.watchedVideos.length > 0) {
					this.setState(
						{
							watchedVideos: [...data.watchedVideos],
						});
				} else {
					this.setState(
						{
							watchedVideos: [],
						});
				}
				
				if (data.transection) {
					this.setState(
						{
							subscribedUser: data.transection,
						});
				} else {
					this.setState(
						{
							subscribedUser: "",
							
						});
				}
			})
			.catch((error) => console.log(error));
	};

	setVideosdata() {
		this.setState({
			videoCount: this.state.data[0].videos.length,
			videosData: [...this.state.data[0].videos],
			loading: false
		});
	}

	onChangeIncreasePlayerVideo(Increase) {


			const checkIndex = this.state.index;
			if (checkIndex < this.state.videoCount - 1) {
				this.setState({
					index: checkIndex + 1,
					decreaseArrow: true,
					increaseArrow: true,
					loading: false
				});
			} else {
				this.setState({
					decreaseArrow: true,
					increaseArrow: false,
					loading: false
				});
			}


	}

	onChangeDecreasePlayerVideo(Decrease) {


			const checkIndex = this.state.index;

			if (checkIndex <= this.state.videoCount - 1 && checkIndex > 0) {
	
				this.setState({
					index: checkIndex - 1,
					increaseArrow: true,
					decreaseArrow: true,
					loading: false
	
				});
			} else {
				this.setState({
					increaseArrow: true,
					decreaseArrow: false,
					loading: false
				});
			}


	}



	playerVideo() {
		this.setState(
			{
				vidoePlay: this.state.videosData[this.state.index],
			},
			function () {
				// if (this.state.favouriteDrillVideos.length > 0) {
				// 	this.favouriteToogle();
				// }

				this.state.videosData.filter((video, index) => {

					if (video._id == this.state.videoId) {
						this.setState({
							index: index
						}, function () {

							if (this.state.index > 1) {
								this.setState({
									decreaseArrow: true
								})
							}
							if (this.setState.index === this.state.videosData.length - 1) {
								this.setState({
									increaseArrow: false
								})
							}
						});
					}
				});
			}
		);
	}

	isPremimum(status) {

		const premiumContent = this.state.videosData[this.state.index];
		
		if(premiumContent.isPremium){
			return (
				<li>
					<Link to='#' className='premium'>
						Premium
					</Link>
				</li>
			);
		} else {
			return "";
		}
	}



	startVideo(startVideo) {

		this.setState({
			changeVideo: false,
		})

		const premiumContent = this.state.videosData[this.state.index];
		if(premiumContent.isPremium){

			var start = moment(this.state.subscribedUser.date);
			var current = moment().startOf('minute');
			const duration = moment.duration(current.diff(start)).asDays()
			if(this.state.subscribedUser && duration <= 30)
			{
				this.setState({
					isplay: false,
					src: this.state.videosData[this.state.index].video,
					videoId: this.state.videosData[this.state.index]._id,
				});
			}else
			{
				this.props.history.push("/subscription");
			}
			
		  
		}
		else{
			
			this.setState({
				isplay: false,
				src: this.state.videosData[this.state.index].video,
				videoId: this.state.videosData[this.state.index]._id,
			});

		}
		
	}

	earnedPoints = () => {

		const response = {
			watchedVideos: [
				{
					video_id: this.state.videoId,
					drill_id: this.state.data[0]._id,
					diffculty_id: this.state.data[0].difficultyLevel._id,
					speed_level_id: this.state.videosData[this.state.index].speedLevel._id,
				},
			],
		};
		axios
			.post(`${config.API_URL}/user/points`, response, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState({
					earnedPoint: true,
					isplay: true,
					
				}, function () {
					this.getUserDetail();
					this.watchVideosCount(this.state.videoId);
					this.userActivity(this.state.videoId, this.state.data[0]._id);
				});
			});
	};

	addToFavourite = (videoId, status) => {
		const response = {
			video_id: videoId,
			drill_id: this.state.drillId,
			isAdded: status,
		};
		axios
			.post(`${config.API_URL}/user/favoriteVideo`, response, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState({
					videoId: this.props.videoId,
					drillId: this.props.id
				}, function () {

					this.getUserDetail();
					this.checkFavourites(videoId);
					this.totalLikes(videoId, this.state.drillId, status);
				});
			});
	};

	watchLater = (videoId, status) => {
		const response = {
			video_id: videoId,
			drill_id: this.state.drillId,
			isAdded: status,
		};
		axios
			.post(`${config.API_URL}/user/watchLater`, response, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {
				this.setState({
					videoId: this.props.videoId,
					drillId: this.props.id,
					favouriteDrillVideos: [],
					videosData: []
				}, function () {
					this.getDrillsData();
					this.getUserDetail();
				});

			});
	};
	checkFavourites = (videoId, type) => {
		const length = this.state.favouriteDrillVideos.length;
		const favVideo = this.state.favouriteDrillVideos;
		let videoFav = [];
		if (length > 0) {

			videoFav = favVideo.filter((fav, ith) => fav.video_id === videoId)

			if (videoFav.length > 0) {
				return (
					<span onClick={() => this.addToFavourite(videoId, false)}>
						<img src={type == 'web' ? addToFavWeb : addToFavMobile} alt='' />
					</span>
				);
			} else {
				return (
					<span onClick={() => this.addToFavourite(videoId, true)}>
						<img src={type == 'web' ? addToUnFavWeb : addToUnFavMobile} alt='' />
					</span>
				);
			}


		} else {
			return (
				<span onClick={() => this.addToFavourite(videoId, true)}>
					<img src={type == 'web' ? addToUnFavWeb : addToUnFavMobile} alt='' />
				</span>
			);

		}
		// 

	}


	checkWatchList = (videoId, type) => {
		const length = this.state.watchLaterDrillVideos.length;
		const watchVideo = this.state.watchLaterDrillVideos;
		let videoWatch = [];
		if (length > 0) {

			videoWatch = watchVideo.filter((watch, ith) => watch.video_id === videoId)

			if (videoWatch.length > 0) {
				return (
					<span onClick={() => this.watchLater(videoId, false)}>
						<img src={type == 'web' ? addtoWatchListWeb : addtoWatchListMobile} alt='' />
					</span>
				);
			} else {
				return (
					<span onClick={() => this.watchLater(videoId, true)}>
						<img src={type == 'web' ? addtoUnWatchListWeb : addtoUnWatchListMobile} alt='' />
					</span>
				);
			}


		} else {
			return (
				<span onClick={() => this.watchLater(videoId, true)}>
					<img src={type == 'web' ? addtoUnWatchListWeb : addtoUnWatchListMobile} alt='' />
				</span>
			);

		}


	}

	watchVideosCount = (videoId) => {
		const length = this.state.watchedVideos.length;
		const watchVideos = this.state.watchedVideos;
		let videoWatch = [];

		if (length > 0) {
			videoWatch = watchVideos.filter((watch, ith) => watch.video_id === videoId)
			if (videoWatch.length > 0) {
				
				return videoWatch[0].watch_count;

			} else {
				return 0;
			}

		} else {
			return 0;
		}

	}

	userActivity = (videoId, drillId) => {
		const response = {
			"video_id": videoId,
			"drill_id": drillId,
			"type": "video"
		}
		axios
			.post(`${config.API_URL}/admin/activity`, response, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {


			});
	}

	totalLikes = (videoId, drillId, status) => {
		const response =
		{
			"drill_id": drillId,
			"video_id": videoId,
			"isLike": status

		}
		axios
			.post(`${config.API_URL}/totallikes`, response, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {


			});
	}
	render() {
		

		const currentVideo = this.state.videosData[this.state.index];
		

		if (this.state.loading) {
			return (
					
					<WaveLoading size={"large"}  />
				
			);
		  }

		const data = this.state.data;
		if (currentVideo != null && data.length > 0) {

			return (
				<div className='mainInnerContent'>

			{data.map((drills, i) => {
						return (
							<div key={i} className='container'>
								<div className='searchResultsParent'>
									{/* <h3 className='hidden-xs'>Video Thumbnail will shown here </h3> */}

									<div className='videoLg'>
										<div className='videoMain form-group '>
											{this.state.isplay ? (
												<div>
													<div className='videoMainArea videoOpacity'>
														<img
															src={
																currentVideo != null && currentVideo
																	? `${config.IMG_URL}/image/drills/${currentVideo.thumbnail}`
																	: VideoLarge
															}
															alt=''
															style={{border: "2px solid #FEE6CC"}}
															onError={(e)=> e.target.src=VideoLarge}
														/>
														<div className="videoOpacityContent">

															<div className='videoPlay videoRepeat videoOpacityUpperLayer'
																onClick={() => this.startVideo("startVideo")}
																style={{ display: this.state.earnedPoint ? "block" : "none" }}
															>

																{
																	(this.state.changeVideo) ? 
																	
																	<img style={{marginLeft: "20px"}} src={Play} alt='' />
																	:
																	<img src={RepeatLg} alt='' />

																}


															</div>
															<div className='videoInfoOverlay hidden-xs videoOpacityUpperLayer'
																style={{ display: this.state.earnedPoint ? "block" : "none" }}
															>
																{

																	(
																		(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) > 0) ? 

																	"" :



																		<div style={{ display: this.state.earnedPoint ? "block" : "none", borderRadius: "10px", backgroundColor: "#000000", paddingLeft: "25px", paddingTop: "5px", paddingBottom: "5px" }}>
																				<h5>
																					<strong>
																						{
																								((currentVideo.speedLevel.condition)*this.state.data[0].difficultyLevel.points) + currentVideo.speedLevel.points

																						}
																					</strong>{" "}
																					Points Earned
																				</h5>

																		</div>

																	}

															
																<h6 style={{color : "#FEE6CC"}}>
																	<b>

																		Watch Video{" "}
																		{currentVideo != null &&
																			currentVideo != null &&
																			currentVideo.speedLevel != null
																			? (
																				(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) >=0 ?
																				(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) :0
																			)
																			: 0}
																		x (times) again to earn{" "}
																			{currentVideo != null &&
																				currentVideo != null &&
																				currentVideo.speedLevel != null
																				?(
																					(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) * (currentVideo.speedLevel.points/currentVideo.speedLevel.condition) + ((currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id)))*this.state.data[0].difficultyLevel.points)
																					>=0 ? 
																					(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) * (currentVideo.speedLevel.points/currentVideo.speedLevel.condition) + ((currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id)))*this.state.data[0].difficultyLevel.points)
																					
																					: 0)
																				
																				: 0}{" "}
																			
																		points

																	</b>
															</h6>
															</div>
													
															<div className='videoPlay videoOpacityUpperLayer'
																style={{ display: this.state.earnedPoint ? "none" : "block"}}
																onClick={() => this.startVideo("startVideo")}
																>
																	<Link to='#'>
																		<img src={Play} alt=''/>
																	</Link>
															</div>
															
															<div className='videoSettings videoOpacityUpperLayer'>
																<div className='col-md-12 col-sm-12 col-xs-12'>
																	<ul className='videoRightSettings list-unstyled'>{this.isPremimum(drills)}</ul>
																</div>
															</div>
														</div>
													</div>
													<div className='videoBtmOptions hidden-xs'>
														<div className='row'>
															<div className='col-md-4 col-sm-4 speedLevel'>
																<h4>Speed level</h4>
																<div className='col-md-2 col-sm-2 speedLevelControl'>
																	<div className='row'>
																		<div className='col-md-12 form-group'>
																			<Link to="#"
																				className={this.state.decreaseArrow == false ? "disbaledBtn" : ""}
																				onClick={() => this.onChangeDecreasePlayerVideo("decrease")}
																			>
																				<img src={ArrowUp} alt='' />
																			</Link>
																		</div>
																		<div className='col-md-12 form-group '>
																			<Link to="#"
																				className={this.state.increaseArrow == false ? "disbaledBtn" : ""}
																				onClick={() => this.onChangeIncreasePlayerVideo("increase")}
																			>
																				<img src={ArrowDown} alt='' />
																			</Link>
																		</div>
																	</div>
																</div>
																<h5>{this.state.index + 1}</h5>
															</div>
															<div
																className='col-md-4 col-sm-4 startVideo'
																style={{ display: this.state.earnedPoint ? "none" : "block" }}
																onClick={() => this.startVideo("startVideo")}
															>
																<Link to="#">
																	<img src={PlaySmall} alt='' /> &nbsp; Start
																</Link>
															</div>

															<div
																className='col-md-4 col-sm-4 startVideo repeatVid'
																style={{ display: this.state.earnedPoint ? "block" : "none" }}
																onClick={() => this.startVideo("startVideo")}
															>
																<Link to='#'>
																	<img src={RepeatSm} alt='' /> &nbsp; Repeat
																</Link>
															</div>
															<div className='col-md-4 col-sm-4 vidFavWishOptions'>
																<ul className='list-unstyled list-inline'>
																	<li style={{cursor: "pointer"}}>


																		{currentVideo != null ? (
																			this.checkFavourites(currentVideo._id, 'web')

																		) : (

																				""
																			)}
																	</li>
																	<li style={{cursor: "pointer"}}>


																		{currentVideo != null ? (
																			this.checkWatchList(currentVideo._id, 'web')

																		) : (

																				""
																			)}

																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
											) : (
													<div className='player-wrapper'>
														<ReactPlayer
															className='react-player'
															config={{ file: { attributes: { controlsList: 'nodownload'} } }}
  															// onContextMenu={e => e.preventDefault()}
															width='100%'
															height='100%'
															controls={true}
															playing={true}
															url={`${config.IMG_URL}/image/drills/${this.state.src}`}
															onEnded={this.earnedPoints.bind(this)}
														/>
													</div>
												)}

											<div className='videoDrillTexts hidden-xs'>
												<h3>DRILL SUMMARY</h3>
												<p>Category : {drills.category ? drills.category.name : "Categroy Not Found"}</p>
												<p>Difficulty level : {drills.difficultyLevel ? drills.difficultyLevel.name : "Difficulty Level Not Found"}</p>
												{/* <p>Speed level : {currentVideo.id}</p> */}
											</div>

											<div className='videoPageBtmSettings hidden-lg hidden-md hidden-sm'>
												<div className='row form-group'>
													<div className='col-xs-9'>
														<h4>{drills.name}</h4>
														<p>Category : {drills.category ? drills.category.name : "Categroy Not Found"}</p>
														<p>
															Difficulty level :{" "}
															{drills.difficultyLevel ? drills.difficultyLevel.name : "Difficulty Level Not Found"}
														</p>
													</div>
													<div className='col-xs-3 vidFavWishOptions'>
														<ul className='list-unstyled list-inline'>
															<li style={{cursor: "pointer"}}>

																{currentVideo != null ? (
																	this.checkFavourites(currentVideo._id, 'mobile')

																) : (

																		""
																	)}
															</li>
															<li style={{cursor: "pointer"}}>
																{currentVideo != null ? (
																	this.checkWatchList(currentVideo._id, 'mobile')

																) : (

																		""
																	)}

															</li>
														</ul>
													</div>
												</div>


								
												<div className='speedLevelSettingsMain form-group' style={{marginTop: "-200px"}}>
													
													{
														(this.state.isplay == false) ? 
															
															""
															:
															
															<div>
													
																<div className='row'>
																		<div className='col-xs-3' style={{marginRight: "5px"}}>
																		
																		</div>


																		{

																		(
																			(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) > 0) ? 

																		"" :



																			<div style={{ display: this.state.earnedPoint ? "block" : "none", borderRadius: "10px", backgroundColor: "#000000", paddingLeft: "25px", paddingTop: "5px", paddingBottom: "5px" }}>
																					<h5>
																						<strong>
																							{
																									((currentVideo.speedLevel.condition)*this.state.data[0].difficultyLevel.points) + currentVideo.speedLevel.points

																							}
																						</strong>{" "}
																						Points Earned
																					</h5>

																			</div>

																		}

																		<div className='col-xs-6' >

																			{
																			
																			(
																				(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) > 0) ? 
																			
																			"" :
																			
																			
																	
																				<div style={{ display: this.state.earnedPoint ? "block" : "none", borderRadius: "10px", backgroundColor: "#000000", paddingLeft: "25px", paddingTop: "5px", paddingBottom: "5px" }}>
																						<h5>
																							<strong>
																								{
																										((this.watchVideosCount(currentVideo._id))*this.state.data[0].difficultyLevel.points) + currentVideo.speedLevel.points

																								}
																							</strong>{" "}
																							Points Earned
																						</h5>
																			
																				</div>

																			}

																		
																	
																		</div>
																		<div className='col-xs-3'>
																			
																		</div>
																	</div>
																<div className='row' style={{marginBottom: "10px"}}>
																	
																	<div className='col-xs-12'>
																		<div className=''
																				style={{ display: this.state.earnedPoint ? "block" : "none", textAlign: "center" }}
																			>
																		
																						<h6 style={{color: "#FEE6CC"}}>
																							<b>

																								Watch Video{" "}
																								{currentVideo != null &&
																									currentVideo != null &&
																									currentVideo.speedLevel != null
																									? (
																										
																										(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) >=0 ?
																										(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) :0
																									)
																									: 0}
																								x (times) again to earn{" "}
																									{currentVideo != null &&
																										currentVideo != null &&
																										currentVideo.speedLevel != null
																										?(
																											(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) * (currentVideo.speedLevel.points/currentVideo.speedLevel.condition) + ((currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id)))*this.state.data[0].difficultyLevel.points)
																											>=0 ? 
																											(currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id))) * (currentVideo.speedLevel.points/currentVideo.speedLevel.condition) + ((currentVideo.speedLevel.condition - (this.watchVideosCount(currentVideo._id)))*this.state.data[0].difficultyLevel.points)
																											
																											: 0)
																										
																										: 0}{" "}
																									
																								points

																							</b>
																					</h6>
																				
																			</div>
																
																	</div>
													
																</div>
													

															
															</div>

													}

													{
														(this.state.isplay == true) ? 

														<div className='row'>
														<div className='col-xs-6'>
															<div className='speedLevelSettings'>
																<h5>
																	Speed level <span style={{fontSize: "18px", marginLeft: "5px"}}>{this.state.index + 1}</span>
																</h5>
															</div>
														</div>
														<div className='col-xs-3'>
															<div className='speedLevelControl'>
																<Link to="#"
																	className={this.state.decreaseArrow == false ? "disbaledBtn" : ""}
																	onClick={() => this.onChangeDecreasePlayerVideo("decrease")}
																>
																	<img src={ArrowUp} alt='' />
																</Link>
															</div>
														</div>
														<div className='col-xs-3'>
															<div className='speedLevelControl'>
																<Link to="#"
																	className={this.state.increaseArrow == false ? "disbaledBtn" : ""}
																	onClick={() => this.onChangeIncreasePlayerVideo("increase")}
																>
																	<img src={ArrowDown} alt='' />
																</Link>
															</div>
														</div>
														<div className='clearfix'></div>
													</div>

													:
													""


													}
													
												</div>
											
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
			
				</div>
			);
		} else {
			return "azeem";
		}
	}
}

export default withRouter(InnerContent);
