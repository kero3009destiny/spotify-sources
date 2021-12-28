import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import { getCertificationReport } from '../redux/actions/certificationsActions';
import Utils from '../utils/Utils';
import * as api from '../api/api';
import CertificationReport from '../components/CertificationReport';

class Certification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.getCertificationIdFromWindowLocation()) {
      this.props.getCertificationReport(
        this.getCertificationIdFromWindowLocation(),
      );
    }
  }

  handleCertificationStatusChange(status) {
    api
      .changeCertificationStatus(
        this.props.certificationReport.certificationId,
        status,
      )
      .then((response) => {
        if (response && response.status === 200) {
          this.props.getCertificationReport(
            this.props.certificationReport.certificationId,
          );
        }
      });
  }

  handleCertificationDelete() {
    api
      .deleteCertification(this.props.certificationReport.certificationId)
      .then((response) => {
        if (response && response.status === 204) {
          this.props.history.push('/');
        }
      });
  }

  getCertificationIdFromWindowLocation() {
    const certificationId = window.location.pathname.split('/').pop();
    return certificationId !== 'certification' && certificationId.length > 0
      ? certificationId
      : null;
  }

  render() {
    return (
      <div style={{ overflow: 'visible', height: 'inherit' }}>
        {Utils.exists(this.props.certificationReport) ? (
          <CertificationReport
            getCertificationReport={this.props.getCertificationReport}
            certificationReport={this.props.certificationReport}
            isAdmin={this.props.admin}
            handleCertificationStatusChange={
              this.handleCertificationStatusChange.bind(this)
            }
            handleCertificationDelete={
              this.handleCertificationDelete.bind(this)
            }
          />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  certificationReport: state.certifications.certificationReport,
});

Certification.propTypes = {
  certificationReport: PropTypes.object,
  getCertificationReport: PropTypes.func.isRequired,
  admin: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, { getCertificationReport })(
  Certification,
));
