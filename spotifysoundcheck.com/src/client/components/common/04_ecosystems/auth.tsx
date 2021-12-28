import React, { useState, useEffect, ReactNode } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import AuthRefresher from "../01_atoms/authRefresher";
import {checkUserAccess} from '../../../actions/checkUserAccess';

interface IAuth {
  children?: any
  location: any,
  allowed: number[]
  userAccess: boolean,
  isAuthenticating: boolean,
  checkUserAccess: (allowed: number[]) => void
}


const Auth = (props: IAuth) => {
  const {
    children,
    location,
    allowed,
    userAccess,
    isAuthenticating,
    checkUserAccess,
  } = props

  useEffect(() => {
    checkUserAccess(allowed);
  }, [])

  if (!isAuthenticating && !userAccess) {
    return (
      <Redirect
        to={{
          pathname: '/admin/account',
          state: { from: location }
        }}
      />
    )
  }

  return (
    <>
      <AuthRefresher />
      {!isAuthenticating && userAccess ? children : null}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  userAccess: state.userAccess.auth,
  isAuthenticating: state.userAccess.loading,
});

const mapDispatchToProps = (dispatch: any) => ({
  checkUserAccess: (allowed: number[]) => dispatch(checkUserAccess(allowed))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
