import React, { Component } from 'react';
import * as api from '../api/api';
import Spinner from '../components/Spinner';
import { Table, TableRow, TableCell, TableHeaderCell, IconArrowDown, IconArrowUp } from '@spotify-internal/creator-tape';
import {NavLink} from 'react-router-dom';
import { ButtonSecondary} from '@spotify-internal/creator-tape';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      interval: 8,
    };
    this.nextSortOrder = 'desc';
    this.lastSortField = 'testName';
  }

  componentWillMount() {
    this.loadStats(this.state.interval);
  }

  loadStats(interval) {
    api.getStats(interval).then((payload) => {
      if (payload !== undefined && !(payload.data.constructor === Object && Object.entries(payload.data).length === 0)) {
        this.setState({
          content: payload.data.stats.sort((a, b) => {
            let compare;
            if ((typeof a[this.lastSortField]) === 'string') {
              compare = a[this.lastSortField].toLowerCase() < b[this.lastSortField].toLowerCase() ? -1 : 1;
            } else {
              compare = (a[this.lastSortField] || 0) < (b[this.lastSortField] || 0) ? -1 : 1;
            }
            if (this.nextSortOrder === 'asc') { // last time the sort was desc, so should still be that way
              return -compare;
            }
            return compare;
          }),
          interval: interval,
        });
      } else {
        this.setState({
          content: [],
          interval: interval,
        });
      }
    });
  }

  sort(field, fieldType) {
    const sorted = this.state.content.sort((a, b) => {
      if (fieldType === 'string') {
        return a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1;
      } else if (fieldType === 'integer') {
        // Handle that some stats can be undefined
        return (a[field] || 0) < (b[field] || 0) ? -1 : 1;
      }
      return 0;
    });
    // Another column was clicked, reset to asc
    if (this.lastSortField !== field) {
      this.nextSortOrder = 'desc';
    } else if (this.nextSortOrder === 'asc') {
      this.nextSortOrder = 'desc';
    } else { // Next sort order is desc, so reverse array and set back to asc
      sorted.reverse();
      this.nextSortOrder = 'asc';
    }
    this.lastSortField = field;
    this.setState({
      content: sorted,
    });
  }

  render() {
    let row = 0;
    return this.state.content !== null && this.state.content !== undefined ? (
      <div className={'stats'}>
        <h1>Stats </h1>
        <ButtonSecondary onClick={() => this.loadStats(8)}>Last 8 weeks</ButtonSecondary>
        <ButtonSecondary onClick={() => this.loadStats(4)}>Last 4 weeks</ButtonSecondary>
        <ButtonSecondary onClick={() => this.loadStats(1)}>Last 7 days</ButtonSecondary>
        <br />
        <div className="certReport sortTable">
          <Table>
            <thead>
              <tr>
                {
                  [{ name: 'testName', displayName: 'Test', type: 'string'},
                    { name: 'testId', displayName: 'Group', type: 'string'},
                    { name: 'total', displayName: 'Total', type: 'integer'},
                    { name: 'passPercentage', displayName: 'Passed %', type: 'integer'},
                    { name: 'pass', displayName: 'Passed', type: 'integer'},
                    { name: 'fail', displayName: 'Fail', type: 'integer'},
                    { name: 'error', displayName: 'Error', type: 'integer'},
                    { name: 'flaky', displayName: 'Flaky', type: 'integer'},
                    { name: 'skip', displayName: 'Skip', type: 'integer'}].map((field) => {
                    return (
                      <TableHeaderCell
                        key={field.name}
                        className={(this.lastSortField === field.name ? 'sorting' : '') + (this.nextSortOrder === 'asc' ? ' desc' : ' asc') + (field.name !== 'testName' ? ' right' : '')}
                        onClick={() => this.sort(field.name, field.type)}
                      >
                        {field.displayName} <IconArrowDown className={'sortingIconAsc'}/><IconArrowUp className={'sortingIconDesc'}/>
                      </TableHeaderCell>);
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                this.state.content.map(stats => {
                  row++;
                  let testGroupName = stats.testId.split('_')[0];
                  // iOS special case for formatting
                  if (testGroupName === 'ios') {
                    testGroupName = 'iOS';
                  } else { // otherwise, capitalize word
                    testGroupName = `${testGroupName.charAt(0).toUpperCase()}${testGroupName.slice(1)}`;
                  }
                  return (
                    <TableRow key={stats.testId + row}>
                      <TableCell>
                        <NavLink to={`/teststats/?id=${stats.testId}&name=${stats.testName}&interval=${this.state.interval}`}>{stats.testName}</NavLink>
                      </TableCell>
                      <TableCell className={'right'}>{testGroupName}</TableCell>
                      <TableCell className={'right'}>{stats.total}</TableCell>
                      <TableCell className={'right'}>{stats.passPercentage ? stats.passPercentage : 0}%</TableCell>
                      <TableCell className={'right'}>{stats.pass}</TableCell>
                      <TableCell className={'right'}>{stats.fail}</TableCell>
                      <TableCell className={'right'}>{stats.error}</TableCell>
                      <TableCell className={'right'}>{stats.flaky}</TableCell>
                      <TableCell className={'right'}>{stats.skip}</TableCell>
                    </TableRow>);
                })}
            </tbody>
          </Table>
        </div>
        <br />
        <br />
      </div>
    ) : <Spinner />;
  }
}

export default Stats;
