import createBrowserHistory from 'history/createBrowserHistory';

let history;

export default function createHistory() {
  if (!history) {
    history = createBrowserHistory();
  }
  return history;
}



// WEBPACK FOOTER //
// ./src/lib/createHistory.js