import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api/api';
import Utils from '../utils/Utils';
import {IconArrowDown, IconArrowUp, Table, TableCell, TableHeaderCell, TableRow} from '@spotify-internal/creator-tape';
import Spinner from '../components/Spinner';

class Builds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
    this.nextSortOrder = 'desc';
  }

  componentWillMount() {
    this.loadBuilds();
  }

  loadBuilds() {
    api.getBuilds().then((payload) => {
      if (payload !== undefined) {
        this.setState({
          content: payload.data.buildInfo,
        });
        this.sort('esdkVersion', 'version');
      }
    })
      .catch(() => {
        // handle unauthorized
      });
  }
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  sort(field, fieldType) {
    const sorted = this.state.content.sort((a, b) => {
      if (fieldType === 'string') {
        return a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1;
      } else if (fieldType === 'integer') {
        // Handle that some fields can be undefined
        return (parseInt(a[field], 10) || 0) < (parseInt(b[field], 10) || 0) ? -1 : 1;
      } else if (fieldType === 'version') {
        if (!a[field]) {
          return -1;
        } else if (!b[field]) {
          return 1;
        }
        const aFormatted = a[field].split('.').map(n => +n + 10000).join('.') || 0;
        const bFormatted = b[field].split('.').map(n => +n + 10000).join('.') || 0;
        return aFormatted < bFormatted ? -1 : 1;
      }
      return 0;
    });
    // Another column was clicked, reset to asc
    if (this.lastSortField && this.lastSortField !== field) {
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

  downloadArtifact(name) {
    api.downloadArtifact(name)
      .then((payload) => {
        if (payload !== undefined) {
          let downloadWindow;
          if (payload && payload.data) {
            downloadWindow = window.open(payload.data.url, '_blank');
          }
          downloadWindow.focus();
        }
      })
      .catch(() => {
        // handle error
      });
  }

  render() {
    return (
      <div>
        <h1>Builds</h1>
        <div className="alert-box">
          <p>
            - Starting from eSDK version 3.167 we will only give out the Media Delivery API and HTTPS builds.
            If you have an already certified product out on the market, you will need to update the eSDK to support
            Media Delivery API and HTTPS. Please check the <a className="alert-href" href="https://developer.spotify.com/private-documentation/https_and_media_delivery-050-faq">Media Delivery FAQ section</a>.
          </p>
          <p>
            - Spotify have found a potentially critical bug in eSDK version 3.129 to 3.144. This bug is very unlikely to
            be triggered by your integration but to remove the risk of it occurring we have deleted all builds on these eSDK versions.
          </p>
          <p>
            If you have any questions, please contact us <a className="alert-href" href="https://spotify.atlassian.net/servicedesk/customer/portal/3">here</a>.
          </p>
        </div>
        {
          !this.props.featureFlags.includes('builds') ? <h2>You do not have permission to view this content</h2> :
            <Table className={'buildsTable sortTable'}>
              <thead>
                <tr>
                  {
                    [
                      { name: 'esdkVersion', displayName: 'eSDK version', type: 'version'},
                      { name: 'name', displayName: 'Filename', type: 'string'},
                      { name: 'size', displayName: 'Size', type: 'integer'}].map((field) => {
                      return (
                        <TableHeaderCell
                          key={field.name}
                          className={(this.lastSortField === field.name ? 'sorting' : '') + (this.nextSortOrder === 'asc' ? ' desc' : ' asc')}
                          onClick={() => this.sort(field.name, field.type)}
                        >
                          {field.displayName} <IconArrowDown className={'sortingIconAsc'}/><IconArrowUp className={'sortingIconDesc'}/>
                        </TableHeaderCell>);
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {Utils.exists(this.state.content) ? (
                  this.state.content.map(build => {
                    return (
                      <TableRow key={build.name}>
                        <TableCell>
                          {build.esdkVersion}
                        </TableCell>
                        <TableCell
                          className={'artifactLink'}
                          onClick={() => this.downloadArtifact(build.name)}
                        >
                          {build.name}
                        </TableCell>
                        <TableCell>
                          {this.formatBytes(parseInt(build.size, 10), 2)}
                        </TableCell>
                      </TableRow>);
                  })) : null}
              </tbody>
            </Table>
        }
        {
          !this.state.content ? <Spinner /> : null
        }
      </div>
    );
  }
}

Builds.propTypes = {
  admin: PropTypes.bool,
  featureFlags: PropTypes.array,
};

export default Builds;
