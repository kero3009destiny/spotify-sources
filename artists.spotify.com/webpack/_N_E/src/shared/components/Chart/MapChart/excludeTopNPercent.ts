// ignore-string-externalization
import { descending } from 'd3-array';
import invariant from 'invariant';
export var excludeTopNPercent = function excludeTopNPercent(counts, percent) {
  invariant(percent < 1, 'The second argument must be a number less than 1');

  if (counts.length === 0) {
    return [1];
  }

  if (counts.length === 1) {
    return counts;
  }

  counts.sort(descending);

  if (counts[0] === 1) {
    return counts;
  }

  var percentage = Math.ceil(counts.length * percent);
  return counts.slice(percentage, counts.length);
};