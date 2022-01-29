// ignore-string-externalization
// What we use within the app
// What we expect the API to return
var isApiItem = function isApiItem(candidate) {
  var stringKeys = ['target', 'actor_name', 'feature', 'context', 'uuid', 'verb_feature', 'occurred_at_epoch'];
  return typeof candidate === 'object' && // can't find a stringKey that doesn't have a string value (note the double-negative)
  !stringKeys.find(function (k) {
    return typeof candidate[k] !== 'string';
  });
}; // Adapter from what's provided by the API to an ActivityFeedItem


export var apiItemToActivityFeedItem = function apiItemToActivityFeedItem(item) {
  if (!isApiItem(item)) {
    throw new Error("Unexpected activity feed item returned by API: ".concat(JSON.stringify(item)));
  }

  return {
    id: item.uuid,
    timestamp: new Date(parseInt(item.occurred_at_epoch, 10) * 1000),
    feature: item.feature,
    action: item.verb_feature,
    actor: {
      name: item.actor_name,
      username: item.actor_username
    },
    target: {
      child: {
        name: item.target
      },
      parent: {
        name: item.context
      },
      image: item.target_image_url ? {
        url: item.target_image_url
      } : null
    }
  };
};