import React from 'react';
import Auth from '../utils/Auth';

/**
 * Top section on the landing page that prompts the user to login and select a device.
 */
const Login = () => {
  return (
    <div>
      {
        <div className="loginLoginButton">
          <a className="btn btn-primary btn-s" href={Auth.getLoginLink()} style={{backgroundColor: '#fff', color: '#000'}}>
            Login
          </a>
        </div>
      }
    </div>
  );
};

export default Login;

