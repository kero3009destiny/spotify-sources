/**
 * Creates the payload needed for the endpoint using the form data
 * @param {Object} obj form data collected
 * @returns {string} String payload
 */
export const objectToFormData = obj => {
  const formParams = new URLSearchParams();

  // Data map to form params
  Object.entries(obj).forEach(([key, value]) => formParams.append(key, value));
  return formParams.toString();
};
