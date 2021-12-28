import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api/api';
import { IconArrowLeft } from '@spotify-internal/creator-tape';
import {NavLink} from 'react-router-dom';


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: '',
      userName: null,
      groupName: null,
      userDeleted: false,
    };
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.handleChangePermission = this.handleChangePermission.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentWillMount() {
    const info = this.getUserInfoFromWindowLocation();
    this.setState({
      userName: info[0],
      groupName: decodeURI(info[1]),
    });
  }

  getUserInfoFromWindowLocation() {
    const path = window.location.pathname.split('/');
    const groupName = path.pop();
    const userName = path.pop();
    return [userName, groupName];
  }

  handleDropDownChange(event) {
    if (event.target.value !== this.state.groupName) {
      this.setState({
        permission: event.target.value,
      });
    } else {
      this.props.displayApiBanner(409, 'User already has this permission');
    }
  }

  handleChangePermission() {
    api.moveUser(this.state.userName, this.state.groupName, this.state.permission).then((payload) => {
      if (payload && payload.status) {
        if (payload.status === 200) {
          this.setState({
            groupName: this.state.permission,
          });
          this.props.displayApiBanner(200, `User permission changed to ${ this.state.permission}`);
        } else {
          this.props.displayApiBanner(500, 'Failed to change permission.');
        }
      }
    })
      .catch(() => {
        // handle unauthorized
        this.props.handleUnauth('Move user');
      });
  }

  handleDeleteUser() {
    api.deleteUser(this.state.userName).then((payload) => {
      if (payload && payload.status) {
        if (payload.status === 200) {
          this.props.displayApiBanner(200, 'User has been deleted.');
          this.setState({
            userDeleted: true,
          });
        } else {
          this.props.displayApiBanner(500, 'Failed to delete user.');
        }
      }
    })
      .catch(() => {
        // handle unauthorized
        this.props.handleUnauth('Delete user');
      });
  }

  render() {
    return (
      <div>
        <h1>Certomato User Management</h1>
        {!(this.props.featureFlags.includes('access_management') || this.props.admin) ? <h2>You do not have permission to view this content</h2> :
          <div>
            {!this.state.userDeleted ?
              <div>
                <div className="org-info-box">
                  Username: <a target="_blank" href={`https://useradmin2.spotify.net/user/${this.state.userName}`}>{this.state.userName}</a><br/>
                  Permission: {this.state.groupName}<br/>
                </div>
                <h3>Change permission for user</h3>
                <form>
                  <label>
                    <select className="access-mgmt-drop-down" value={this.state.permission} onChange={this.handleDropDownChange}>
                      <option className="access-mgmt-drop-down-option" value="">Select new permission</option>
                      <option value="Speaker Partner User">User</option>
                      <option value="Speaker Partner Admin">Admin</option>
                      <option value="Speaker Partner Inactive">Inactive</option>
                      <option value="Speaker Partner Org Manager">Org Manager</option>
                    </select>
                  </label>
                  {this.state.permission ? <button style={{'width': '235px', 'height': '40px'}} type="button" onClick={this.handleChangePermission} className="btn btn-primary btn-xs buttonGreen">Change permission</button> : null}
                </form>
                <h3>Delete User</h3>
                {this.state.groupName === 'Speaker Partner Inactive' ? <div>
                This action will permanently delete this user from Certomato.<br/>
                  <button style={{'marginTop': '12px', 'width': '235px', 'height': '40px', 'backgroundColor': '#e22134'}} className="btn btn-primary btn-xs buttonRed" type="button" onClick={this.handleDeleteUser}>Delete User</button>
                </div> : <div>
                A user must be "Inactive" to be deleted. If you want to permanently delete the user, change the permission to Inactive first.<br/>
                  <button style={{'marginTop': '12px', 'width': '235px', 'height': '40px', 'textDecoration': 'line-through', 'backgroundColor': 'lightgray'}} className="btn btn-primary btn-xs buttonGray" type="button">Delete User</button>
                </div>}
              </div> : <div>
                <h3><NavLink to={{pathname: '/access/management/'}}><IconArrowLeft style={{'marginRight': '15px', 'position': 'relative', 'top': '4px'}} iconSize={24} aria-label="IconArrowLeft" />Back to access management</NavLink></h3>
              </div>}
          </div>
        }
      </div>
    );
  }
}

User.propTypes = {
  admin: PropTypes.bool,
  featureFlags: PropTypes.array,
  displayApiBanner: PropTypes.func.isRequired,
  handleUnauth: PropTypes.func.isRequired,
};

export default User;
