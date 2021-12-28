import axios from 'axios';
import Auth from '../utils/Auth';
import { CERTIFICATION_FILTERS } from '../utils/Constants';

let certomationUrl = 'https://api-partner.spotify.com/certomation/v1';
const tokenExchangeUrl = 'https://api-partner.spotify.com/v1/token';
const certomatoClientId = 'e7c00caeb2a545189c5084551626e64a';
let credentials = {};

if (process.env.NODE_ENV !== 'production') {
  try {
    credentials = require('./credentials.json');
    certomationUrl = 'http://localhost:8080/v1';
  } catch (e) {
    // Using production backend
  }
}

export function apiHeaders() {
  return Auth.fetchAccessToken()
    .then(token => {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    });
}

function tokenExchangeHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

function makeCertomatoRequest(url) {
  return certomationHeaders()
    .then(headers => {
      return axios
        .get(`${url}`, {
          headers: headers,
        });
    });
}

function certomationHeaders() {
  return apiHeaders()
    .then(headers => {
      return Object.assign(headers, credentials);
    });
}

export function getConnectDevices() {
  return makeCertomatoRequest(`${certomationUrl}/devices`);
}

/**
 * Loads metrics to populate dashboard.
 * Metrics are only available for employees.
 */
export function getMetrics() {
  return makeCertomatoRequest(`${certomationUrl}/queryMetrics`);
}

/**
 * Loads stats for top failed tests etc.
 * For employees, it loads all stats.
 * For other users, loads stats for the certifications created by the user.
 */
export function getStats(weekInterval) {
  return makeCertomatoRequest(`${certomationUrl}/queryOverallStats/${weekInterval}`);
}

/**
 * Loads test stats trend.
 * For employees, it loads all stats.
 * For other users, loads stats for the certifications created by the user.
 */
export function getTestStats(testId, weekInterval) {
  return makeCertomatoRequest(`${certomationUrl}/queryTestStats/${testId}/${weekInterval}`);
}

/**
 * Loads test errors.
 * For employees, it loads all stats.
 * For other users, loads stats for the certifications created by the user.
 */
export function getTestErrors(testId, weekInterval) {
  return makeCertomatoRequest(`${certomationUrl}/queryTestErrors/${testId}/${weekInterval}`);
}

/**
 * Loads all tests in "groups" where each group contain a list of tests.
 */
export function getTests(certificationId) {
  return makeCertomatoRequest(`${certomationUrl}/certifications/${certificationId}/tests`);
}

/**
 * Loads all questions for Certification creation
 */
export function getQuestions() {
  return makeCertomatoRequest(`${certomationUrl}/certifications/questions`);
}

/**
 * Gets the full report for a single certification.
 *
 * @param {certificationId} The ID of the certification to load the full report for.
 */
export function getCertificationReport(certificationId) {
  return makeCertomatoRequest(`${certomationUrl}/certifications/${certificationId}`);
}

/**
 * Gets a list of all certifications for the current user.
 *
 */
export function getCertifications(search, status, onlyCurrentUser = false) {
  const urlParams = new URLSearchParams();
  if (search) urlParams.set('search', search);
  if (status && status !== CERTIFICATION_FILTERS.ALL) urlParams.set('status', status);
  if (onlyCurrentUser) urlParams.set('onlyCurrentUser', onlyCurrentUser);
  const url = `${certomationUrl}/certifications?${urlParams.toString()}`;
  return makeCertomatoRequest(url);
}

/**
 * Create new certification
 *
 * @param {string} brand The device brand.
 * @param {string} model The device model.
 */
export function createCertification(brand, model, productId, clientId, deviceId, deviceType, esdkVersion, propertyIds) {
  return certomationHeaders()
    .then(headers => {
      return axios.request({
        method: 'POST',
        url: `${certomationUrl}/certifications`,
        data: {
          brand,
          model,
          productId,
          clientId,
          deviceId,
          deviceType,
          esdkVersion,
          propertyIds,
        },
        headers,
      });
    });
}

/**
 * Change a certification status
 *
 * @param {string} certificationId The uuid of the current certification session.
 */
export function changeCertificationStatus(certificationId, status) {
  return certomationHeaders()
    .then(headers => {
      return axios.request({
        method: 'PATCH',
        url: `${certomationUrl}/certifications/${certificationId}`,
        data: {
          status: status,
        },
        headers: headers,
      });
    });
}

