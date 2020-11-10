import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import Auth from "../../Services/Auth";
import Axios from "axios";
import momentJs from "moment";
import userIcon from "../../../assets/images/user.png";

import playIcon from "../../../assets/images/play.png";
import videoThumbnail from "../../../assets/images/videoPlain.png";
import videoNameIcon from "../../../assets/images/videoNameIcon.png";
import FavouiteIcon from "../../../assets/images/favChecked.png";
import userImage from "../../../assets/images/userImage.png";
import workoutIcon from "../../../assets/images/workoutImg.png";
import favtIcon from "../../../assets/images/favouriteImg.png";
import activityIcon from "../../../assets/images/activityIcon.png";
import durationIcon from "../../../assets/images/durationIcon.png";
import { func } from "joi";
import { WaveLoading  } from 'react-loadingg';
import { act } from "@testing-library/react";

class InnerContent extends Component {
	state = {
		myActivity: [],
		myFavoutires: [],
		myWorksOut: [],
		activityTab: false,
		favouriteTab: false,
		workoutTab: true,
		atheletes: [],
		loading: true
	};
	componentDidMount() {

		this.getAtheltes();
		Axios.get(`${config.API_URL}/user/detail`, {
			headers: {
				Authorization: Auth.getToken(),
			},
		}).then((response) => {
				const data = response.data.data.user[0];
				const dataActivity = response.data.data.activity;

				console.log(data)

				if (data.favouriteDrillVideos.length > 0) {
					this.setState({
						myFavoutires: [...data.favouriteDrillVideos],
					});
				}

				if (data.watchLaterDrillVideos && data.watchLaterDrillVideos != null && data.watchLaterDrillVideos.length > 0) {
					this.setState({
						// myActivity: [...data.watchLaterDrillVideos],

						myWorksOut: [...data.watchLaterDrillVideos],
					});
				}
				if (dataActivity && dataActivity != null && dataActivity.length > 0) {

					const myActivityArray = [];
					dataActivity.reverse().map((dataAct)=>{

											
							const drillResponse = {
								drill_id: dataAct.drill_id
							}


							Axios.post(`${config.API_URL}/drill/drillName`, drillResponse, {
								headers: {
									Authorization: Auth.getToken(),
								},
							}).then((response) => {

								const myActivityList = {
									user_id: dataAct.user_id,
									drill_id: dataAct.drill_id,
									drill_name: response.data.data.drills.name,
									createdAt: dataAct.createdAt
								}

								myActivityArray.push(myActivityList)
								
							}).catch((error) => console.log(error));


					});



					this.setState({
						myActivity: myActivityArray,
						loading: false

					});

					

				}


				// Axios.post(`${config.API_URL}/user/watchLater`, drillResponse, {
				// 	headers: {
				// 		Authorization: Auth.getToken(),
				// 	},
				// }).then((response) => {

				// 		console.log(response)
					
				// }).catch((error) => console.log(error));





			this.setState( {
				loading: false
			})



			


			})
			.catch((error) => console.log(error));

		

	}
	
	dateDifferenceInDays(date1, date2) {
		const diffInMs = Math.abs(date1 - date2);

		if (parseInt(diffInMs / (1000 * 60 * 60 * 24) > 7)) {
			return "";
		} else {
			return (
				<li>
					<span className='new'>New</span>
				</li>
			);
		}
	}

