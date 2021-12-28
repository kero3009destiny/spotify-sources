import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonPrimary } from '@spotify-internal/encore-web';
import SelectCertification from './SelectCertification';
import Profile from './Profile';
import {MenuItem, NavDropdown} from 'react-bootstrap';

const Header = ({ isLoggedIn, showCertifications = true, logout }) => {
  const history = useHistory();

  const handleStartNewClick = () => {
    history.push('/new');
  };

  return (
    <div className="certomatoHeader">
      <div className="certomatoHeaderContentLeft">
        <a href="/"><span className="navbar-logo" style={{marginRight: 20}}>Spotify</span></a><h3>Certomato</h3>
      </div>
      {isLoggedIn && (
        <div className="certomatoHeaderContentRight">
          {showCertifications && (
            <>
              <div style={{display: 'inline-block', verticalAlign: '14px'}}>
                Active Certification:
              </div>
              <div className="certomatoHeaderContentRightStack" style={{verticalAlign: '14px'}}>
                <SelectCertification />
              </div>
              <div className="certomatoHeaderText">
                <ButtonPrimary colorSet="invertedLight" onClick={handleStartNewClick}>Start New</ButtonPrimary>
              </div>
            </>
          )}
          <Profile/>
          <div className="certomatoHeaderContentRightStack" style={{marginLeft: 0, marginRight: 50}}>
            <NavDropdown eventKey={3} title="" id="basic-nav-dropdown" style={{verticalAlign: 12, marginLeft: -72, display: 'inline-block'}}>
              <MenuItem eventKey={3.1} onSelect={logout}><span style={{color: '#f00'}}>Log out</span></MenuItem></NavDropdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
