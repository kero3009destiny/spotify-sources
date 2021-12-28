import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import * as api from '../api/api';
import Utils from '../utils/Utils';
import { Table, TableRow, TableCell, TableHeaderCell } from '@spotify-internal/creator-tape';
import queryString from 'query-string';

class TestStats extends Component {
  constructor(props) {
    super(props);
    const values = queryString.parse(window.location.search);
    this.state = {
      content: null,
      testErrors: null,
      title: values.name,
      interval: values.interval,
    };
  }

  componentDidMount() {
    const values = queryString.parse(window.location.search);
    this.loadStats(values.id, values.interval);
    this.loadErrors(values.id, values.interval);
  }

  loadStats(testId, weekInterval) {
    api.getTestStats(testId, weekInterval).then((payload) => {
      if (payload !== undefined) {
        this.setState({
          content: payload.data,
        });
      }
    });
  }

  loadErrors(testId, weekInterval) {
    api.getTestErrors(testId, weekInterval).then((payload) => {
      if (payload !== undefined) {
        this.setState({
          testErrors: payload.data,
        });
      }
    });
  }
  renderStats() {
    let row = 0;
    return Utils.exists(this.state.content) && this.state.content ? (
      <div className="testStatTrend">
        <h2>{this.state.title} trend last {this.state.content.dateInterval} </h2>
        <Table>
          <thead>
            <tr>
              <TableHeaderCell style={{color: '#000', fontWeight: 'bold'}}>{this.state.interval === '1' ? 'days' : 'weeks'}</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Passed %</TableHeaderCell>
              <TableHeaderCell>Passed</TableHeaderCell>
              <TableHeaderCell>Fail</TableHeaderCell>
              <TableHeaderCell>Error</TableHeaderCell>
              <TableHeaderCell>Flaky</TableHeaderCell>
              <TableHeaderCell>Skip</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {
              this.state.content.stats.map(stats => {
                row++;
                return (
                  <TableRow key={stats.testId + row}>
                    <TableCell>{stats.week}</TableCell>
                    <TableCell>{stats.total}</TableCell>
                    <TableCell>{stats.passPercentage ? stats.passPercentage : 0}%</TableCell>
                    <TableCell>{stats.pass}</TableCell>
                    <TableCell>{stats.fail}</TableCell>
                    <TableCell>{stats.error}</TableCell>
                    <TableCell>{stats.flaky}</TableCell>
                    <TableCell>{stats.skip}</TableCell>
                  </TableRow>);
              })
            }
          </tbody>
        </Table>
      </div>
    ) : <Spinner />;
  }

  renderErrors() {
    let row = 0;
    return Utils.exists(this.state.testErrors) && this.state.testErrors ? (
      <div className="testErrors">
        <h2>Fails and Errors</h2>
        <Table>
          <thead>
            <tr>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell style={{color: '#000', fontWeight: 'bold'}}>Error</TableHeaderCell>
              <TableHeaderCell>Count</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {
              this.state.testErrors.stats.map(stats => {
                row++;
                return (
                  <TableRow key={stats.testId + row}>
                    <TableCell>{stats.status}</TableCell>
                    <TableCell>{stats.errorString}</TableCell>
                    <TableCell>{stats.error}</TableCell>
                  </TableRow>);
              })}
          </tbody>
        </Table>
      </div>
    ) : <Spinner />;
  }

  render() {
    return (
      <div style={{overflow: 'visible', height: 'inherit'}}>
        <p>If status is FAIL it means that the test failed. If status is ERROR it means that there was a Certomato error, re-run test.</p>
        { this.renderStats() }
        { this.renderErrors() }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.content,
  ...state.testErrors,
  ...state.testBrandModelErrors,
});

TestStats.propTypes = {
  content: PropTypes.array,
  testErrors: PropTypes.array,
  testBrandModelErrors: PropTypes.array,
};

export default connect(mapStateToProps)(TestStats);
