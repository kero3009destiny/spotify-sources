import React, {Component, Fragment} from 'react';
import * as api from '../api/api';
import PropTypes from 'prop-types';
import {IconEdit, IconWithText, IconDelete,
  NavPill, NavPillList, NavPillListItem, NavPillPanel,
  Table, TableCell, TableHeaderCell, TableRow, Type} from '@spotify-internal/encore-web';
import Utils from '../utils/Utils';
import {NavLink} from 'react-router-dom';

class Organization extends Component {
  constructor(props) {
    super(props);
    this.orgUri = null;
    this.state = {
      users: null,
      user_name: '',
      admin_user: false,
      organization: {},
      activeTab: 0,
      brandName: '',
      brandClientId: '',
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleSubmitBrand = this.handleSubmitBrand.bind(this);
    this.handleAdminChecked = this.handleAdminChecked.bind(this);
    this.userMatch = this.userMatch.bind(this);
  }

  componentWillMount() {
    this.orgUri = this.getOrgUriFromWindowLocation();
    this.listUsers();
    this.getOrgAttributes();
  }

  getOrgUriFromWindowLocation() {
    const path = window.location.pathname.split('/');
    const orgUri = path.pop();
    return orgUri;
  }

  getOrgAttributes() {
    api.getOrganization(this.orgUri).then((payload) => {
      if (payload && payload.data) {
        this.setState({
          organization: payload.data,
        });
      }
    })
      .catch(() => {
        // handle unauthorized
        this.props.handleUnauth('Get org attributes');
      });
  }

  handleFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  userMatch(user) {
    return user.userName === this.state.user_name;
  }

  handleSubmitBrand() {
    api.addBrand(this.orgUri, this.state.brandName, this.state.brandClientId).then((payload) => {
      if (payload && payload.status) {
        let responseText = '';
        if (payload.status === 201) {
          responseText = `Successfully added the ${ this.state.brandName } brand to ${ this.state.organization.name }.`;
        } else if (payload.status === 409) {
          responseText = 'Brand and Client ID combination already exists for this organization';
        } else {
          responseText = 'Something went wrong. Please make sure both brand name and clientId are supplied';
        }
        this.props.displayApiBanner(payload.status, responseText);
        this.getOrgAttributes();
        this.setState({ brandName: '', brandClientId: ''});
      }
    })
      .catch(() => {
        this.props.handleUnauth('Add brand');
      });
  }

  handleDeleteBrand(id, name) {
    api.deleteBrand(this.orgUri, id).then((payload) => {
      if (payload && payload.status) {
        let responseText = '';
        if (payload.status === 200) {
          responseText = `Successfully delete the ${name} brand.`;
        } else {
          responseText = 'Something went wrong.';
        }
        this.props.displayApiBanner(payload.status, responseText);
        this.getOrgAttributes();
      }
    })
      .catch(() => {
        this.props.handleUnauth('Add brand');
      });
  }

  handleSubmitUser() {
    const userAlreadyExists = this.state.users && this.state.users.some(this.userMatch);
    this.setState({ user_name: '' });
    if (userAlreadyExists) {
      // TODO: Seems like the status isn't really used in the component.
      this.props.displayApiBanner(409, 'User already exists');
      return;
    }
    api.addUser(this.orgUri, this.state.user_name, this.state.admin_user).then((payload) => {
      if (payload && payload.status) {
        let responseText = '';
        if (payload.status === 200) {
          responseText = `Successfully added ${ this.state.user_name } to ${ this.state.organization.name }.`;
        } else if (payload.status === 409) {
          responseText = `Failed to add ${ this.state.user_name } to ${ this.state.organization.name }. User already exists.`;
        } else if (payload.status === 400) {
          responseText = `Username ${ this.state.user_name } does not exist.`;
        } else {
          responseText = `${ payload.status } Something went wrong.`;
        }
        this.props.displayApiBanner(payload.status, responseText);
        this.listUsers();
      }
    })
      .catch(() => {
        // handle unauthorized
        this.props.handleUnauth('Add user');
      });
  }

  listUsers() {
    api.getOrgUsers(this.orgUri).then((payload) => {
      if (payload && payload.data && payload.data.userInfo) {
        this.setState({
          users: payload.data.userInfo,
        });
      }
    })
      .catch(() => {
        // handle unauthorized
        this.props.handleUnauth('List users');
      });
  }

  handleAdminChecked() {
    this.setState({
      admin_user: !this.state.admin_user,
    });
  }

  verifyInput() {
    return Utils.exists(this.orgUri) && Utils.exists(this.state.user_name);
  }

  verifyBrandFormInput() {
    return Utils.exists(this.state.brandClientId) && Utils.exists(this.state.brandName);
  }

  render() {
    const navPillContent = [
      <NavPillPanel id="brands" aria-labelledby="brands-tab">
        <Type as="h2" variant={Type.heading3}>
          {this.state.organization.name} brands
        </Type>
        <h3>Add brand</h3>
        <div>
          <form>
            <div className="brand-form-element">
              <label className="brand-form-label">Brand</label>
              <input className="brand-form-input" type="text" name="brandName" value={this.state.brandName} onChange={this.handleFormChange}/>
            </div>
            <div className="brand-form-element">
              <label className="brand-form-label">Client ID</label>
              <input className="brand-form-input" type="text" name="brandClientId" value={this.state.brandClientId} onChange={this.handleFormChange}/>
            </div>
            {<button type="button" disabled={!this.verifyBrandFormInput()} onClick={this.handleSubmitBrand} className="btn btn-primary btn-xs buttonGreen">Add
              brand</button>}
          </form>
        </div>
        <div>
          <Table className={'brandsTable'}>
            <thead>
              <tr>
                <TableHeaderCell>Brand</TableHeaderCell>
                <TableHeaderCell>Client ID</TableHeaderCell>
                <TableHeaderCell/>
              </tr>
            </thead>
            <tbody>
              {Utils.exists(this.state.organization.brands) ? (this.state.organization.brands.map(brand =>
                (<TableRow key={`${brand.id}`}>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>{brand.clientId}</TableCell>
                  <TableCell><IconDelete onClick={this.handleDeleteBrand.bind(this, brand.id, brand.name)}/></TableCell>
                </TableRow>))) : null
              }
            </tbody>
          </Table>
        </div>
      </NavPillPanel>,
      <NavPillPanel id="users" aria-labelledby="users-tab">
        <div>
          <h3>Add user</h3>
          <div style={{marginBottom: '60px'}}>
            <form>
              <div className="access-mgmt-form-element">
                <label className="access-mgmt-label">Spotify Username</label>
                <input className="access-mgmt-input" type="text" name="user_name" value={this.state.user_name} onChange={this.handleFormChange}/>
              </div>
              {<button type="button" disabled={!this.verifyInput()} onClick={this.handleSubmitUser} className="btn btn-primary btn-xs buttonGreen">Add
                User</button>}
              <div style={{paddingTop: '20px'}}>
                <input type="checkbox" onChange={this.handleAdminChecked}/>
                <div className="access-mgmt-checkbox-txt">
                  This user belongs to the Spotify organization and should have Admin capabilities.
                </div>
              </div>
            </form>
          </div>
          <h3>List of users in <b>{this.state.organization.name}</b></h3>
          <div>
            <Table className={'reportingTable'}>
              <thead>
                <tr>
                  <TableHeaderCell>Spotify Username</TableHeaderCell>
                  <TableHeaderCell>Permission</TableHeaderCell>
                </tr>
              </thead>
              <tbody>
                {Utils.exists(this.state.users) ? (this.state.users.map(user =>
                  (<TableRow key={user.userName}>
                    <TableCell><NavLink
                      to={{pathname: `/user/${user.userName}/${user.group}`}}>{user.userName}</NavLink></TableCell>
                    <TableCell>{user.group}</TableCell>
                  </TableRow>))) : null
                }
              </tbody>
            </Table>
          </div>
        </div>
      </NavPillPanel>,
    ];
    return (
      <div>
        <h1>Certomato Access Management</h1>
        {!(this.props.featureFlags.includes('access_management') || this.props.admin) ?
          <h2>You do not have permission to view this content</h2> : (
            <div>
              <dl className="panel">
                {[
                  {label: 'Organization name',
                    value: (<NavLink to={`/organization/${this.state.organization.uri}/edit/`}><IconWithText icon={IconEdit} rightAlign>{this.state.organization.name}</IconWithText></NavLink>)},
                  {label: 'Organization URI', value: this.orgUri},
                  {label: 'Jira Org ID',
                    value: (<a target="_blank" href={`https://spotify.atlassian.net/jira/servicedesk/projects/HWS/organization/${this.state.organization.jiraOrgId}`}>{this.state.organization.jiraOrgId}</a>),
                  },
                  {label: 'Auto-Approved', value: this.state.organization.isAutoApproved ? 'Yes' : 'No'},
                ].map(({label, value}) => (
                  <Fragment key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </Fragment>
                ))}
              </dl>
              <NavPill
                list={<NavPillList>
                  <NavPillListItem
                    id="brands-tab"
                    aria-controls="brands"
                    active={this.state.activeTab === 0}
                    label="Brands"
                    onClick={() => this.setState({activeTab: 0})}
                  />
                  <NavPillListItem
                    id="users-tab"
                    aria-controls="users"
                    active={this.state.activeTab === 1}
                    label="Users"
                    onClick={() => this.setState({activeTab: 1})}
                  />
                </NavPillList>}>
                {navPillContent[this.state.activeTab]}
              </NavPill>
            </div>
          )}
      </div>);
  }
}

Organization.propTypes = {
  admin: PropTypes.bool,
  featureFlags: PropTypes.array,
  displayApiBanner: PropTypes.func.isRequired,
  handleUnauth: PropTypes.func.isRequired,
};

export default Organization;