/**
 * Delete a certification
 *
 * @param {string} certificationId The uuid of the current certification session.
 */
export function deleteCertification(certificationId) {
  return certomationHeaders()
    .then(headers => {
      return axios.request({
        method: 'DELETE',
        url: `${certomationUrl}/certifications/${certificationId}`,
        headers: headers,
      });
    });
}

/**
 * Gets an upload URI for a given test, requiring 'uploadFile'.
 * @param {string} testId String representing the test to get an upload URI for.
 * @param {string} type The file contentType
*/
export function getUploadUri(testId, type) {
  return makeCertomatoRequest(`${certomationUrl}/uploadUri/${testId}?contentType=${type}`);
}

/**
 * Upload images
 * @param {file} file File object
 * @param {string} uploadUri Uri for upload
*/
export function uploadImage(file, uploadUri, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `${uploadUri}`, true);
  xhr.addEventListener('load', () => {
    callback(xhr.status);
  });
  xhr.addEventListener('error', () => {
    callback(500);
  });
  xhr.setRequestHeader('Content-Type', file.type);
  xhr.send(file);
}

/**
 * Gets test results used to restore a certificationSession
 * @param {string} certificationSession String representing the session to restore
*/
export function getTestResults(certificationSession) {
  return makeCertomatoRequest(`${certomationUrl}/results/${certificationSession}`);
}

/**
 * Starts one or more tests
 *
 * @param {string} testId Comma separated id's for the tests to run, eg dut_play,dut_pause,dut_stop
 * @param {string} alternative The user prompted alternative, for example when a user selects
 * "yes" in an interactive test.
 * @param {string} dut1 The id of the device under test. This is the device that gets certified.
 * @param {string} dut2 The id of device 2, mostly used to run tests that requires multiple devices.
 * @param {string} connectionId The socket connection ID to dealer.
 * @param {string} input User required input for tests, eg a JSON blob to post for Zeroconf tests.
 * @param {string} certificationId The uuid of the current certification session.
 */
export function startTest(testId, alternative, dut1, dut2, connectionId, input, certificationId) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/runTestsAsync`, {
        method: 'POST',
        body: JSON.stringify({
          id: testId,
          dut1: dut1,
          dut2: dut2,
          connectionId: connectionId,
          selectedAlternative: alternative,
          input: input,
          certificationId: certificationId,
        }),
        headers: headers,
      });
    });
}

/**
 * Sets a whole section to Not Applicable
 *
 * @param {string} testId Comma separated id's for the tests to run, eg dut_play,dut_pause,dut_stop
 * @param {string} alternative The user prompted alternative, for example when a user selects
 * "yes" in an interactive test.
 * @param {string} dut1 The id of the device under test. This is the device that gets certified.
 * @param {string} dut2 The id of device 2, mostly used to run tests that requires multiple devices.
 * @param {string} connectionId The socket connection ID to dealer.
 * @param {string} input User required input for tests, eg a JSON blob to post for Zeroconf tests.
 * @param {string} certificationId The uuid of the current certification session.
 */
export function startNotApplicable(testId, alternative, dut1, dut2, connectionId, input, certificationId) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/skipTestsAsync`, {
        method: 'POST',
        body: JSON.stringify({
          id: testId,
          dut1: dut1,
          dut2: dut2,
          connectionId: connectionId,
          selectedAlternative: alternative,
          input: input,
          certificationId: certificationId,
        }),
        headers: headers,
      });
    });
}

/**
 * Clear the test results for a whole section
 *
 * @param {string} testId Comma separated id's for the tests to run, eg dut_play,dut_pause,dut_stop
 * @param {string} alternative The user prompted alternative, for example when a user selects
 * "yes" in an interactive test.
 * @param {string} dut1 The id of the device under test. This is the device that gets certified.
 * @param {string} dut2 The id of device 2, mostly used to run tests that requires multiple devices.
 * @param {string} connectionId The socket connection ID to dealer.
 * @param {string} input User required input for tests, eg a JSON blob to post for Zeroconf tests.
 * @param {string} certificationId The uuid of the current certification session.
 */
