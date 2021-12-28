import React, { Component } from 'react';
import * as api from '../api/api';
import Utils from '../utils/Utils';
import Spinner from '../components/Spinner';
import {Table, TableCell, TableHeaderCell, TableRow} from '@spotify-internal/creator-tape';
const refreshRate = 10 * 60 * 1000; // 10 minutes

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      unauth: false,
    };
    this.timer = null;
  }

  componentWillMount() {
    this.loadMetrics();
    this.timer = setInterval(() => this.loadMetrics(), refreshRate);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  loadMetrics() {
    api.getMetrics().then((payload) => {
      if (payload !== undefined) {
        this.setState({
          content: payload.data,
        });
      }
    })
      .catch(() => {
        // handle unauthorized
        this.setState({
          unauth: true,
        });
      });
  }

  render() {
    const condition = this.state.unauth ? <h2> You do not have permission to view this content </h2> : <Spinner/>;
    return Utils.exists(this.state.content) && this.state.content ? (
      <div style={{overflow: 'visible', height: 'inherit'}}>
        <h2>Certomato Dashboard (Employee only) </h2>
        <div className="certReport">
          <Table>
            <thead>
              <tr>
                <TableHeaderCell style={{color: '#000', fontWeight: 'bold'}}>Metric</TableHeaderCell>
                <TableHeaderCell style={{color: '#000', fontWeight: 'bold'}}>Value</TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {
                this.state.content.metrics.map(metric => {
                  return (
                    <TableRow key={metric.name}>
                      <TableCell>{metric.name}</TableCell>
                      <TableCell>{metric.value}</TableCell>
                    </TableRow>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    ) : condition;
  }
}

export default Dashboard;