	isPremimum(status) {
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

	handleTabs = (tab) => {
		if (tab === "myActivity") {
			this.setState({
				activityTab: true,
				favouriteTab: false,
				workoutTab: false,
			});
		}

		if (tab === "myFavourites") {
			this.setState({
				activityTab: false,
				favouriteTab: true,
				workoutTab: false,
			});
		}

		if (tab === "myWorkOut") {
			this.setState({
				activityTab: false,
				favouriteTab: false,
				workoutTab: true,
			});
		}
	};

	getAtheltes() {
		let athelte = [];

		Axios.get(`${config.API_URL}/admin/athlete`, {
			headers: {
				Authorization: Auth.getToken(),
			},
		}).then((response) => {

			if (response.status === 200 && response.data.data.athlete.length > 0) {
				this.setState({
					atheletes: [...response.data.data.athlete]
				})

			}

		}).catch((error) => console.log(error));

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


	render() {
		const { activityTab, favouriteTab, workoutTab, myActivity, myFavoutires, myWorksOut } = this.state;
		
		if (this.state.loading) {
			return (
					
					<WaveLoading size={"large"}  />
				
			);
		  }
		  
		return (
			<div className='mainInnerContent innerMainProfileContent'>
				<div className='container'>
					<ul className='nav nav-tabs'>
						<li className={workoutTab ? "active" : ""} onClick={() => this.handleTabs("myWorkOut")}>
							<Link data-toggle='tab' to='#workout'>
								<img src={workoutIcon} alt='' /> <span>My Workout</span>
							</Link>
						</li>
						<li className={favouriteTab ? "active" : ""} onClick={() => this.handleTabs("myFavourites")}>
							<Link data-toggle='tab' to='#fav'>
								<img src={favtIcon} alt='' /> <span>Favourities</span>
							</Link>
						</li>
						<li className={activityTab ? "active" : ""} onClick={() => this.handleTabs("myActivity")}>
							<Link data-toggle='tab' to='#act'>
								<img src={activityIcon} alt='' /> <span>My Activities</span>
							</Link>
						</li>
					</ul>

					<div className='tab-content'>
						<div
							id='workout'
							style={{ display: workoutTab ? "block" : "none" }}
							className={workoutTab ? "tab-pane fade in active" : "tab-pane fade"}>

							<div className='row'>
								{myWorksOut.length > 0 ? (
									[...this.state.myWorksOut].reverse().map((drills, index) => {
										let atheleteName = '';
										let atheleteImage = '';
										let videoImage = '';
										let videos = {};
										let athelte = {};
										if (drills.drill_id) {

											athelte = this.state.atheletes.filter((athelete, ith) => athelete._id === drills.drill_id[0].athlete)


											if (athelte.length > 0) {
												atheleteName = athelte[0].name;
												atheleteImage = `${config.IMG_URL}/image/${athelte[0].image}`;
											} else {
												atheleteName = 'Name Not Found';
												atheleteImage = userIcon;
											}


											if (drills.drill_id && drills.drill_id[0].videos != null && drills.drill_id[0].videos.length > 0) {

												videos = drills.drill_id[0].videos.filter((video, ith) => video._id === drills.video_id)

												if (videos.length > 0) {
													videoImage = `${config.IMG_URL}/image/drills/${videos[0].thumbnail}`

												} else {

													videoImage = videoThumbnail;
												}



											} else {


												videoImage = videoThumbnail;
											}

										} else {
											atheleteName = 'Name Not Found';
											atheleteImage = userIcon;
										}
										return (

											<div key={index} className='col-md-6 col-sm-6 col-xs-12'>
												<div className='drillsArea drillsMain2'>
													<div className='drillsMain'>
														<div key={index} className='videoMain form-group'>
															<div className='videoHeader'>
																<div className='row'>
																	<div className='col-md-1 col-sm-2 col-xs-2'>
																		<img
																			style={{ width: "40px" , borderRadius:"50%"}}
																			src={atheleteImage}
																			alt=''
																			onError = {(e) =>e.target.src = userIcon}
																		/>
																	</div>
																	<div className='col-md-11 col-sm-10 col-xs-9'>
																		<h4>{atheleteName}</h4>

																	</div>
																</div>
															</div>
															<div className='videoMainArea' className='videoMainArea' style={{backgroundColor: "#000000", borderRadius: "5px"}}>
																<img src={videoImage} alt='' style={{borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", opacity: 0.5}} onError={(e)=>e.target.src = videoThumbnail}/>
																<div className='videoPlay'>
																	{
																		drills.drill_id ? (
																			<Link to={`/single/video/${drills.drill_id[0]._id}/${drills.video_id}`}>
																				<img src={playIcon} alt='' style={{marginTop:"10px"}}/>
																			</Link>
																		) : (
																				<Link to='#'>
																					<img src={playIcon} alt='' style={{marginTop:"10px"}}/>
																				</Link>

																			)
																	}

																</div>

																<div className='videoSettings'>
																	
																	<div className='col-md-6 col-sm-6 col-xs-6'>
																		<ul className='videoLeftSettings list-unstyled' style={{fontSize: "10px"}}>
																			<li>
																				<span className='easy'>
																					{drills.diffculty_id ? drills.diffculty_id[0].name : "Name Not Found"}
																				</span>
																			</li>
																		</ul>
																	</div>
																	<div className='col-md-6 col-sm-6 col-xs-6'>
																		<ul className='videoRightSettings list-unstyled' style={{fontSize: "10px", margin: "0px"}}>
																			{drills.drill_id ? this.dateDifferenceInDays(new Date(), new Date(drills.drill_id[0].createdAt)) : ''}
																			{drills.drill_id ? this.isPremimum(drills.drill_id[0].isPremium) : ''}
																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})
								) : (
										<h2 style={{ color: "#fee6cc", textAlign: "center" }}>No Record Found</h2>
									)}
							</div>
						</div>
						<div
							id='fav'
							style={{ display: favouriteTab ? "block" : "none" }}
							className={favouriteTab ? "tab-pane fade in active" : "tab-pane fade"}
						>
							<div className='row'>
								{myFavoutires.length > 0 ? (
									[...this.state.myFavoutires].reverse().map((favourties, index) => {

										let atheleteName = '';
										let atheleteImage = '';
										let videoImage = '';
										let videos = {};
										let athelte = {};
										if (favourties.drill_id) {

											athelte = this.state.atheletes.filter((athelete, ith) => athelete._id === favourties.drill_id[0].athlete)
											if (athelte.length > 0) {
												atheleteName = athelte[0].name;
												atheleteImage = `${config.IMG_URL}/image/${athelte[0].image}`;
											} else {
												atheleteName = 'Name Not Found';
												atheleteImage = userIcon;
											}


											if (favourties.drill_id && favourties.drill_id[0].videos != null && favourties.drill_id[0].videos.length > 0) {

												videos = favourties.drill_id[0].videos.filter((video, ith) => video._id === favourties.video_id)
												if (videos.length > 0) {
													videoImage = `${config.IMG_URL}/image/drills/${videos[0].thumbnail}`
												} else {
													videoImage = videoThumbnail;
												}


											} else {


												videoImage = videoThumbnail;
											}

										} else {
											atheleteName = 'Name Not Found';
											atheleteImage = userIcon;
										}







										return (
											<div key={index} className='col-md-6 col-sm-6 col-xs-12'>
												<div className='drillsArea drillsMain2'>
													<div className='drillsMain'>
														<div key={index} className='videoMain form-group'>
															<div className='videoHeader'>
																<div className='row'>
																	<div className='col-md-1 col-sm-2 col-xs-2'>
																		<img
																			style={{ width: "40px", borderRadius: "50%" }}
																			src={atheleteImage}
																			alt=''
																			onError={(e)=>e.target.src = userIcon}
																		/>
																	</div>
																	<div className='col-md-11 col-sm-10 col-xs-9'>
																		<h4>{atheleteName}</h4>
																	</div>
																</div>
															</div>
															<div className='videoMainArea' className='videoMainArea' style={{backgroundColor: "#000000", borderRadius: "5px"}}>
																<img
																	src={videoImage}
																	alt=''
																	style={{borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px", opacity: 0.5}} onError={(e)=>e.target.src = videoThumbnail}
																/>

																<div className='videoPlay'>
																	{
																		favourties.drill_id ? (
																			<Link to={`/single/video/${favourties.drill_id[0]._id}/${favourties.video_id}`}>
																				<img src={playIcon} alt=''  style={{marginTop:"10px"}} />
																			</Link>
																		) : (
																				<Link to='#'>
																					<img src={playIcon} alt=''  style={{marginTop:"10px"}} />
																				</Link>

																			)
																	}
																</div>
					

																<div className='videoSettings'>
																	<div className='col-md-6 col-sm-6 col-xs-6'>
																		<ul className='videoLeftSettings list-unstyled' style={{fontSize: "10px"}}>
																			<li>
																				{/* <span className='easy'>
																					{favourties.difficultyLevel
																						? favourties.difficultyLevel.name
																						: "Name Not Found"}
																				</span> */}
																			</li>
																		</ul>
																	</div>
																	<div className='col-md-6 col-sm-6 col-xs-6'>
																		<ul className='videoRightSettings list-unstyled' style={{fontSize: "10px"}}>

																			{favourties.drill_id ? this.dateDifferenceInDays(new Date(), new Date(favourties.drill_id[0].createdAt)) : ''}
																			{favourties.drill_id ? this.isPremimum(favourties.drill_id[0].isPremium) : ''}
																		</ul>
																	</div>
																</div>
																<div className='favChecked'>
																	<img src={FavouiteIcon} alt='' style={{width: "80%"}}/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})
								) : (
										<h2 style={{ color: "#fee6cc", textAlign: "center" }}>No Record Found</h2>
									)}
							</div>
						</div>
						<div id='act' style={{ display: activityTab ? "block" : "none" }} className={activityTab ? "tab-pane fade in active" : "tab-pane fade"}>
							<div className='searchResultsParent'>
								<div className='searchResultsMain'>
									
									{myActivity.length > 0 ? (
										[...this.state.myActivity].reverse().map((activity, index) => {
											
											return (
												<div key={index} className='searchResults form-group drillSearchSection'>
													<div className='col-md-6 col-sm-8 col-xs-9'>


														<span className='drillSearchName'>
														
															<span className='drillAtheleteName'>
																COMPLETED<strong>{" "} {activity.drill_name}</strong>
															</span>
														</span>
													</div>
													<div className='col-md-6 col-sm-4 col-xs-3 searchResultsFollowBtn'>
														{/* {console.log(activity)} */}
														<p>{momentJs(activity.createdAt).fromNow()}</p>
													</div>
													<div className='clearfix'></div>
												</div>
											);
										})
									) : (
											<h2 style={{ color: "#fee6cc", textAlign: "center" }}>No Record Found</h2>
										)}
								</div>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		);
	}
}

export default InnerContent;
