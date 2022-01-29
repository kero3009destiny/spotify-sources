// ignore-string-externalization
// format numbers with groups, e.g.: 1918273 -> '1,918,273'
var _Intl$NumberFormat = new Intl.NumberFormat('en-US', {
  useGrouping: true
}),
    formatNumberGrouped = _Intl$NumberFormat.format;

export { formatNumberGrouped };