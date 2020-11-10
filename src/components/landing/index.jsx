import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/customlanding.scoped.css"
//import "../../assets/css/bootstraplanding.css"
//import "../../assets/css/medialanding.css"
import baseballDrills from "../../assets/imageslanding/baseballDrills.png"
import bodyBuilding from "../../assets/imageslanding/bodybuilding.png"
import gymnastic from "../../assets/imageslanding/gymnastic.png"
import logo from "../../assets/imageslanding/logo.png"
import flogo from "../../assets/imageslanding/fLogo.png"
import youtube from "../../assets/imageslanding/youtube.png"
import fbIcon from "../../assets/imageslanding/fbIcon.png";
import linkedInImg from "../../assets/imageslanding/linkedInImg.png";
import twitter from "../../assets/imageslanding/twitter.png";
import call from "../../assets/imageslanding/call.png"
import email from "../../assets/imageslanding/email.png"
import instaRed from "../../assets/imageslanding/instaRed.png"
import twRed from "../../assets/imageslanding/twRed.png"
import fbRed from "../../assets/imageslanding/fbRed.png"
import AsNavFor from "./AsNavFor";
import DrillsCategories from "./categoriesSlide";
import OurTrainers from "./ourTrainers";
import Testimonial from "./testimonial";
import NavBar from '../navbar/Index';
import config from "../../config";
import Axios from "axios";
function appendScript (scriptToAppend) {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = false;
    document.body.appendChild(script);
  }

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            message: "",
            // useremail: ""
        };
    }

    componentDidMount() {
        appendScript("js/jquery-1.11.3.min.js");
        appendScript("js/bootstrap.js");
        appendScript("js/slick.min.js");
        appendScript("js/swiper-bundle.min.js");
        appendScript("js/custom.js");
    }

    handleSubject = (e) =>{
        
        this.setState({
            subject: e.target.value
        })
        
    }

    handleMessage = (e) =>{
        this.setState({
            message: e.target.value
        })
    }



    render() {
        return (
            <div>
                <NavBar/>
                <div className="banner">
                    <div className="bannerContent">
                        <h2>Don't Stop Till You Drop </h2>
                        <p>The best way to <span>make sure your body and mind</span> are ready for work is to wake them up with a good workout.</p>
                        <ul className="list-unstyled list-inline">
                            <li><a href="/login" className="btn btnRed">GET STARTED NOW</a></li>
                        </ul>
                    </div>
                    <div className="clearfix" />
                </div>
              
                <div className="welcomeSection">
                    <div className="container">
                        <div className="row topCategories">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <img src={baseballDrills} alt="" />
                                <div className="topCatOptions">
                                    <h3>BASEBALL DRILLS</h3>
                                    <p style={{width: "220px"}}>Trained under best trainers with best <b>SUBCRIPTION PLAN</b></p>
                                    <Link to="/login" className="btn btnRedSm">Login</Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <img src={bodyBuilding} alt="" />
                                <div className="topCatOptions">
                                    <h3>BODY BULDING CLASSES</h3>
                                    <p style={{width: "220px"}}>Trained under best trainers with best <b>SUBCRIPTION PLAN</b></p>
                                    <Link to="/login" className="btn btnRedSm">Login</Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <img src={gymnastic} alt="" />
                                <div className="topCatOptions">
                                    <h3>Gymnastic CLASSES AND MANY MORE</h3>
                                    <p style={{width: "220px"}}>Trained under best trainers with best <b>SUBCRIPTION PLAN</b></p>
                                    <Link to="/login" className="btn btnRedSm">Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 col-sm-6 col-xs-12 welcomeContent">
                                <h5>ABOUT</h5>
                                <h3><span>Welco</span>me to Us</h3>
                                <p><span>Your body hears everything that your mind says. You have to have a positive attitude if you want to achieve your goals.</span></p>
                                <p>If you run a fitness gym, this is one slogan that can bring customers in. No one likes having to drive miles out of their way to go to the gym. It is always easier to have a gym that is actually close to home. Your body hears everything that your mind says. You have to have a positive attitude if you want to achieve your goals. <a href="#">READ MORE</a></p>
                            </div>
                            <div className="col-md-6 col-md-offset-1 col-sm-6 col-xs-12">
                                <AsNavFor/>
                            </div>
                        </div>
                    </div>
                </div>
              
              
                <div className="drillSection" style={{overflow: 'hidden'}}>
                    <div className="container-fluid">
                        <DrillsCategories/>
                    </div>
                </div>
                <div className="trainer" style={{overflow: 'hidden'}}>
                    <div className="container-fluid">
                        <OurTrainers/>
                    </div>
                </div>
                <Testimonial/>

                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 footerLogo">
                                <a href="/welcome"><img src={flogo} alt="" /></a>
                            </div>
                            <div className="col-md-3  footerContent">
                                <h3>Quick Contacts</h3>
                                <p>{config.location}</p>
                                <p><img src={call} alt="Contact" /> {config.phoneNumber}</p>
                                <p><img src={email} alt="Email" /> {config.email}</p>
                                <ul className="list-unstyled list-inline">
                                    <li><a href={config.instaSocial}><img src={instaRed} alt="Insta" /></a></li>
                                    <li><a href={config.twitterSocial}><img src={twRed} alt="twitter" /></a></li>
                                    <li><a href={config.facebookSocial}><img src={fbRed} alt="facebook" /></a></li>
                                </ul>
                            </div>
                            <div className="col-md-4 footerContent">
                                <h3>Popular Tags</h3>
                                <div className="tags">
                                    <ul className="list-unstyled list-inline">
                                        <li><a href="/login">WORKOUT</a></li>
                                        <li><a href="/login">CROSSFIT</a></li>
                                        <li><a href="/login">SHEDULE</a></li>
                                        <li><a href="/login">TRAINERS</a></li>
                                        <li><a href="/login">BOXING</a></li>
                                        <li><a href="/login">SHEDULE</a></li>
                                        <li><a href="/login">NUTRITION</a></li>
                                        <li><a href="/login">GYM</a></li>
                                        <li><a href="/login">PLANS</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                <div className="lastLinks">
                    <div className="container">
                        <div className="text-center">
                            <ul className="list-unstyled list-inline">
                                <li><a href="/welcome">HOMEPAGE</a></li>
                                <li><a href="/login">LOGIN</a></li>
                                <li><a href="/register">SIGNUP</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <div className="container">
                        <div className="text-center">
                            <p>©2020 ProElite. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;