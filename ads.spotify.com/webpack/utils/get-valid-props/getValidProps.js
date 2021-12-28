import kebabCase from 'lodash/kebabCase';

/**
 * ARIA attr prefix constant
 */
const ARIA = 'aria';

/**
 * Returns an object with the props that have a valid value only.
 * @param {Object} props initial props object
 * @return {Object} valid props only
 */
const getValidProps = props => {
  return Object.keys(props).reduce((acc, propKey) => {
    const propValue = props[propKey];
    const isValueValid = !!propValue;
    const isAriaProp = propKey.indexOf(ARIA) !== -1;
    const fixedPropKey = isAriaProp ? kebabCase(propKey) : propKey;
    return {
      ...acc,
      ...(isValueValid ? { [fixedPropKey]: propValue } : {}),
    };
  }, {});
};

export default getValidProps;
