// ignore-string-externalization
export var getCountries50m = function getCountries50m() {
  return import(
  /* webpackChunkName: "countries-50m" */
  './countries-50m.topo.json').then(function (m) {
    return m.default;
  });
};