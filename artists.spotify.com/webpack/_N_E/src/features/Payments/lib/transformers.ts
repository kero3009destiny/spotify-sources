export var toBillingInformationAPI = function toBillingInformationAPI(_ref) {
  var country = _ref.country,
      email = _ref.email,
      billingContactId = _ref.billingContactId;
  return {
    billingCountry: country,
    billingContactEmailAddress: email,
    billingContactUsername: billingContactId
  };
};
export var toPaymentTransaction = function toPaymentTransaction(_ref2) {
  var idempotencyKey = _ref2.idempotencyKey,
      amount = _ref2.amount,
      currency = _ref2.currency,
      updatedAt = _ref2.updatedAt,
      status = _ref2.status,
      card = _ref2.card;
  return {
    paymentId: idempotencyKey,
    amount: amount,
    currency: currency,
    updatedAt: updatedAt,
    status: status,
    card: card
  };
};
export var transformFetchedBillingSettingsAPI = function transformFetchedBillingSettingsAPI(_ref3) {
  var billingCountry = _ref3.billingCountry,
      billingContactEmailAddress = _ref3.billingContactEmailAddress,
      billingContactUsername = _ref3.billingContactUsername,
      isInvoiced = _ref3.isInvoiced;
  return {
    country: billingCountry,
    email: billingContactEmailAddress,
    billingContactId: billingContactUsername,
    isInvoiced: isInvoiced
  };
};