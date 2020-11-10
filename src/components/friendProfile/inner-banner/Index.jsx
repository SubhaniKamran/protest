import React, { Component } from "react";
import config from "../../../config";
import Auth from "../../Services/Auth";
import Axios from "axios";
import userIcon from "../../../assets/images/profileLg.png";
import { Link } from "react-router-dom";
import { WaveLoading  } from 'react-loadingg';

class InnerBanner extends Component {
	state = {
		data: [],
		followingUserDetail: [],
		loading: true,
	};

	componentDidMount() {
		

		const searchProfile_userID = this.props;
		const searchProfileResponse = {
			userID: searchProfile_userID
		}

		Axios.post(`${config.API_URL}/users/pid`, searchProfileResponse, {
			headers: {
				Authorization: Auth.getToken(),
			},
		}).then((response) => {

			
				Axios
				.get(`${config.API_URL}/user/detail`, {
					headers: {
						Authorization: Auth.getToken(),
					},
				})
				.then((responseCurrentUser) => {
					
					const cUserData = responseCurrentUser.data.data.user[0];

					const UserFollowingStatus = cUserData.following.filter((follow, ith) => follow[0]._id === searchProfile_userID.searchProfile);

					this.setState({
						data: [response.data.data],
						followingUserDetail: UserFollowingStatus,
						loading: false
					})
				
				})
				.catch((error) => console.log(error));



		}).catch((error) => console.log(error));


	}



	checkFollowUser = (peopleId) => {
		const length = this.state.followingUserDetail.length;

		if (length > 0) {

			return (
				<Link href='#' className='btn btnFilled' onClick={() => this.followUser(`${peopleId}`, false)}>
					UnFollow
				</Link>
			);



		} else {
			return (
				<Link href='#' className='btn btnFilled' onClick={() => this.followUser(`${peopleId}`, true)}>
					Follow
				</Link>
			)
		}

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



	render() {
		const data = this.state.data;
		if (this.state.loading) {
			return (
					
					<WaveLoading size={"large"}  />
				
			);
		  }
		
		if (data.length > 0) {
			return (
				<div className="innerBanner innerProfileBanner">
					{data.map((user, index) => {
						
						return (
							<div key={index} className="container">
								{
									(user != null) ? (
										<div className="innerProfileTop">
											{

												user.image ? (
													<img src={`${config.IMG_URL}/image/${user.image}`} alt='' style={{borderRadius: "50%", width:"13%"}} draggable={false} onError={(e)=> e.target.src = userIcon}/>
												) : (
														<img src={userIcon} alt='' style={{borderRadius: "50%", width:"13%"}} draggable={false}/>
													)
											}
											<h5>{user.firstName} {user.lastName} &nbsp; | &nbsp;  {user.userName}</h5>
											<h6><strong>{user.following ? user.following.length : 0}</strong> Following &nbsp;&nbsp; <strong>{user.points} </strong>Points Earned</h6>
											<br/>
											<br/>
											{this.checkFollowUser(user._id)}
										
										
										
										
										</div>

										


									) : (
											<div className="innerProfileTop">
												<h6><strong>User Not Found</strong></h6>
											</div>
										)
								}

							</div>
						);

					})
					}
				</div>

			);

		} else {
			return (
				<div className="innerBanner innerProfileBanner">

					<div className="container">
						<div className="innerProfileTop">

							<h5>User Not Found</h5>
						</div>
					</div>



				</div>

			);

		}


	}
}

export default InnerBanner;
