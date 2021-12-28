import {CLEAR_CERT_SESSION, RESUME_CERT_SESSION, START_CERT_SESSION, SET_NO_DEVICE} from './types';

const ACTIVE_CERT_SESSION = 'ACTIVE_CERT_SESSION';

/**
 Starts a certification session,
 generating an uuid and associating a dut with the session.
 Session format:
 {
 sessionId: shortId,
 genDate: <date.now()>,
 dut1: {id: <id>, name: <name>},
 }
 */
export const startCertSession = (sessionId, dut) => dispatch => {
  const certSessionObject = {
    sessionId: sessionId,
    genDate: Date.now(),
    dut1: dut,
  };
  localStorage.setItem(ACTIVE_CERT_SESSION, JSON.stringify(certSessionObject));

  dispatch({
    type: START_CERT_SESSION,
    payload: certSessionObject,
  });
};

/**
 Returns an active certification session
 Only one session can be stored as "active" in sessionstorage.
 Used to restore the browser state after a reload / restart.
 */
export const resumeCertSession = () => dispatch => {
  let certSessionObject = JSON.parse(localStorage.getItem(ACTIVE_CERT_SESSION));
  if (certSessionObject === null) {
    certSessionObject = {};
  }

  dispatch({
    type: RESUME_CERT_SESSION,
    payload: certSessionObject,
  });
};

export const clearCertSession = () => dispatch => {
  localStorage.removeItem(ACTIVE_CERT_SESSION);
  dispatch({
    type: CLEAR_CERT_SESSION,
  });
};

export const setNoDevice = () => dispatch => {
  const certSessionObject = {
    noDeviceSelected: true,
  };
  localStorage.setItem(ACTIVE_CERT_SESSION, JSON.stringify(certSessionObject));

  dispatch({
    type: SET_NO_DEVICE,
    payload: certSessionObject,
  });
};
