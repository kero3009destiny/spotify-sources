// ignore-string-externalization
export var BillingContactActionType;

(function (BillingContactActionType) {
  BillingContactActionType["SHOW_BILLING_CONTACT_SPEEDBUMP"] = "SHOW_BILLING_CONTACT_SPEEDBUMP";
  BillingContactActionType["HIDE_BILLING_CONTACT_SPEEDBUMP"] = "HIDE_BILLING_CONTACT_SPEEDBUMP";
  BillingContactActionType["OPTIMISTICALLY_UPDATE_BILLING_CONTACT_ID"] = "OPTIMISTICALLY_UPDATE_BILLING_CONTACT_ID";
  BillingContactActionType["SET_BILLING_INFORMATION"] = "SET_BILLING_INFORMATION";
})(BillingContactActionType || (BillingContactActionType = {}));

export var createBillingContactActionDispatchers = function createBillingContactActionDispatchers(dispatch) {
  return {
    showBillingContactSpeedbump: function showBillingContactSpeedbump(confirmBillingContactChange, removeSelectedTeamMember) {
      return dispatch({
        confirmBillingContactChange: confirmBillingContactChange,
        removeSelectedTeamMember: removeSelectedTeamMember,
        type: BillingContactActionType.SHOW_BILLING_CONTACT_SPEEDBUMP
      });
    },
    hideBillingContactSpeedbump: function hideBillingContactSpeedbump() {
      return dispatch({
        type: BillingContactActionType.HIDE_BILLING_CONTACT_SPEEDBUMP
      });
    },
    optimisticallyUpdateBillingContactId: function optimisticallyUpdateBillingContactId(billingContactId) {
      return dispatch({
        type: BillingContactActionType.OPTIMISTICALLY_UPDATE_BILLING_CONTACT_ID,
        billingContactId: billingContactId
      });
    },
    setBillingInformation: function setBillingInformation(billingContactId, billingCountry) {
      return dispatch({
        type: BillingContactActionType.SET_BILLING_INFORMATION,
        billingContactId: billingContactId,
        billingCountry: billingCountry
      });
    }
  };
};
export var isBillingContactActionType = function isBillingContactActionType(action) {
  return action.type && action.type in BillingContactActionType;
};