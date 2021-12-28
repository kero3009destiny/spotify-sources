import React, { Component } from 'react';
import { Table, TableRow, TableCell, TableHeaderCell, FormGroup, FormInput, FormSelect } from '@spotify-internal/creator-tape';
import { IconSpotifyLogo, IconWithText, Tag, Type, spacer4 } from '@spotify-internal/encore-web';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { pick } from 'lodash';
import { getCertifications } from '../redux/actions/certificationsActions';
import classNames from 'classnames';
import Spinner from '../components/Spinner';
import Utils from '../utils/Utils';
import { CERTIFICATION_FILTERS, CERTIFICATION_STATUSES } from '../utils/Constants';

class Certifications extends Component {
  constructor(props) {
    super(props);
    this.timeout = '';
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      search: urlParams.get('search') || '',
      status: urlParams.get('status') || (props.isAdmin ? CERTIFICATION_FILTERS.SUBMITTED : CERTIFICATION_FILTERS.ALL),
    };
  }

  componentDidMount() {
    this.props.getCertifications(this.state.search, this.state.status);
  }

  getNewUrlParams(key, value) {
    const urlParams = new URLSearchParams(this.state);
    if (value) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }
    return urlParams;
  }

  handleSearch(e) {
    e.preventDefault();
    const value = e.target.value;
    const element = e.target.id;
    this.setState({ [element]: value });
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    this.timeout = setTimeout(() => {
      const urlParams = this.getNewUrlParams(element, value);
      this.props.getCertifications(urlParams.get('search'), urlParams.get('status'));
      if (window.history.pushState) {
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({path: newUrl}, '', newUrl);
      }
    }, 500);
  }

  renderTags(certification) {
    const isActive = certification.certificationId === this.props.currentSession?.sessionId;
    const isOnline = certification.status === CERTIFICATION_STATUSES.TESTING && this.props.devices.some(device => device.id === certification.deviceId);

    return (
      <>
        {isOnline && (
          <Tag colorSet="announcement" selectedColorSet="positive" selected={isActive}>
            {isActive ? 'Active' : 'Online'}
          </Tag>
        )}
        {certification.employee && (
          <IconWithText icon={IconSpotifyLogo} spacer={spacer4}>
            <Type variant={Type.body3}>Employee</Type>
          </IconWithText>
        )}
      </>
    );
  }

  renderCertifications() {
    let row = 0;
    return (
      <div>
        <Table className={'reportingTable'}>
          <thead>
            <tr>
              <TableHeaderCell>Certification ID</TableHeaderCell>
              <TableHeaderCell>Brand</TableHeaderCell>
              <TableHeaderCell>Model</TableHeaderCell>
              <TableHeaderCell>Product ID</TableHeaderCell>
              <TableHeaderCell>Client ID</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {this.props.certifications ? (
              Object.values(pick(
                this.props.certifications, this.props.filters[this.state.status],
              )).map(certification => {
                row++;
                return (
                  <TableRow key={certification.certificationId + row}>
                    <TableCell>
                      <NavLink to={`/certification/${certification.certificationId}`}>
                        {certification.certificationId}
                      </NavLink>
                    </TableCell>
                    <TableCell>{certification.brand}</TableCell>
                    <TableCell>{certification.model}</TableCell>
                    <TableCell>{certification.productId}</TableCell>
                    <TableCell>{certification.clientId}</TableCell>
                    <TableCell>{Utils.formattedTimeStamp(certification.date)}</TableCell>
                    <TableCell className={classNames(
                      'status',
                      certification.status === CERTIFICATION_STATUSES.SUBMITTED && 'submitted',
                      certification.status === CERTIFICATION_STATUSES.FAILED && 'failed',
                      certification.status === CERTIFICATION_STATUSES.PASSED && 'passed',
                    )}>{certification.status}</TableCell>
                    <TableCell>
                      {this.renderTags(certification)}
                    </TableCell>
                  </TableRow>);
              })) : null}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Certifications</h2>
        <form id="certificationSearchForm">
          <FormGroup label="Brand/Model" labelFor="search" className="certificationSearchFormGroup">
            <FormInput id="search" className="certificationSearchFormInput" placeholder={'Brand or model'} value={this.state.search} onChange={(e) => this.handleSearch(e)}/>
          </FormGroup>
          <FormGroup label="Status" labelFor="status" className="certificationSearchFormGroup">
            <FormSelect id="status" className="certificationSearchFormInput" defaultValue={this.state.status} onChange={(e) => this.handleSearch(e)}>
              <option value={CERTIFICATION_FILTERS.ALL}>All</option>
              <option value={CERTIFICATION_FILTERS.PASSED}>Passed</option>
              <option value={CERTIFICATION_FILTERS.SUBMITTED}>Submitted</option>
              <option value={CERTIFICATION_FILTERS.TESTING}>Testing</option>
              <option value={CERTIFICATION_FILTERS.FAILED}>Failed</option>
            </FormSelect>
          </FormGroup>
        </form>
        {
          !!this.props.filters[this.state.status] ? this.renderCertifications() : null
        }
        {
          !this.props.filters[this.state.status] ? <Spinner /> : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.certifications,
  ...state.devices,
});

Certifications.propTypes = {
  certifications: PropTypes.object,
  filters: PropTypes.object,
  getCertifications: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  currentSession: PropTypes.object,
};

export default connect(mapStateToProps, { getCertifications })(Certifications);
