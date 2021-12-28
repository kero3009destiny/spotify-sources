import React, {Component} from 'react';
import {FormTextarea, Table} from '@spotify-internal/creator-tape';
import PropTypes from 'prop-types';
import TestTableRow from './TestTableRow';
import Utils from '../utils/Utils';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.runTests = this.runTests.bind(this);
    this.setTestsNotApplicable = this.setTestsNotApplicable.bind(this);
    this.clearTests = this.clearTests.bind(this);
  }

  setGroupNotApplicable(group) {
    let tests = group.tests[0].id;
    group.tests.slice(1).map(t => {
      return (
        tests = `${tests},${[t.id]}`
      );
    });
    this.setTestsNotApplicable(tests);
  }

  setTestsNotApplicable(tests) {
    if (this.props.running === false) {
      this.props.setTestsNotApplicable(tests, null, this.state.formValue);
    }
  }

  clearGroup(group) {
    let tests = group.tests[0].id;
    group.tests.slice(1).map(t => {
      return (
        tests = `${tests},${[t.id]}`
      );
    });
    this.clearTests(tests);
  }

  clearTests(tests) {
    if (this.props.running === false) {
      this.props.clearTests(tests, null, this.state.formValue);
    }
  }

  handleChange(event) {
    this.setState({formValue: event.target.value});
  }

  runTestGroup(group) {
    let tests = group.tests[0].id;
    group.tests.slice(1).map(t => {
      return (
        tests = `${tests},${[t.id]}`
      );
    });
    this.runTests(tests);
  }

  runTests(tests) {
    if (this.props.running === false) {
      this.props.runTests(tests, null, this.state.formValue);
    }
  }

  stopTests() {
    this.props.stopTests();
  }

  colorForState() {
    if (this.props.enabled) {
      return ('#000');
    }
    return ('#bbb');
  }

  cursorStyle() {
    if (this.props.running) {
      return 'progress';
    }
    return this.props.enabled ? 'pointer ' : 'not-allowed';
  }

  disableTests() {
    if (this.props.running === true) {
      return true;
    } else if (!this.props.enabled) {
      return true;
    } else if (this.props.group.needsInput === true && this.state.formValue === '') {
      return true;
    }

    return false;
  }

  renderFormIfNeeded() {
    return this.props.group.needsInput === true ? (<form onSubmit={this.handleSubmit}>
      <FormTextarea
        type="text"
        placeholder={'{ .. your JSON response }'}
        value={this.state.formValue}
        onChange={this.handleChange}
        style={{fontFamily: '"Courier New", Courier, monospace, Arial, Verdana, Helvetica', width: '800px', height: '400px', padding: 10, marginLeft: 1}}/>
      <br />
    </form>) : null;
  }

  renderGroupIfTestsExists() {
    return this.props.group.tests !== undefined ? (
      <Table>
        <thead>
          <tr>
            <th style={{padding: 10, paddingTop: 20, paddingBottom: 20}} colSpan={3}>
              <button className="btn btn-primary btn-xs pull-left btnrunall" onClick={this.runTestGroup.bind(this, this.props.group)} disabled={this.disableTests()} style={{cursor: this.cursorStyle()}}>
                {this.props.running ? 'Running' : 'Run All'}
              </button>&nbsp;
              <button className="btn btn-primary btn-xs buttonGray" onClick={this.clearGroup.bind(this, this.props.group)} disabled={this.disableTests()} style={{cursor: this.cursorStyle()}}>
                {this.props.running ? 'Clearing Results' : 'Clear Results'}
              </button>&nbsp;
              {this.props.group.skippable && (<button className="btn btn-primary btn-xs buttonBlue" onClick={this.setGroupNotApplicable.bind(this, this.props.group)} disabled={this.disableTests()} style={{cursor: this.cursorStyle()}}>
                {this.props.running ? 'Setting section to NA' : 'Section Not Applicable'}</button>)}
              {this.props.running ? (<button className="btn btn-primary btn-xs pull-left buttonRed" onClick={this.stopTests.bind(this)} style={{marginLeft: 10}}>
                Stop
              </button>) : null}
              <br />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="tableHeader">
            <td>
              &nbsp;
            </td>
            <td>
              TEST NAME
            </td>
            <td>
              TEST DESCRIPTION
            </td>
            <td>
              MESSAGE
            </td>
          </tr>
          {this.props.group.tests.map(test => {
            let testResult;
            if (Utils.exists(this.props.testResults)) {
              testResult = this.props.testResults[test.id];
            }
            return (
              <TestTableRow
                testResult={testResult}
                test={test}
                runTests={this.runTests}
                running={this.props.running}
                enabled={this.props.enabled}
                key={test.id}
              />
            );
          })}
        </tbody>
      </Table>
    ) : 'No tests added yet';
  }

  render() {
    return (
      <div style={{color: this.colorForState()}}>
        {this.renderFormIfNeeded()}
        {this.renderGroupIfTestsExists()}
      </div>
    );
  }
}

Group.propTypes = {
  group: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired,
  testResults: PropTypes.object.isRequired,
  runTests: PropTypes.func.isRequired,
  stopTests: PropTypes.func.isRequired,
  running: PropTypes.bool.isRequired,
  setTestsNotApplicable: PropTypes.func.isRequired,
  clearTests: PropTypes.func.isRequired,
};

export default Group;
