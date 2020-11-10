import React, { Component } from 'react';
import Logo from "../../assets/images/logo.png";
class Splash extends Component {
    state = {}
    componentDidMount() {

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

    }

    resize() {
        let mobileWidth = (window.innerWidth);
        if (mobileWidth < 760) {
            setTimeout(() => {
                this.props.history.push('/login')
            }, 3000);
        } else {
            this.props.history.push('/welcome')
        }

    }

    render() {
        return (
            <div className="loginMobileBg">
                <div className="container">
                    <div className="splash-screen logoCenter" >
                        <h1 className="center-text">
                                <img src={Logo} alt='' />
                        </h1>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Splash;