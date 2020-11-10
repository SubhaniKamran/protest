import React, { Component } from "react";
import userIcon from "../../../assets/images/user.png";
import playIcon from "../../../assets/images/play.png";
import videoThumbnail from "../../../assets/images/video.png";
import videoNameIcon from "../../../assets/images/videoNameIcon.png";
import config from "../../../config";
import axios from "axios";
import Auth from "../../Services/Auth";
import { Link } from "react-router-dom";
import durationIcon from "../../../assets/images/durationIcon.png";

class InnerContent extends Component {
	state = {
		data: [],
		page: 1,
		totalItems: 0,
		visible: 3,
	};

	loadMore = this.loadMore.bind(this);
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
					data: [...this.state.data, ...response.data.data.drills],
					page: this.state.page + 1,
					totalItems: response.data.count,
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

		if (parseInt(diffInMs / (1000 * 60 * 60 * 24) > 7)) {
			return "";
		} else {
			return (
				<li>
					<span className='new' style={{fontSize: "12px"}}>New</span>
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
					<span className='premium' style={{fontSize: "12px"}}>Premium</span>
				</li>
			);
		}
	}
	render() {
		const { data } = this.state;


		if (data != null && data.length > 0) {
			const videos = data[0] != null ? data[0].videos : null;
			if (videos.length > 0) {
				return (
					<div className='mainInnerContent'>
						<div className='container'>
							<div className='row'>
								{videos.map((video, index) => {
									return (
										<div key={index} className='col-md-6 col-sm-12 col-xs-12'>
											<Link to={`/single/video/${data[0]._id}/${video._id}`}>
												<div className='videoMain form-group'>
													<div className='videoHeader'>
														<div className='row'>
															<div className='col-md-1 col-sm-2 col-xs-2' >
														

																{(data[0].athlete.image === undefined || data[0].athlete.image === "null") ? (
																		<img src={userIcon} style={{borderRadius: "50px", opacity: 0.5, width: "40px" }}/>
																		
																	) : (
																		<img src={data[0].athlete ? `${config.IMG_URL}/image/${data[0].athlete.image}` : userIcon} style={{borderRadius: "50px", opacity: 0.5, width: "40px" }} onError={(e)=>{e.target.src=userIcon}}/>
																	)
																}
														
															</div>
															<div className='col-md-11 col-sm-10 col-xs-9' style={{marginTop: "3px"}}>
																<h4>{data[0].athlete ? data[0].athlete.name : "Name Not Found"}</h4>
															</div>
														</div>
													</div>
													<div className='videoMainArea'>
														
															{(video.thumbnail === undefined || video.thumbnail === "null") ? (

																	<img src={videoThumbnail} alt='' style={{borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px", opacity: 0.65}}/>
																	
																) : (
																	<img src={video ? `${config.IMG_URL}/image/drills/${video.thumbnail}` : videoThumbnail} alt='' style={{borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px", opacity: 0.65}} onError={(e)=>{e.target.src=videoThumbnail}}/>
																)
															}
														

														<div className='videoPlay'>
															
																<img src={playIcon} alt='' />
															
														</div>
														<div className='durationSettings' style={{paddingTop: "10px"}}>
															<ul className='list-unstyled'>
																<li style={{ color: "white" }}>
																	<img src={durationIcon} alt='' /> {video.duration}
																</li>
															</ul>
														</div>
														<div className='videoSettings'>
															<div className='col-md-6 col-sm-6 col-xs-6'>
																<ul className='videoLeftSettings list-unstyled'>
																	<li>
																		<span className='easy' style={{fontSize: "12px"}}>
																			{data[0].difficultyLevel ? data[0].difficultyLevel.name : "Name Not Found"}
																		</span>
																	</li>
																</ul>
															</div>
															<div className='col-md-6 col-sm-6 col-xs-6'>
																<ul className='videoRightSettings list-unstyled'>
																	{this.dateDifferenceInDays(new Date(), new Date(data[0].createdAt))}
																	{this.isPremimum(video.isPremium)}
																</ul>
															</div>
														</div>
													</div>
												</div>
											</Link>
										</div>
									);
								})}
							</div>
							{/* {this.state.totalItems < videos.length && (
								<div className='row'>
									<hr />
									<div className='col-md-12 col-sm-12 col-xs-12 hidden-xs text-center'>
										<button type='button' onClick={this.loadMore} className={"btn btn-sm btn-primary"}>
											Load More
										</button>
									</div>
								</div>
							)} */}
						</div>
					</div>
				);
			} else {
				return (
					<div className='mainInnerContent'>
						<div className='container'>
							<div className='row'>
								<h2 style={{ color: "#fee6cc", textAlign: "center" }}>Videos Not Found</h2>
							</div>
						</div>
					</div>
				);
			}


		} else {
			return (
				<div className='mainInnerContent'>
					<div className='container'>
						<div className='row'>
							<h2 style={{ color: "#fee6cc", textAlign: "center" }}>Videos Not Found</h2>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default InnerContent;
