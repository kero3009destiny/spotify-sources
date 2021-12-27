// https://confluence.spotify.net/display/MIA/The+MIA+Conversion+Pixel

export enum ConversionEventType {
  PURCHASE = 'PURCHASE', // Tracks purchases.
  SAVE = 'SAVE', // Tracks "add to wishlist" events for specific items.
  START_CHECKOUT = 'START_CHECKOUT', // Tracks the start of checkout actions.
  ADD_CART = 'ADD_CART', // Tracks saving specific items to a shopping cart event.
  VIEW_CONTENT = 'VIEW_CONTENT', // Tracks content view events.
  ADD_BILLING = 'ADD_BILLING', // Tracks configuration status of payment information.
  SIGN_UP = 'SIGN_UP', // Tracks user registration methods.
  SEARCH = 'SEARCH', // Tracks search events.
  PAGE_VIEW = 'PAGE_VIEW',
}

export enum SemanticMetricType {
  CAMPAIGN_CREATED = 'CAMPAIGN_CREATED',
  FLIGHT_CREATED = 'FLIGHT_CREATED',
  AD_CREATED = 'AD_CREATED',
}
