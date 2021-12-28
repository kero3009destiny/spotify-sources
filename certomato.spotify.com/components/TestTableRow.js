import React from 'react';
import PropTypes from 'prop-types';
import spinnerIcon from '../images/spinner.gif';
import okIcon from '../images/ok.png';
import failIcon from '../images/fail.png';
import errorIcon from '../images/error.png';
import skipIcon from '../images/skip.png';
import flakyIcon from '../images/flaky.png';
import startIcon from '../images/start.png';
import startIconDisabled from '../images/start_disabled.png';

const TestTableRow = (props) => {
  const iconForStatus = () => {
    if (props.testResult === undefined) {
      return props.enabled && !props.running ? startIcon : startIconDisabled;
    }

    const status = props.testResult.testResult.status;

    if (status === 'RUNNING') {
      return spinnerIcon;
    } else if (status === 'PASS') {
      return okIcon;
    } else if (status === 'FAIL') {
      return failIcon;
    } else if (status === 'ERROR') {
      return errorIcon;
    } else if (status === 'SKIP') {
      return skipIcon;
    } else if (status === 'FLAKY') {
      return flakyIcon;
    }
    return startIcon;
  };

  const altForStatus = () => {
    if (props.testResult === undefined) {
      return props.enabled && !props.running ? 'Run test' : 'Test disabled';
    }

    const status = props.testResult.testResult.status;

    if (status === 'RUNNING') {
      return 'Running';
    } else if (status === 'PASS') {
      return 'Passed';
    } else if (status === 'FAIL') {
      return 'Fail';
    } else if (status === 'ERROR') {
      return 'Error';
    } else if (status === 'SKIP') {
      return 'Skipped';
    } else if (status === 'FLAKY') {
      return 'Flaky.  We are currently experiencing issues with this test. Re-running might make it pass. Otherwise, please conduct manual testing if possible. After this no further action is needed from your side. Spotify will perform manual testing during certification.';
    }
    return 'Run test';
  };
  const cursorStyle = () => {
    if (props.running) {
      return 'progress';
    }
    return props.enabled ? 'pointer ' : 'not-allowed';
  };

  const formattedTestStatus = () => {
    if (props.testResult === undefined) {
      return ' ';
    }

    return (<p key={props.testResult.testResult.id} style={{color: '#f00', padding: 0, margin: 0}}>{props.testResult.testResult.error}</p>);
  };

  return (
    <tr className="testRow">
      <td style={{width: 60, paddingLeft: 15, minWidth: 50}}>
        <img title= {altForStatus(props.testResult)} src={iconForStatus(props.testResult)} width={24} onClick={() => props.runTests(props.test.id)} style={{cursor: cursorStyle(props.running)}}/>
      </td>
      <td style={{padding: 0, paddingLeft: 4}}>
        {props.test.name}
      </td>
      <td style={{paddingRight: 20, color: '#777'}}>
        {props.test.description}
      </td>
      <td style={{paddingRight: 20, width: 250}}>
        {formattedTestStatus(props.testResult)}
      </td>
    </tr>
  );
};

TestTableRow.propTypes = {
  test: PropTypes.object.isRequired,
  testResult: PropTypes.object,
  runTests: PropTypes.func.isRequired,
  running: PropTypes.bool.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default TestTableRow;
