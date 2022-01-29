import _toArray from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toArray";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import { dateFormatter } from './dateFormatter';
var FORMATTER_SYNTAX_REGEX = /{{(.*?)}}/g;
/**
 * The syntax for formatting is {{<format>|arg1|arg2|arg3|...|argN}}
 *
 * This formatter will look for the opening and closing double braces
 * and try to invoke any known formatter function that maps to <format>, returning
 * the original match if there is no known formatter function for that <format>.
 *
 * NOTE! There is no escaping! If you need to add a new formatter, consult your
 * use case with #creator-highlights first to see if special formatting is needed.
 */

export var KNOWN_FORMATTERS = {
  date: dateFormatter
};
export function formatString(rawInput) {
  var match = rawInput.match(FORMATTER_SYNTAX_REGEX);
  if (!match) return rawInput; // match is now an array of parsed groups

  var formattedMatches = match.map(function (m) {
    return [m, m.replace(/[{}]+/g, '')];
  });
  return formattedMatches.reduce(function (outString, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        fullSyntaxMatch = _ref2[0],
        innerSyntaxMatch = _ref2[1];

    var parts = innerSyntaxMatch.split('|');

    var _parts = _toArray(parts),
        formatterType = _parts[0],
        args = _parts.slice(1);

    var cleanedFormatterType = formatterType.trim();
    var formatter = KNOWN_FORMATTERS[cleanedFormatterType];
    if (!formatter) return outString;
    var cleanedArgs = args.map(function (a) {
      return a.trim();
    });
    var formatted = formatter(fullSyntaxMatch, cleanedArgs);
    return outString.replace(fullSyntaxMatch, formatted);
  }, rawInput);
}