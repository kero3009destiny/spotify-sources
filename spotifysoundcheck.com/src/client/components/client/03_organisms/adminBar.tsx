import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { setUserAuth } from '../../../actions/setUserAction';
import Logo from '../../admin/01_atoms/logo';
import ProfileMenuItem from '../../admin/02_molecules/profileMenuItem';

type Ttheme = {
  textColor?: string;
  background: string;
};

interface IAdminBar {
  userState: any;
  theme: Ttheme;
  getUser: () => void;
  history: any;
}

interface IStyledAdminBar {
  background: string;
  textColor: string;
}

const StyledAdminBar = styled.nav`

  width: 100%;
  z-index: 10;
  background: ${(p: IStyledAdminBar) => p.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  h4 {
    color: ${(p: IStyledAdminBar) => p.textColor};
    margin-bottom: 0;
  }
  h6 {
    display: none;
  }
  .profile-image {
    width: 36px;
    height: 36px;
    margin-right: 20px;
  }
  svg {
    path {
      fill: var(--color-SNOW);
    }
  }
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .profile-image {
      margin-right: 0;
    }
  }
`;

const StyledAdminBarProfile = styled(ProfileMenuItem)`
  margin-top: 0;
  margin-bottom: 0;
`;

const AdminBar = (props: IAdminBar) => {
  useEffect(() => {
    if (!props.userState.role_id) {
      props.getUser();
    }
  }, []);

  return (
    <StyledAdminBar
      background={props.theme.background}
      textColor={props.theme.textColor ? props.theme.textColor : 'var(--color-SNOW)'}
    >
      <Logo
        clickBack={() => {
          props.history.push('/lessons');
        }}
      />
      <a>
        <StyledAdminBarProfile />
      </a>
    </StyledAdminBar>
  );
};

AdminBar.defaultProps = {
  theme: {
    background: 'var(--color-DARKNESS)',
    color: 'var(--color-SNOW)'
  }
};

const mapStateToProps = (state: any) => ({
  userState: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  getUser: () => dispatch(setUserAuth())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminBar));
