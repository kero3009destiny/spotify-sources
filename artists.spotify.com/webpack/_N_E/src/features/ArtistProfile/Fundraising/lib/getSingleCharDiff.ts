export function getSingleCharDiff(a, b) {
  if (a === b) return null;
  var diff = [];
  var i;
  var j;

  for (i = 0, j = 0; i <= a.length && j <= b.length;) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else if (i - j < 2) {
      diff.push(b[j]);
      j++;
    }
  }

  return diff.length === 1 && diff[0] || null;
}