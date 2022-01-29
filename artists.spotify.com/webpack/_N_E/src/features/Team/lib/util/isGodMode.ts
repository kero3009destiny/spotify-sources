// ignore-string-externalization
// Admin God Mode is artist:spotify:* as a uri within the manageteams response
export var isGodMode = function isGodMode(team) {
  return team.id === '*';
};