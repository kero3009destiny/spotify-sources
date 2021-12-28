import delay from 'lodash/delay';
import now from 'lodash/now';

const DELAY = 25;
const MAXIMUM_TIME = 5000;

/**
 * Gets the dataLayer array and the GTM clientId when ready
 * @returns {Promise}
 */
export const getDataLayer = () => {
  const start = now();

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    function checkDataLayer() {
      const time = now() - start;
      if (time >= MAXIMUM_TIME) {
        return reject(
          new Error('The maximum time for getting dataLayer has been exceeded'),
        );
      }

      if (!Array.isArray(window.dataLayer)) {
        delay(checkDataLayer, DELAY);
      } else {
        resolve(window.dataLayer);
      }
    }
    checkDataLayer();
  });
};

export const getClientId = () => {
  const start = now();

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    function checkClientId() {
      const time = now() - start;
      if (time >= MAXIMUM_TIME) {
        return reject(
          new Error(
            'The maximum time for getting the clientId has been exceeded',
          ),
        );
      }

      if (!window.ga || typeof window.ga.getAll !== 'function') {
        delay(checkClientId, DELAY);
      } else {
        const [tracker] = window.ga.getAll();

        resolve(tracker.get('clientId'));
      }
    }
    checkClientId();
  });
};

export default getDataLayer;
