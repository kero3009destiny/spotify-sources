import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TableCell, TableHeaderCell, TableRow} from '@spotify-internal/encore-web';
import Spinner from '../components/Spinner';
import * as api from '../api/api';
import Utils from '../utils/Utils';
import {NavLink} from 'react-router-dom';

class AccessManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      org_name: '',
      org_id: '',
      checked: false,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmitOrg = this.handleSubmitOrg.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.orgMatch = this.orgMatch.bind(this);
  }

  componentWillMount() {
    this.listOrgs();
  }

  // eslint-disable-next-line no-irregular-whitespace
  listOrgs() {
    api.getOrgs().then((payload) => {
      if (payload && payload.data && payload.data.organizations) {
        this.setState({
          content: payload.data.organizations,
        });
      }
    })
      .catch(() => {
        // handle unauthorized
        this.props.handleUnauth('List organizations');
      });
  }

  handleFormChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  orgMatch(org) {
    return org.name.toLowerCase() === this.state.org_name.toLowerCase();
  }

  handleSubmitOrg() {
    const orgAlreadyExists = this.state.content.some(this.orgMatch);
    if (orgAlreadyExists) {
      // TODO: Seems like the status isn't really used in the component.
      this.props.displayApiBanner(409, 'Organization already exists');
      return;
    }
    api.addOrg(this.state.org_id, this.state.org_name).then((payload) => {
      if (payload && payload.status) {
        let responseText = '';
        if (payload.status === 200) {
          responseText = `Successfully added ${ this.state.org_name } to Certomato.`;
        } else if (payload.status === 409) {
          responseText = `Failed to add ${ this.state.org_name } to Certomato. Organization already exist.`;
        } else {
          responseText = `${ payload.status } Something went wrong.`;
        }
        this.props.displayApiBanner(payload.status, responseText);
        this.listOrgs();
      }
    })
      .catch(() => {
        // handle unauthorized
        this.props.handleUnauth('Add organization');
      });
  }

  handleChecked() {
    this.setState({
      checked: !this.state.checked,
    });
  }

  verifyInput() {
    return this.state.checked && Utils.exists(this.state.org_name) && Utils.exists(this.state.org_id);
  }

  render() {
    let row = 0;
    return (
      <div>
        <h1>Certomato Access Management</h1>
        {
          !(this.props.featureFlags.includes('access_management') || this.props.admin) ? <h2>You do not have permission to view this content</h2> :
            <div>
              <div style={{marginBottom: '60px'}}>
                <h3>Create new organization</h3>
                <div>
                  If an organization does not exist in the list below, you can add a new organization to Certomato by filling in the fields below.
                  Verify that you have entered the correct information by checking the box.
                  Once you have filled in the information and checked the box a button will appear where you can add the organization.
                </div>
                &nbsp;
                <form>
                  <div className="access-mgmt-form-element">
                    <label className="access-mgmt-label">Organization Name</label>
                    <input className="access-mgmt-input" type="text" name="org_name" onChange={this.handleFormChange}/>
                  </div>
                  <div className="access-mgmt-form-element">
                    <label className="access-mgmt-label">Organization ID</label>
                    <input className="access-mgmt-input" type="text" name="org_id" placeholder="Jira org ID" onChange={this.handleFormChange}/>
                  </div>
                  {this.verifyInput() ? <button type="button" onClick={this.handleSubmitOrg} className="btn btn-primary btn-xs buttonGreen">Add Organization</button> : null}
                  <div style={{paddingTop: '20px'}}>
                    <input type="checkbox" onChange={this.handleChecked}/>
                    <div className="access-mgmt-checkbox-txt">
                      I have searched for the organization name <b>{this.state.org_name}</b> <a className="access-mgmt-hyperlink" href="https://spotify.atlassian.net/jira/servicedesk/projects/HWS/customers">here</a> and
                      double checked that the organization ID <b>{this.state.org_id}</b> corresponds to this organization.
                    </div>
                  </div>
                </form>
              </div>
              <h3>{Utils.exists(this.state.content) ? `List of organizations in Certomato (${this.state.content.length})` : null}</h3>
              <div>
                The table below shows all organizations in Certomato.
                Click on an organization name to view and add user to the organization.
              </div>
              &nbsp;
              <Table className={'reportingTable'}>
                <thead>
                  <tr>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Jira Org ID</TableHeaderCell>
                    <TableHeaderCell>Auto approved</TableHeaderCell>
                  </tr>
                </thead>
                <tbody>
                  {Utils.exists(this.state.content) ? (
                    this.state.content.map(org => {
                      row++;
                      return (
                        <TableRow key={org.name + row}>
                          <TableCell style={{
                            color: '#000',
                            width: 25,
                            padding: 10,
                            fontWeight: 'bold',
                          }}><NavLink to={`/organization/${org.uri}`}>{org.name}</NavLink></TableCell>
                          <TableCell>{org.jiraOrgId}</TableCell>
                          <TableCell>{org.isAutoApproved ? 'Yes' : 'No'}</TableCell>
                        </TableRow>);
                    })) : <Spinner />}
                </tbody>
              </Table>
            </div>
        }
      </div>
    );
  }
}

AccessManagement.propTypes = {
  admin: PropTypes.bool,
  featureFlags: PropTypes.array,
  displayApiBanner: PropTypes.func.isRequired,
  handleUnauth: PropTypes.func.isRequired,
};

export default AccessManagement;
