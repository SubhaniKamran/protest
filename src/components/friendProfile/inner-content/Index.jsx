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
		loading: true,
		followingStatus: false
	};
	componentDidMount() {

		
		const searchProfile_userID = this.props;
		const searchProfileResponse = {
			userID: searchProfile_userID
		}

		Axios
		.get(`${config.API_URL}/user/detail`, {
			headers: {
				Authorization: Auth.getToken(),
			},
		})
		.then((responseCurrentUser) => {
			const cUserData = responseCurrentUser.data.data.user[0];

			const UserFollowingStatus = cUserData.following.filter((follow, ith) => follow[0]._id === searchProfile_userID.searchProfile);

			if(UserFollowingStatus.length >0){
				this.setState({
					followingStatus: true
				})
			}
		})
		.catch((error) => console.log(error));


		
		Axios.post(`${config.API_URL}/users/activitiesPid`, searchProfileResponse, {
			headers: {
				Authorization: Auth.getToken(),
			},
		}).then((response) => {

				const dataActivity =  response.data.data;

				if (dataActivity.length > 0) {

					const myActivityArray = [];
					
					const firstNArray = dataActivity.slice(0,5);
					
					firstNArray.map((dataAct)=>{

											
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



		}).catch((error) => console.log(error));

		

	}



	render() {
		const { myActivity, followingStatus} = this.state;

		
		if (this.state.loading) {
			return (
					
					<WaveLoading size={"large"}  />
				
			);
		}
		

		  
		return (
			<div className='mainInnerContent innerMainProfileContent'>
				<div className='container'>
					<ul className='nav nav-tabs'>
						<li className="active">
							<Link data-toggle='tab'  to='#act'>
								<img src={activityIcon} alt='' /> <span>Activities</span>
							</Link>
						</li>
					</ul>

					<div className='tab-content'>
					
						<div id='act' style={{ display: "block" }}>
							<div className='searchResultsParent'>
								<div className='searchResultsMain'>
									{console.log(myActivity)}
									{console.log((followingStatus == true))}
									{((myActivity.length > 0) && (followingStatus == true)) ? (
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
