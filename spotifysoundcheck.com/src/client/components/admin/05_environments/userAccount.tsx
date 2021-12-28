import React, { useEffect, useState } from 'react';
import UserAccountForm from '../04_ecosystems/userAccountForm';
import styled from 'styled-components';
import {connect} from 'react-redux';

const StyledAccount = styled.div`
  max-width: 1000px;
`;

type userType = {
  user_id: Number
  user_role: Number
  isLoading: boolean
  error: any
}

interface IUserAccount {
  userState: userType
}

const UserAccount = (props: IUserAccount) => {
  const [userData, setUserData] = useState(
    {
      first_name: '',
      last_name: '',
      company_email: ''
    }
  );
  // fetch controller interrupt
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    const {user_id} = props.userState;
    if (props.userState.user_id) {
      fetch(`/api/user/${user_id}`,{signal})
        .then((res) => res.json())
        .then((data) => setUserData(data.user))
        .catch((err) => {});
    }
    return () => {
      controller.abort();
    }
  }, [props.userState.user_id]);

  return (
    <StyledAccount>
      <UserAccountForm data={userData} />
    </StyledAccount>
  )
}

const mapStateToProps = (state:any) => ({
  userState: state.user
})

export default connect(
  mapStateToProps
)(UserAccount);
