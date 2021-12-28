import React, {useState} from 'react';
import NavButton from '../01_atoms/navButton';
import styled from 'styled-components';
import MenuItem from '../01_atoms/menuItem';
import store from 'store';
import ProfileMenuItem from '../02_molecules/profileMenuItem';

const logoutIcon = require('~/static/images/icons/ui/exit/exit.svg');
const companyIcon = require('~/static/images/icons/ui/company/company.svg');
const profileIcon = require('~/static/images/icons/ui/profile/profile.svg');
const subcompanyIcon = require('~/static/images/icons/ui/subcompany/subcompany.svg');
const lessonsIcon = require('~/static/images/icons/ui/dashboard/dashboard.svg');
const leaderboardIcon = require('~/static/images/icons/ui/leaderboard/leaderboard.svg');
import {UILabel} from '../../../../lib/uiLabels';

interface INavState {
  open: boolean
}

const StyledNavigation = styled.nav<INavState>`
  background: var(--color-DARKNESS);
  width: 300px;
  flex-basis: 300px;
  flex-shrink: 0;

  @media (max-width: 1280px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 99;
    transition: transform 0.3s ease;
    transform: ${props => props.open ? `translate3d(0, 0, 0)` : `translate3d(-100%, 0, 0)`};
  }
`;

const StyledHamburger = styled.button<INavState>`
  display: none;

  @media (max-width: 1280px) {
    display: block;
    position: fixed;
    top: 50px;
    left: 50px;
    z-index: 100;
    cursor: pointer;
    border: none;
    border-radius: 40px;
    appearance: none;
    background-color: var(--color-DARKNESS);
    height: 46px;
    width: 46px;
    padding: 12px;
    transition: transform 0.3s ease;
    transform: ${props => props.open ? `translate3d(227px, 0, 0)` : `translate3d(0, 0, 0)`};
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
      position: relative;
      height: 4px;
      width: calc(46px - 12px * 2);
      background-color: white;
      transition: all 0.3s ease;
      transform-origin: top center;

      &:nth-child(1) {
        transform-origin: center top;
        transform: ${
          props => props.open
            ? `translate3d(1px, 5px, 0) rotate(45deg)`
            : `translate3d(0, -4px, 0) rotate(0deg)`
        };
      }

      &:nth-child(2) {
        opacity: ${props => props.open ? 0 : 1};
      }

      &:nth-child(3) {
        transform-origin: center bottom;
        transform: ${
          props => props.open
            ? `translate3d(1px, -4px, 0) rotate(-45deg)`
            : `translate3d(0, 4px, 0) rotate(0deg)`
        };
      }
    }

    & > span {
      font-size: 0;
      color: transparent;
    }
  }

  @media (max-width: 768px) {
    top: 30px;
    left: 30px;
    transform: ${props => props.open ? `translate3d(247px, 0, 0)` : `translate3d(0, 0, 0)`};
  }
`;

const StyledNavigationContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 50px 0 50px 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media (max-width: 1024px) {
    padding: 30px 0 30px 20px;
  }

  a {
    color: var(--color-SNOW);
  }
`;

const StyledNavigationMiddle = styled.ul`
  flex-grow: 1;

  a {
    margin: 0 0 30px;
    display: block;
  }
`;

const StyledNavigationLast = styled.ul`
`;

const StyledMenuItem = styled(MenuItem)`
  padding-left: 20px;

  button {
    font-family: var(--font-PRIMARY);
    font-weight: 700;
    font-size: 1.4rem;
  }
`

const navConfig = [
  {
    title: UILabel.company.plural,
    to: '/admin/holding-companies',
    icon: companyIcon,
    access: [1,2,3]
  },
  {
    title: UILabel.subCompany.plural,
    to: '/admin/agencies',
    icon: subcompanyIcon,
    access: [1,2,3]
  },
  {
    title: UILabel.user.plural,
    to: '/admin/members',
    icon: profileIcon,
    access: [1,2,3]
  },
  {
    title: UILabel.lesson.plural,
    to: '/lessons',
    icon: lessonsIcon,
    access: [1,2,3,4]
  }
]

interface IAdminNavigation {
  role: number
}

const AdminNavigation = (props: IAdminNavigation) => {
  const [open, setOpen] = useState(false);
  const createNavItems = () =>
    navConfig
      .filter((d:any) => d.access.indexOf(props.role) !== -1)
      .map((d:any,i:number) => (
        <li key={i}>
          <NavButton
            title={d.title}
            to={d.to}
            icon={d.icon}
          />
        </li>
      ));

  return (
    <>
      <StyledHamburger open={open} onClick={() => setOpen(!open)}>
        <div /><div /><div />
        <span>{open ? "Close" : "Open" }</span>
      </StyledHamburger>

      <StyledNavigation open={open}>
        <StyledNavigationContainer>
          <ProfileMenuItem
            displayNameOnMobile
          />

          <StyledNavigationMiddle>
            {createNavItems()}
          </StyledNavigationMiddle>

          <StyledNavigationLast>
            <StyledMenuItem
              title="Logout"
              clickCallback={() => {
                store.remove('user');
                store.remove('tmpaccess');
                location.href= '/auth/logout';
              }}
              icon={logoutIcon}
            />
          </StyledNavigationLast>
        </StyledNavigationContainer>
      </StyledNavigation>
    </>
  );
}


export default AdminNavigation;
