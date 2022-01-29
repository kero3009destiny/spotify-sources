import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
var USERNAME_REGEX = /^@?([a-zA-Z0-9._$*!]{1,30})$/i;
var REGEX = {
  instagram: {
    url: /^(https?:\/\/)?([a-z]{2,3}\.)?(instagram\.com|instagr\.am)\/(\S+)$/i,
    username: USERNAME_REGEX,
    domain: 'https://instagram.com'
  },
  facebook: {
    url: /^(https?:\/\/)?([a-z]{2,3}\.)?(facebook\.com)\/(\S+)$/i,
    username: USERNAME_REGEX,
    domain: 'https://facebook.com'
  },
  twitter: {
    url: /^(https?:\/\/)?([a-z]{2,3}\.)?(twitter\.com)\/(\S+)$/i,
    username: USERNAME_REGEX,
    domain: 'https://twitter.com'
  },
  wikipedia: {
    url: /^(https?:\/\/)?([a-z.]+\.)?wikipedia\.org\/wiki\/\S+$/i
  },
  soundbetter: {
    url: /^(https?:\/\/)soundbetter\.com\/profiles\/\S+$/i
  },
  custom: {
    url: /^(https?:\/\/)?([a-z]{2,3}\.)?(\w+)(\S+)$/i
  }
};
export var isValidLink = function isValidLink(type, link) {
  if (!type || !link) return null;
  var expression = REGEX[type];

  if (type === 'wikipedia' || type === 'soundbetter') {
    return link.match(expression.url) ? {
      username: link
    } : false;
  }

  var hasValidUrl = expression && link.match(expression.url);

  if (hasValidUrl) {
    var _link$match = link.match(expression.url),
        _link$match2 = _slicedToArray(_link$match, 5),
        input = _link$match2[0],
        protocol = _link$match2[1],
        subdomain = _link$match2[2],
        domain = _link$match2[3],
        username = _link$match2[4];

    return {
      input: input,
      protocol: protocol,
      subdomain: subdomain,
      domain: domain,
      username: username
    };
  }

  var hasValidUsername = expression && link.match(expression.username);

  if (hasValidUsername) {
    var _link$match3 = link.match(expression.username),
        _link$match4 = _slicedToArray(_link$match3, 2),
        _input = _link$match4[0],
        _username = _link$match4[1];

    return {
      input: _input,
      username: _username
    };
  }

  return false;
};
export var getUsernameOrLink = function getUsernameOrLink(type, value) {
  var attr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var hasValidLink = isValidLink(type, value);

  if (type === 'wikipedia' || type === 'soundbetter') {
    if (value) {
      return hasValidLink.username ? value : false;
    }

    return value;
  }

  if (['instagram', 'twitter', 'facebook'].includes(type)) {
    if (attr.username) {
      return hasValidLink ? hasValidLink.username : false;
    }

    if (attr.link && value !== '') {
      return "".concat(REGEX[type].domain, "/").concat(value);
    }
  }

  return value;
};