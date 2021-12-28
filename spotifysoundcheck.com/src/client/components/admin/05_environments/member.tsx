import React from 'react';
import UserAccountForm from '../04_ecosystems/userAccountForm';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchSelectedAccount } from '../../../actions/fetchSelectedAccount';

const StyledMember = styled.div`
  max-width: 1000px;
`;

interface IMember {
  userState: any;
  selectAccount: (id: number) => void;
}

const Member = (props: IMember) => {
  return (
    <StyledMember>
      <UserAccountForm data={props.userState} single={true} />
    </StyledMember>
  );
};

const mapStateToProps = (state: any) => ({
  userState: state.selectedAccount.user
});

const mapDispatchToProp = (dispatch: any) => ({
  selectAccount: (id: number) => dispatch(fetchSelectedAccount(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(Member);
