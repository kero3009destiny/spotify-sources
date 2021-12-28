import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setUserAuth } from "../../../actions/setUserAction";
import { setUserAccount } from '../../../actions/setUserAccountDetailsAction';

interface IAuthRefresherProps {
  refreshToken: string;
  accessToken: string,
  getToken: () => void;
  getSpotifyToken: (token: string) => void;
}

const AuthRefresher = (props: IAuthRefresherProps) => {
  const { refreshToken, accessToken, getToken, getSpotifyToken } = props
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (refreshToken == undefined) {
      return;
    }
    const timer = setInterval(() => {
      getToken();
    }, 3500000); /* 50 minutes */
    return () => clearInterval(timer);
  }, [refreshToken]);

  useEffect(() => {
    if (accessToken == undefined) {
      return;
    }
    getSpotifyToken(accessToken);
    const timer = setInterval(() => {
      getSpotifyToken(accessToken);
    }, 3500000); /* 50 minutes */
    return () => clearInterval(timer);
  }, [accessToken]);

  return <></>;
};

const mapStateToProps = (state: any) => ({
  refreshToken: state.user.refresh_token,
  accessToken: state.user.access_token,
});

export default connect(
  mapStateToProps,
  { getToken: setUserAuth, getSpotifyToken: setUserAccount }
)(AuthRefresher);