export function startClearSection(testId, alternative, dut1, dut2, connectionId, input, certificationId) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/clearTestsAsync`, {
        method: 'POST',
        body: JSON.stringify({
          id: testId,
          dut1: dut1,
          dut2: dut2,
          connectionId: connectionId,
          selectedAlternative: alternative,
          input: input,
          certificationId: certificationId,
        }),
        headers: headers,
      });
    });
}

export function getProfile() {
  return apiHeaders()
    .then(headers => {
      return axios
        .get('https://api.spotify.com/v1/me', {
          headers: headers,
        });
    });
}

export function logg(info) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/logg`, {
        method: 'POST',
        body: JSON.stringify({
          info: info,
        }),
        headers: headers,
      });
    });
}

export function verifyAccess() {
  return makeCertomatoRequest(`${certomationUrl}/verifyAccess`);
}

export function exchangeCodeForToken(code, redirectUri) {
  const options = {
    method: 'POST',
    headers: tokenExchangeHeaders(),
    url: `${tokenExchangeUrl}/refresh?client_id=${certomatoClientId}&code=${code}&redirect_uri=${redirectUri}`,
  };
  return axios(options);
}

export function exchangeRefreshTokenForToken(refreshToken) {
  const options = {
    method: 'POST',
    headers: tokenExchangeHeaders(),
    url: `${tokenExchangeUrl}/access?client_id=${certomatoClientId}&refresh_token=${refreshToken}`,
  };
  return axios(options);
}

export function getUserInfo() {
  return makeCertomatoRequest(`${certomationUrl}/getUserInfo`);
}

/**
 * Request all builds
 */
export function getBuilds() {
  return makeCertomatoRequest(`${certomationUrl}/builds`);
}

/**
 * Get artifact url
 */
export function downloadArtifact(name) {
  return makeCertomatoRequest(`${certomationUrl}/artifact/${name}`);
}

/**
 * Add comment
 */
export function addComment(certificationId, comment) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/certifications/${certificationId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          comment: comment,
        }),
        headers: headers,
      });
    });
}

/**
 * Get organizations
 */
export function getOrgs() {
  return makeCertomatoRequest(`${certomationUrl}/organizations`);
}

/**
 * Get users for the organization with matching orgId
 */
export function getOrgUsers(orgUri) {
  return makeCertomatoRequest(`${certomationUrl}/user/${orgUri}`);
}

/**
 * Create new organization
 */
export function addOrg(jiraOrgId, name) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/organizations`, {
        method: 'POST',
        body: JSON.stringify({
          jiraOrgId: jiraOrgId,
          name: name,
        }),
        headers: headers,
      });
    });
}

/**
 * Edit organization
 */
export function editOrganization(uri, name, jiraOrgId, isAutoApproved, hasOldRequirements) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/organizations/${uri}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: name,
          jiraOrgId: jiraOrgId,
          isAutoApproved: isAutoApproved,
          hasOldRequirements: hasOldRequirements,
        }),
        headers: headers,
      });
    });
}

/**
 * Add user to organization
 */
export function addUser(orgUri, userName, adminUser) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/user`, {
        method: 'POST',
        body: JSON.stringify({
          org_uri: orgUri,
          user_name: userName,
          admin_user: adminUser,
        }),
        headers: headers,
      });
    });
}

/**
 * Add brand to organization
 */
export function addBrand(organizationUri, name, clientId) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/organizations/${organizationUri}/brands`, {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          clientId: clientId,
        }),
        headers: headers,
      });
    });
}

/**
 * Delete brand from organization
 */
export function deleteBrand(organizationUri, id) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/organizations/${organizationUri}/brands/${id}`, {
        method: 'DELETE',
        headers: headers,
      });
    });
}

/**
 * Get org attributes
 */
export function getOrganization(orgUri) {
  return makeCertomatoRequest(`${certomationUrl}/organizations/${orgUri}`);
}

/**
 * Move user to another group
 */
export function moveUser(userName, oldGroupName, newGroupName) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/user/${userName}/move`, {
        method: 'PUT',
        body: JSON.stringify({
          old_group: oldGroupName,
          new_group: newGroupName,
        }),
        headers: headers,
      });
    });
}

/**
 * Delete user
 */
export function deleteUser(userName) {
  return certomationHeaders()
    .then(headers => {
      return fetch(`${certomationUrl}/user/${userName}`, {
        method: 'DELETE',
        body: JSON.stringify({
        }),
        headers: headers,
      });
    });
}
