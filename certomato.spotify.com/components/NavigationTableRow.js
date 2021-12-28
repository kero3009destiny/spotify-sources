import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import failIcon from '../images/group_fail.png';
import passIcon from '../images/group_pass.png';
import inProgressIcon from '../images/group_inprogress.png';

const GROUP_FAILED = 'FAILED';
const GROUP_PASSED = 'PASSED';
const GROUP_IN_PROGRESS = 'IN_PROGRESS';

const NavigationTableRow = ({group, admin}) => {
  const route = `/${group.route}`;

  const routeIsCurrentPage = () => {
    const currentlyAtInfoPage = window.location.pathname === '/' && group.route === 'info';
    return route === window.location.pathname || currentlyAtInfoPage;
  };

  const iconForGroup = () => {
    if (group.testStatus === GROUP_PASSED) {
      return <img title={'All tests passed successfully'} src={passIcon} style={{width: 23, height: 23}} />;
    }
    if (group.testStatus === GROUP_FAILED) {
      return <img title={'One or more tests failed'} src={failIcon} style={{width: 22, height: 22}} />;
    }
    if (group.testStatus === GROUP_IN_PROGRESS) {
      return <img title={'In progress'} src={inProgressIcon} style={{width: 16, height: 22}} />;
    }
    return null;
  };
  const statsForGroup = () => {
    if (group.progress && group.nrOfTests) {
      return <span className={'groupStats'}>({group.progress}/{group.nrOfTests})</span>;
    }
    return null;
  };

  const rowColorForRoute = () => {
    return routeIsCurrentPage() ? '#1DB854' : '';
  };

  return (
    <div>
      <span className="selectedGroupIndicator" style={{backgroundColor: rowColorForRoute(route)}}>&nbsp;</span>
      { (group.title !== 'Autoperf' || admin) ? <NavLink to={route} className={routeIsCurrentPage() ? 'selectedLink' : 'link'}>{group.title}</NavLink> : null }
      {statsForGroup(group)}
      {iconForGroup(group)}
    </div>
  );
};

NavigationTableRow.propTypes = {
  group: PropTypes.object.isRequired,
  admin: PropTypes.bool,
};

export default NavigationTableRow;
