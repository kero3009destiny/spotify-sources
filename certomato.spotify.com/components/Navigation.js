import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavigationTableRow from './NavigationTableRow';
import { NavLink, useLocation } from 'react-router-dom';
import Utils from '../utils/Utils';

const Navigation = (props) => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  const routeIsActive = (route) => {
    return currentRoute === route;
  };

  const otherLinks = [
    { route: '/stats', name: 'Stats' },
    { route: '/faq', name: 'FAQ'},
    { route: '/support', name: 'Support'},
    { route: '/product-application', name: 'New Product Application'},
  ];

  if (props.admin) {
    otherLinks.unshift({route: '/dashboard', name: 'Dashboard'});
  }

  if (props.featureFlags.includes('builds')) {
    otherLinks.unshift({ route: '/builds', name: 'Builds'});
  }

  if (props.featureFlags.includes('access_management')) {
    otherLinks.unshift({ route: '/access/management', name: 'Access Management'});
  }

  return (
    <div>
      <div className="navigationMenu">
        <div style={{width: '100%'}} className="navigationTable">
          <div>
            <span className="selectedGroupIndicator" style={{backgroundColor: routeIsActive('/certomatostart') ? '#1DB854' : ''}}>&nbsp;</span>
            <NavLink to="/certomatostart" className={routeIsActive('/certomatostart') ? 'selectedLink' : 'link'}>Certifications</NavLink>
          </div>
          {Utils.exists(props.tests) && !!props.certSession?.sessionId && props.tests.map(group => {
            return <NavigationTableRow key={group.route} group={group} admin={props.admin}/>;
          })}
        </div>
        {!!props.certSession?.sessionId && (
          props.finishedCertification ?
            <NavLink className="btn btn-primary btn-xs submitButton" to="/submit">Submit</NavLink> :
            <button type="button" className="btn btn-primary btn-xs submitButton" disabled>Submit</button>
        )}
      </div>
      <hr />
      <div className="otherNavigationLinks">
        {otherLinks.map((link) => {
          return (
            <div key={link.route}>
              <span className="selectedGroupIndicator" style={{backgroundColor: routeIsActive(`${link.route}`) ? '#1DB854' : ''}}>&nbsp;</span>
              <NavLink to={`${link.route}`} className={routeIsActive(`${link.route}`) ? 'selectedLink' : 'link'}>{link.name}</NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Navigation.propTypes = {
  tests: PropTypes.array,
  finishedCertification: PropTypes.bool,
  admin: PropTypes.bool,
  featureFlags: PropTypes.array,
  certSession: PropTypes.object,
};

export default Navigation;
