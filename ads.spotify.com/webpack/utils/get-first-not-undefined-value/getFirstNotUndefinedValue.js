/**
 * getFirstNotUndefinedValue - Gets the first defined value match
 * @param {Array} values - An array of values
 * @returns {*} first not undefined match, otherwise undefined
 */
const getFirstNotUndefinedValue = (...values) =>
  values.find(value => value !== undefined);

export default getFirstNotUndefinedValue;
