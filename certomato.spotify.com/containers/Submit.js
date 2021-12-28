import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Markdown from '../components/Markdown';
import * as api from '../api/api';
import {Backdrop, DialogAlert, FormCheckbox, FormInput} from '@spotify-internal/creator-tape';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { checkboxChange, getSubmissionFields, textfieldDidChange } from '../redux/actions/submissionActions';
import { setNoDevice } from '../redux/actions/certSessionActions';
import {TEXTFIELD_COMPANY, TEXTFIELD_FIRSTNAME, TEXTFIELD_LASTNAME, TEXTFIELD_EMAIL, TEXTFIELD_FWVERSION} from '../redux/actions/types';
import Spinner from '../components/Spinner';
import CertificationReport from '../components/CertificationReport';
import { CERTIFICATION_STATUSES } from '../utils/Constants';
import Utils from '../utils/Utils';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      certificationReport: null,
      submitted: false,
      automaticallyPassed: false,
    };

    this.submitCertification = this.submitCertification.bind(this);
  }

  componentWillMount() {
    this.props.getSubmissionFields();
    this.loadCertification();
    try {
      const content = require('../content/submit/summary.md');
      return fetch(content).then((response) => response.text()).then((text) => {
        this.setState({ content: text });
      });
    } catch (err) {
      return null;
    }
  }

  loadCertification() {
    api.getCertificationReport(this.props.certSession.sessionId).then((payload) => {
      if (Utils.exists(payload)) {
        this.setState({
          certificationReport: payload.data,
        });
      }
    });
  }

  submitCertification() {
    api.changeCertificationStatus(this.props.certSession.sessionId, CERTIFICATION_STATUSES.SUBMITTED).then((payload) => {
      if (Utils.exists(payload)) {
        this.setState({
          submitted: true,
          automaticallyPassed: payload.data.status === CERTIFICATION_STATUSES.PASSED,
        });
      }
    });
  }

  renderSubmissionForm() {
    const company = this.props.submission.textfields[TEXTFIELD_COMPANY].text;
    const firstName = this.props.submission.textfields[TEXTFIELD_FIRSTNAME].text;
    const familyName = this.props.submission.textfields[TEXTFIELD_LASTNAME].text;
    const email = this.props.submission.textfields[TEXTFIELD_EMAIL].text;
    const fwVersion = this.props.submission.textfields[TEXTFIELD_FWVERSION].text;
    return (
      <div className="certReport">
        <h2>{company.length > 2 ? company : <i>(company name)</i>} Certification Submission</h2>
        <br />
        <p>
          I, <b>{firstName ? `${firstName} ${familyName}` : '(name)'}</b> ({email.length ? email : 'email'}), on behalf of <b>{company}</b> submit this certification report to Spotify, in order
          to get Certified for Spotify Connect<sup style={{color: '#000'}}>®</sup>.
        </p>
        <div>
          {Object.keys(this.props.submission.checkboxes).map(key => {
            const checkbox = this.props.submission.checkboxes[key];
            return (
              <FormCheckbox
                className="formCheckbox"
                onClick={this.props.checkboxChange.bind(this, key)}
                checked={checkbox.checked}>
                {checkbox.description}
              </FormCheckbox>
            );
          })
          }
        </div>
        <p>
          I assure that I have used the firmware version {fwVersion.length > 0 ? fwVersion : <b>(firmware version)</b>} when running all tests on Certomato. <br />
          If the firmware version was changed at any time during testing, I re-ran all tests on the new version.
        </p>
        <br />
        Signed,<br />
        <b>{`${firstName} ${familyName}`}</b><br />
        {Utils.formattedTimeStamp(Date.now())}
        <br />
        <div style={{textAlign: 'right'}}>
          {this.props.finishedCertification && this.props.submission.readyToSubmit ? (
            <button className="btn btn-primary btn-xs" onClick={this.submitCertification}>
              Submit
            </button>
          ) : (
            <>
              <button className="btn btn-primary btn-xs disabled buttonRed" disabled>
                Submit
              </button>
              <p style={{color: 'red', marginRight: 20}}>Fill in all details to submit</p>
            </>
          )}
        </div>
      </div>
    );
  }

  renderEnterInformation() {
    return (
      <div>
        <Markdown source={this.state.content}/>
        <br />
        {Object.keys(this.props.submission.textfields).map(key => {
          const textfield = this.props.submission.textfields[key];
          return (
            <div>
              <FormInput id={key} className="formInput" placeholder={textfield.description} onChange={input => {this.props.textfieldDidChange(input.target.id, input.target.value);}}/>
              <br />
            </div>
          );
        })
        }
      </div>
    );
  }

  renderPrompt() {
    if (this.state.submitted === true) {
      return (
        <div className="prompt">
          {<Backdrop center>
            <DialogAlert
              style={{width: '800px', padding: 20}}
              body={
                <div>
                  <h2>Thank you for your submission.</h2>
                  {this.state.automaticallyPassed && (
                    <div>
                      <p>Congratulations, the device has <strong>automatically passed certification</strong> based on the testing you have performed and submitted.</p>
                      <p>You should <strong>not</strong> create a JIRA certification ticket for this submission, as the device is now already approved.</p>
                      <p>If you don't have an approved Distribution Agreement v2 (specified in the top right corner in the agreement), please complete the <a href="https://docs.google.com/forms/d/e/1FAIpQLSclU4TY10jgwZcvqBT1U3NGieGihH2_FnwpKvOxl4_pe7UF7g/viewform" target="_blank" >Distribution Agreement application form</a>. Partners are not allowed to launch before a distribution agreement has been approved by Spotify.</p>
                    </div>
                  )}
                  <p>Your Certification Report has ID <strong>{this.props.certSession.sessionId}</strong> and can always be found under "Certifications".</p>
                </div>
              }
              footer={
                <div key={'footer'}>
                  <NavLink className="btn btn-primary btn-xs" to={`/certification/${this.props.certSession.sessionId}`} onClick={this.props.setNoDevice}>
                    View Certification Report
                  </NavLink>
                </div>
              }
            />);
          </Backdrop>
          }
        </div>);
    }

    return null;
  }

  render() {
    return (
      <div style={{overflow: 'visible', height: 'inherit'}}>
        {this.renderPrompt()}
        {this.props.finishedCertification === true ? <h1>Submit Certification</h1> : <h1>Certification not finished.</h1>}
        {this.props.finishedCertification === true ? this.renderEnterInformation() : (
          <h3>
            <span style={{color: 'red'}}>
              Your device has not passed all tests and cannot be submitted for review.<br />
              Once the device has passed all applicable tests, you will be able to submit a certification request to Spotify.
            </span>
          </h3>
        )}
        <br />
        {this.renderSubmissionForm()}
        <br />
        <br />
        <br />
        {this.state.certificationReport ? <CertificationReport certificationReport={this.state.certificationReport} isAdmin={false} /> : <Spinner />}
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.submission, ...state.submission,
});

Submit.propTypes = {
  finishedCertification: PropTypes.bool,
  certSession: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  checkboxChange: PropTypes.func.isRequired,
  setNoDevice: PropTypes.func.isRequired,
  getSubmissionFields: PropTypes.func.isRequired,
  textfieldDidChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { checkboxChange, setNoDevice, getSubmissionFields, textfieldDidChange })(Submit);
