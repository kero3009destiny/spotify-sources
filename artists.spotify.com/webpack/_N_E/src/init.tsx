// ignore-string-externalization
import '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { nanoid } from 'nanoid';
import { Logger } from '@mrkt/features/Platform';
import { currentUserLoader } from './features/currentUser';
import { initializeTracing } from './features/tracing'; // generate unique identifier to be used in logs

var sessionId = nanoid(); // Expose session id globally to allow for logging from puppeteer / automated
// monitoring.

window._SESSION_ID_ = sessionId;
Logger.init();
initializeTracing({
  sessionId: sessionId
});
currentUserLoader.load(0); // preload user