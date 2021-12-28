import PropTypes from 'prop-types';

export const Image = PropTypes.shape({
  url: PropTypes.string,
  webpUrl: PropTypes.string,
  optimizedUrl: PropTypes.string,
  description: PropTypes.string,
});

export const Cta = PropTypes.shape({
  url: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  overrideFunctionality: PropTypes.string,
});
