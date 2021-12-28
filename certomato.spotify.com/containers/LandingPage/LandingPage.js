import React, {Component} from 'react';
import speedometer from '../../images/LandingPage/speedometer-2x.png';
import cmd from '../../images/LandingPage/cmd-2x.png';
import certified from '../../images/LandingPage/certified-2x.png';
import Login from '../../components/Login';
import Header from '../../components/Header';
import './LandingPage.less';

class LandingPage extends Component {
  renderTopSection() {
    // If you are logged in we only show this page if you don't have access
    return (
      <div className="landingPageContainer top">
        <div className="landingPageTopTitle">
          <h1>
            Welcome to Certomato
          </h1>
        </div>
        <div className="landingPageTopSubtitle">
            To release your product with Spotify Connect<sup>®</sup>,<br />
            your product will need to pass certification.
        </div>
        <div className="landingPageTopLoginButton">
          {this.props.loggedIn ? (
            <h3>
              Sorry, you do not have access to Certomato.
              Please request access <a href="https://spotify.atlassian.net/servicedesk/customer/portal/3/group/6/create/152" target="_new">here</a>.
            </h3>
          ) : <Login/>}
        </div>
      </div>
    );
  }

  renderMidSection() {
    return (
      <div className="landingPageContainer mid">
        <h2>What is Certomato?</h2>
        <h4>
          Certomato is a helping hand when developing your Spotify Connect<sup>®</sup> enabled product. To see your device in the list, you will need to log in to the device using Spotify Connect.
        </h4>
        <div className="landingPageMidCard">
          <div className="landingPageMidCircle left">
            <div className="centeredContent">
              <img src={speedometer} height="134" width="134" style={{marginTop: '-10px'}}/>
            </div>
          </div>
          <div className="landingPageMidCardText">
            Automated certification using one single tool.
          </div>
        </div>
        <div className="landingPageMidCard">
          <div className="landingPageMidCircle mid">
            <div className="centeredContent">
              <img src={cmd} height="170" width="170" style={{marginTop: '12px'}}/>
            </div>
          </div>
          <div className="landingPageMidCardText">
            A reliable environment for developing and submitting your product against our latest requirements.
          </div>
        </div>
        <div className="landingPageMidCard">
          <div className="landingPageMidCircle right">
            <div className="centeredContent">
              <img src={certified} height="168" width="168" style={{marginTop: '-18px'}}/>
            </div>
          </div>
          <div className="landingPageMidCardText">
            Shortened journey from submission to a passed certification.
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="landingPageContainer">
        <Header
          isLoggedIn={this.props.loggedIn}
          showCertifications={false}
          logout={this.props.logout}
        />
        {this.renderTopSection()}
        {this.renderMidSection()}
        <div className="landingPageContainer bottom">
          <h2>Developer guidelines</h2>
          <h4>
            Our developer guidelines can be found at <a href="https://developer.spotify.com" target="_blank">developer.spotify.com</a>
          </h4>
        </div>
      </div>
    );
  }
}

export default LandingPage;
