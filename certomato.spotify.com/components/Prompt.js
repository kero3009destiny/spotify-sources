import React, {Component} from 'react';
import { DialogAlert, Backdrop } from '@spotify-internal/creator-tape';
import PropTypes from 'prop-types';
import Markdown from '../components/Markdown';
import * as api from '../api/api';
import closeBtn from '../images/cross-btn.png';

class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      selectedImages: null,
      uploadUri: null,
      uploadError: null,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    try {
      const content = require(`../content/${this.props.route}/${this.markdownName()}`);
      return fetch(content).then((response) => response.text()).then((text) => {
        this.setState({ content: text });
      });
    } catch (err) {
      return null;
    }
  }

  setAutoperfResult(event) {
    this.props.testResult.alternatives[0].value = event.target.value;
  }

  markdownName() {
    return this.props.testResult.alternatives[0].id === 'EXEC' ? `${this.props.testResult.name}.md` : `${this.props.testResult.name}_result.md`;
  }

  buttonForAlternative(alternative, waitForUpload) {
    if (alternative.id === 'FAIL') {
      return <button key={alternative.id} className="btn btn-primary btn-xs" style={{backgroundColor: '#f00'}} onClick={this.props.onClick.bind(this, this.props.testResult.id, alternative, null)}>{alternative.label}</button>;
    }
    if (alternative.id === 'RETRY') {
      return <button key={alternative.id} className="btn btn-secondary btn-xs" onClick={this.props.onClick.bind(this, this.props.testResult.id, alternative, null)}>{alternative.label}</button>;
    }
    if (alternative.id === 'SKIP') {
      return <button key={alternative.id} className="btn btn-secondary btn-xs" onClick={this.props.onClick.bind(this, this.props.testResult.id, alternative, null)}>{alternative.label}</button>;
    }

    if (alternative.id === 'PASS' && waitForUpload) {
      this.uploadAlternative = alternative;
      return <button key={this.props.testResult.testId} className="btn btn-primary-light btn-xs" style={{borderColor: '#00f'}} onClick={this.triggerInputFile.bind(this)}>Upload File</button>;
    }

    return <button key={alternative.id} className="btn btn-primary btn-xs" onClick={this.props.onClick.bind(this, this.props.testResult.id, alternative, null)}>{alternative.label}</button>;
  }

  triggerInputFile() {
    this.fileInput.click();
  }

  selectedFile(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    this.setState({
      selectedImages: file,
    }, () => {
      this.uploadFile(this.uploadAlternative, file);
    });
  }

  uploadComplete(alternative, status) {
    if (status === 200) {
      this.props.onClick(this.props.testResult.id, alternative, null);
    }
  }

  uploadFile(alternative, file) {
    let allowedFormats = [];
    const imagesOnly = ['android_instructions'];
    const imagesAndPDF = ['device_box', 'device_picture', 'remote_picture'];
    const pdfOnly = ['instruction_manual'];
    const videoOnly = ['android_album_art_link', 'android_display_artwork', 'android_link_app_install', 'android_link_app'];
    if (imagesOnly.includes(this.props.testResult.name)) {
      allowedFormats = ['image/jpeg', 'image/png'];
    } else if (imagesAndPDF.includes(this.props.testResult.name)) {
      allowedFormats = ['image/jpeg', 'image/png', 'application/pdf'];
    } else if (pdfOnly.includes(this.props.testResult.name)) {
      allowedFormats = ['application/pdf'];
    } else if (videoOnly.includes(this.props.testResult.name)) {
      allowedFormats = ['video/quicktime', 'video/mp4'];
    }
    const testHasAllowedFileFormats = allowedFormats.length !== 0;
    if (testHasAllowedFileFormats && !allowedFormats.includes(file.type)) {
      this.setState({
        uploadError: 'fileFormatError',
      });
      this.setState({
        selectedImages: null,
      });
      return;
    }
    api.getUploadUri(this.props.testResult.testId, file.type).then((payload) => {
      const uploadUri = payload.data;
      api.uploadImage(file, uploadUri, this.uploadComplete.bind(this, alternative));
      this.setState({
        uploadError: null,
      });
    });
  }

  handleClose() {
    this.props.closePrompt();
    this.props.getTestResults(this.props.certSession.sessionId);
  }

  render() {
    const testResult = this.props.testResult;
    if (testResult.status !== 'PROMPT') {
      return null;
    }

    return (
      <div className="prompt">
        {<Backdrop center>
          <DialogAlert
            dialogTitle={this.props.groupTitle}
            style={{width: '800px', padding: 20, maxHeight: '100vh', overflow: 'scroll'}}
            body={
              <div className={'promptContainer'}>
                <button className={'closeButton'} onClick={this.handleClose}>
                  <img title="Close" src={closeBtn} />
                </button>
                <Markdown source={this.state.content} />
                {this.props.testResult.userPrompt && <h4>{this.props.testResult.userPrompt}</h4>}
                {this.state.uploadError && <p className="uploadError">Please upload files in the correct format</p>}
              </div>
            }
            footer={
              <div key={'footer'}>
                <input onChange={this.selectedFile.bind(this)} ref={fileInput => (this.fileInput = fileInput)} type="file" style={{display: 'none'}}/>
                {
                  testResult.alternatives.map(a => {
                    return (this.buttonForAlternative(a, testResult.uploadFile));
                  })
                }
              </div>
            }
          />);
        </Backdrop>
        }
      </div>);
  }
}

Prompt.propTypes = {
  testResult: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  closePrompt: PropTypes.func.isRequired,
  certSession: PropTypes.object.isRequired,
  getTestResults: PropTypes.func.isRequired,
  groupTitle: PropTypes.string.isRequired,
};

export default Prompt;
