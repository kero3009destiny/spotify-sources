import _slicedToArray from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization

/* eslint-disable import/named, no-unused-vars */
// eslint doesn't know how to handle typescript type imports
import { format } from 'date-fns';
export var dateFormatter = function dateFormatter(fullMatch, args) {
  if (!args || args.length !== 2) return fullMatch;

  var _args = _slicedToArray(args, 2),
      dateFormat = _args[0],
      timestamp = _args[1];

  return format(new Date(Number(timestamp)), dateFormat);
};