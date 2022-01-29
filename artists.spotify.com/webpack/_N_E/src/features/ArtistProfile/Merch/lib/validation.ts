// ignore-string-externalization
// Valid shop name regex adapted from Shopify-suggested pattern (link below)
// https://shopify.dev/tutorials/authenticate-with-oauth#step-3-confirm-installation
var shopNamePattern = /^(https?:\/\/)?([a-zA-Z0-9][a-zA-Z0-9-]*)(\.myshopify\.com\/?)?$/;
export function isValidShopName(shopName) {
  if (shopName == null) return false;
  return shopNamePattern.test(shopName);
} // Extracts just the shop subdomain from valid input formats, e.g.
// shop-name.myshopify.com, shop-name, https://shop-name.myshopify.com

export function getShopSubdomain(shopName) {
  var _matches$;

  if (shopName == null) return '';
  var matches = shopName.match(shopNamePattern);
  return (_matches$ = matches === null || matches === void 0 ? void 0 : matches[2]) !== null && _matches$ !== void 0 ? _matches$ : '';
}