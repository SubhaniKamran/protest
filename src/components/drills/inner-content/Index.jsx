import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import userSmallIcon from "../../../assets/images/userSm.png";
import videoNameIcon from "../../../assets/images/videoNameIcon.png";
import drillImage from "../../../assets/images/drillsImg.png";
import heartIcon from "../../../assets/images/heart.png";
import durationIcon from "../../../assets/images/durationIcon.png";
import config from "../../../config";
import userIcon from "../../../assets/images/user.png";
import axios from "axios";
import videoThumbnail from "../../../assets/images/thumbnail.png";
import Auth from "../../Services/Auth";
import { WaveLoading  } from 'react-loadingg';
		

class InnerContent extends Component {
	state = {
		data: [],
		visible: 1,
		page: 1,
		totalItems: 0,
		visible: 3,
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

	durationDisplay = (seconds) =>{
		const format = val => `0${Math.floor(val)}`.slice(-2)
		const hours = seconds / 3600
		const minutes = (seconds % 3600) / 60
	  
		return [hours, minutes, seconds % 60].map(format).join(':')
	  }

	render() {
		const token = Auth.getToken();
		if (!token) {
			return <Redirect to='/login' />;
		}
		const data = this.state.data;
		const dataVideos = this.state.drillsVideosData;
		

		if (this.state.loading) {
			return (
					
					<WaveLoading size={"large"}  />
				
			);
		  }
		

		if (data.length > 0) {
			return (
				<div className='mainInnerContent'>
					<div className='container'>
						<div className='row'>
							{data.map((drills, index) => {
								return (
									<div key={index} className='col-md-6 col-sm-6 col-xs-12'>
										<Link to={`/drills/detail/${drills._id}`}>
											<div className='drillsArea drillsMain2'>
												<div className='drillsMain'>
													<div className='videoMain form-group'>
														<div className='videoMainArea' style={{backgroundColor: "#000000", borderRadius: "5px"}}>
															{(drills.thumbnail === undefined || drills.thumbnail === "null") ? (
																	<img src={videoThumbnail} style={{borderRadius: "5px", opacity: 0.5}}/>
																	
																) : (
																	<img src={drills && drills.thumbnail ? `${config.IMG_URL}/image/drills/${drills.thumbnail}` : videoThumbnail} style={{borderRadius: "5px", opacity: 0.5}} onError={(e)=>{e.target.src=videoThumbnail}}/>
																)
															}
												
															<div className='videoName'>
																<img src={videoNameIcon} alt='' />
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
																		<img src={durationIcon} alt='' /> {this.durationDisplay(drills.duration)}
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
											</div>
										</Link>
									</div>
								);
							})}
						</div>
						{this.state.totalItems < data.length && (
							<div className='row'>
								<hr />
								<div className='col-md-12 col-sm-12 col-xs-12 hidden-xs text-center'>
									<button type='button' onClick={this.loadMore} className={"btn btn-sm btn-primary"}>
										Load More
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			);
		} else {
			return "";
		}
	}
}

export default InnerContent;
