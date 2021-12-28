/**
 * Generates a random hash
 * @param {string} prefix A prefix name
 * @returns random hash
 */
const getRandomHash = prefix => {
  return `${prefix}${Math.random()
    .toString(36)
    .substring(2)}`;
};

export default getRandomHash;
