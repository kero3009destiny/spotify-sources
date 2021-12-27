import { isArray, isEmpty, isObject } from 'lodash';

/**
 * Sorts an array of objects by selected property.  Can optionally force a nominated property value
 * to be last.  String sorts are ALWAYS case insensitive.
 * @param {object[]} objectArray Array of objects to sort
 * @param {string} sortOnProp Name of property to sort on
 * @param {boolean} [reverse=false] Reverse natural sort order
 * @param {string} [goesLastValue=''] Value that should always sort last (even with reverse=true)
 * @param {string} [goesLastProp=sortOnProp] Property that goesLastValue belongs to if not
 * sortOnProp
 * @returns {object[]} Sorted object array
 */
export function sortObjectArray(
  objectArray,
  sortOnProp,
  reverse = false,
  goesLastValue = '',
  goesLastProp = sortOnProp,
) {
  objectArray.sort((a, b) => {
    const goesLast = goesLastValue.toLowerCase
      ? goesLastValue.toLowerCase()
      : goesLastValue;
    if (a[sortOnProp] && b[sortOnProp]) {
      let aComp = reverse ? b[sortOnProp] || '' : a[sortOnProp] || '';
      aComp = aComp.toLowerCase ? aComp.toLowerCase() : aComp;
      let bComp = reverse ? a[sortOnProp] || '' : b[sortOnProp] || '';
      bComp = bComp.toLowerCase ? bComp.toLowerCase() : bComp;
      let aLast = a[goesLastProp] || '';
      aLast = aLast.toLowerCase ? aLast.toLowerCase() : aLast;
      let bLast = b[goesLastProp] || '';
      bLast = bLast.toLowerCase ? bLast.toLowerCase() : bLast;

      // Standard JS array sort except that if we encounter our special "last" value, first two
      // tests will ensure it goes last.
      if (aLast === goesLast) {
        return 1;
      } else if (bLast === goesLast) {
        return -1;
      } else if (aComp > bComp) {
        return 1;
      } else if (aComp < bComp) {
        return -1;
      }
    }
    return 0;
  });
  return objectArray;
}

/**
 * Simple deep merge of objects that recurses for any nested object properties.  If any property
 * already exists in the target, then the additional object's value will be discarded.
 * @param {object} target The target object.
 * @param {object} additional The new object to merge in
 * @returns {object} The merged object.
 */
export const mergeObjects = (target = {}, additional = {}) => {
  const recursedTarget = {};
  Object.entries(target).forEach(([k, v]) => {
    if (isArray(v) && isArray(additional[k])) {
      recursedTarget[k] = v.concat(additional[k]);
    } else if (!isArray(v) && isObject(v) && !isEmpty(v)) {
      recursedTarget[k] = mergeObjects(v, additional[k]);
    } else if (v) {
      recursedTarget[k] = v;
    } else {
      recursedTarget[k] = additional[k];
    }
  });
  return {
    ...additional,
    ...recursedTarget,
  };
};
