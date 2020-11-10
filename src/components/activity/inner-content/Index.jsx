import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import Auth from "../../Services/Auth";
import Axios from "axios";
import momentJs from "moment";
import userIcon from "../../../assets/images/user.png";

import playIcon from "../../../assets/images/play.png";
import videoThumbnail from "../../../assets/images/video.png";
import videoNameIcon from "../../../assets/images/videoNameIcon.png";
import FavouiteIcon from "../../../assets/images/favChecked.png";
import userImage from "../../../assets/images/userImage.png";
import connectionsIcon from "../../../assets/images/connectionsIcon.png";
import favtIcon from "../../../assets/images/favouriteImg.png";
import activityIcon from "../../../assets/images/activityIcon.png";
import { func } from "joi";
import { WaveLoading  } from 'react-loadingg';

class InnerContent extends Component {
	state = {
		followedActivity: [],
		followData: [],
		activityTab: false,
		followTab: true,
		atheletes: [],
		followingUserDetail: [],
		userActivityData: [],
		followedActivityD: [],
		userActivities: [],
		loading: true
	};
	componentDidMount() {



		this.getAtheltes();
		Axios.get(`${config.API_URL}/user/detail`, {
			headers: {
				Authorization: Auth.getToken(),
			},
		})
			.then((response) => {
				const data = response.data.data.user[0];
				const dataActivity = response.data.data.activity;
				if (data.following && data.following != null && data.following.length > 0) {
					this.setState({

						followData: data.following,
					});
				}
				if (dataActivity && dataActivity != null && dataActivity.length > 0) {

					const fuserData = [];
					

					data.following.map((item)=>{
						const userData = {
							user_id: item[0]._id,
							first_name: item[0].firstName,
							last_name: item[0].lastName,
							image : item[0].image
						}
						fuserData.push(userData)
					
					})

					this.setState({
						followingUserDetail: fuserData
					})

					this.state.followingUserDetail.map((item)=>{
						
						const userResponseData = {
							user_id: item.user_id
						}
					
						Axios.post(`${config.API_URL}/user/followingDetail`, userResponseData, {
							headers: {
								Authorization: Auth.getToken(),
							},
						})
						.then((response) =>{

							if(response.status == 200)
							{
								

									if((response.data.data[0].activity.length) > 0)
									{



										response.data.data[0].activity.map((actDItem)=>{
											
							

											const drillNameResponse = {
												drill_id : actDItem.drill_id
											}

											
											Axios.post(`${config.API_URL}/user/followingDetailInfo`, drillNameResponse, {
												headers: {
													Authorization: Auth.getToken(),
												},
											})
											.then((response) =>{
					
												if(response.status == 200)
												{

													
									
														let userActivitycontants = {
															user_id: item.user_id,
															name : item.first_name + " " +item.last_name,
															image: item.image,
															drill_id: actDItem.drill_id,
															drill_name: response.data.data,
															act_id: actDItem._id,
															act_time: actDItem.createdAt
														}
													
													this.setState({
														userActivityData: [...this.state.userActivityData, userActivitycontants],
														loading: false
														})

												}
											});
									
										})
											

									}
								
							
							}

						})
					})

					
			
				
					this.setState({
						followedActivity: [...dataActivity],
						loading: false

					});
				}

				this.setState({
					loading: false

				});


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
		if (tab === "followedActivity") {
			this.setState({
				activityTab: true,
				followTab: false,
			});
		}

		if (tab === "following") {
			this.setState({
				activityTab: false,
				followTab: true,
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


	followUser = (peopleId, status) => {

		const response = {
			"following": peopleId,
			"isAdded": status
		};
		Axios
			.post(`${config.API_URL}/user/followUser`, response, {
				headers: {
					Authorization: Auth.getToken(),
				},
			})
			.then((response) => {

				window.location.href="/activites"
			});



	}


	
	friendProfile = (id, e)=>{
		window.location.href=`/peopleProfile/${id}`;
	}




	render() {
		const { activityTab, followTab, followedActivity, followData, userActivityData } = this.state;

		if (this.state.loading) {
			return (
					
					<WaveLoading size={"large"}  />
				
			);
		  }
		
		
		return (
			<div className='mainInnerContent innerMainProfileContent'>
				<div className='container'>
					<ul className='nav nav-tabs'>
						<li className={followTab ? "active" : ""} onClick={() => this.handleTabs("following")}>
							<Link data-toggle='tab' to='#following'>
								<img src={connectionsIcon} alt='' /> <span>Following</span>
							</Link>
						</li>
						<li className={activityTab ? "active" : ""} onClick={() => this.handleTabs("followedActivity")}>
							<Link data-toggle='tab' to='#act'>
								<img src={activityIcon} alt='' /> <span>Activities</span>
							</Link>
						</li>
					</ul>

					<div className='tab-content'>
						<div id='following'
							style={{ display: followTab ? "block" : "none" }}
							className={followTab ? "tab-pane fade in active" : "tab-pane fade"}
						>	<div className='searchResultsParent'>
								<div className='searchResultsMain'>

									{
										followData.length > 0 ? (
											followData.map((follow, index) => {


												return (
													<div key={index} className='searchResults form-group drillSearchSection'>
													

															<div style={{cursor: "pointer"}} className='col-md-7 col-sm-7 col-xs-7 textOverflow'  onClick={(e) => this.friendProfile(follow[0]._id,e)}>
																	{(follow[0].image === undefined || follow[0].image === "null") ? (
																		<img src={userImage} style={{borderRadius: "50%", width:"20%", marginTop: "5px"}}/>
																		
																	) : (
																		<img src={follow[0] && follow[0].image ? `${config.IMG_URL}/image/${follow[0].image}` : userImage} style={{borderRadius: "50%",width:"20%", marginTop: "5px"}} onError={(e)=>{e.target.src=userImage}}/>
																	)
																}
																<span>{follow[0].firstName}{" "}{follow[0].lastName}</span>
															</div>
															<div className='col-md-5 col-sm-5 col-xs-5 searchResultsFollowBtn'>

																<Link href='#' className='btn btnFilled' onClick={() => this.followUser(`${follow[0]._id}`, false)}>
																	UnFollow
																</Link>


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
						<div id='act' style={{ display: activityTab ? "block" : "none" }} className={activityTab ? "tab-pane fade in active" : "tab-pane fade"}>
							<div className='searchResultsParent'>
								<div className='searchResultsMain'>
									
									{userActivityData.length > 0 ? (
										[...this.state.userActivityData].reverse().map((activity, index) => {
											
									
												return (
													<div key={index} className='searchResults form-group drillSearchSection'>
														<div className='col-md-3 col-sm-3 col-xs-3'>

																{(activity.image === undefined || activity.image === "null") ? (
																		<img src={userImage} style={{borderRadius: "50%", width:"50%", margin: "0px", padding: "0px"}}/>
																		
																	) : (
																		<img src={`${config.IMG_URL}/image/${activity.image}`} style={{borderRadius: "50%",width:"65%", margin: "0px", padding: "0px"}} onError={(e)=>{e.target.src=userImage}}/>
																	)
																}
	
														</div>
														<div className='col-md-6 col-sm-6 col-xs-6'>
													
															<span className='drillSearchName' style={{padding: "0px"}}>
																{activity.user_id ? activity.name : 'Name Not Found'}
															</span>
															<br/>
															<span className='drillAtheleteName' style={{padding: "0px"}}>
																COMPLETE {" "}<strong>{activity.drill_id ? activity.drill_name : 'Name Not Found'}</strong>
															</span>
															
														</div>
														<div className='col-md-3 col-sm-3 col-xs-3 searchResultsFollowBtn'>
															<p>{momentJs(activity.act_time).fromNow()}</p>
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
