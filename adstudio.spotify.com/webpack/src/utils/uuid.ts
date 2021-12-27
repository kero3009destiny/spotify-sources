const COMPACT_UUID_REGEX = /^[0-9a-f]{12}[0-5][0-9a-f]{3}[089ab][0-9a-f]{15}$/i;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Returns truth of whether a string is a 36-char v4 UUID
 * @param {string} input String to test.
 * @returns {boolean} Truth of test.
 */
export const isUuid = (input: string): boolean => {
  return !!input.match(UUID_REGEX);
};

/**
 * Formats a 32-char v4 UUID to a 36-char v4 UUID.
 * @param {string} input String to format.
 * @returns {string} Formatted string or original string if it does not appear to be a valid UUID.
 */
export const formatUuid = (input: string): string => {
  if (input.match(COMPACT_UUID_REGEX)) {
    return [
      input.slice(0, 8),
      input.slice(8, 12),
      input.slice(12, 16),
      input.slice(16, 20),
      input.slice(20),
    ].join('-');
  }
  return input;
};
