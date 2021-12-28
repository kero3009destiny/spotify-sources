import ProfileIcon from '../01_atoms/profileIcon';
import { roles } from '../../../../lib/roleLabelMap';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withRouter} from 'react-router';
interface IProfileMenuItemProps {
  image?: string,
  user: any,
  history: any,
  location: any,
  match: any,
  className: string
  displayNameOnMobile?: boolean
  clickBack?: (e:any) => void
}
const StyledSProfileMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
  }

  p {
    opacity: .5;
  }
`;

interface IStyledNameGroupProps {
  displayNameOnMobile?: boolean
}

const StyledNameGroup = styled.div<IStyledNameGroupProps>`
  h4 {
    margin-bottom: 5px;
    color: var(--color-SNOW);
    font-size: 1.6rem;
    text-transform: capitalize;
  }

  h6 {
    font-size: 1.1rem;
    opacity: .5;
    color: var(--color-SNOW);
    margin: 0;
  }

  @media (max-width: 768px) {
    display: ${props => !props.displayNameOnMobile && 'none'};
  }
`;

const ProfileMenuItem = (props: IProfileMenuItemProps) => {
  const navigateToProfile = () => {
    props.history.push('/admin/account');
  }
  const role = roles.find(r => r.role_id === props.user.role_id)
  const roleName = (role || { title: 'Agency Employee' }).title
  return (
    <StyledSProfileMenuItem className={props.className}>
      <div onClick={() => navigateToProfile()}>
        <ProfileIcon image={props.user.image}/>
        <StyledNameGroup displayNameOnMobile={props.displayNameOnMobile}>
          <h4>{props.user.first_name} {props.user.last_name}</h4>
          <h6>{roleName}</h6>
        </StyledNameGroup>
      </div>
    </StyledSProfileMenuItem>
  )
}

const mapStateToProps = (state:any) => ({
  user: state.user
});

export default withRouter(
  connect(
  mapStateToProps
)(ProfileMenuItem));
