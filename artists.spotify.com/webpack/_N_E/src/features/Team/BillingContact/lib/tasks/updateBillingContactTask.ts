import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { saveBillingInformation } from '../../../../Payments/lib/api';
var BANNER_ID = 'update-billing-contact';
export var updateBillingContactTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(team, confirmTeamMemberRemoval, billingContactId, billingContactEmail, billingCountry, t, _ref, removeSelectedTeamMember) {
    var optimisticallyUpdateBillingContactId, hideBillingContactSpeedbump, showTeamMemberRemovalConfirmation, showErrorBanner, showSuccessBanner;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            optimisticallyUpdateBillingContactId = _ref.optimisticallyUpdateBillingContactId, hideBillingContactSpeedbump = _ref.hideBillingContactSpeedbump, showTeamMemberRemovalConfirmation = _ref.showTeamMemberRemovalConfirmation, showErrorBanner = _ref.showErrorBanner, showSuccessBanner = _ref.showSuccessBanner;
            _context.prev = 1;
            _context.next = 4;
            return saveBillingInformation(team.uri, {
              billingContactEmailAddress: billingContactEmail,
              billingCountry: billingCountry,
              billingContactUsername: billingContactId // the contact id is actually a username here

            });

          case 4:
            optimisticallyUpdateBillingContactId(billingContactId);
            hideBillingContactSpeedbump();

            if (removeSelectedTeamMember === true) {
              showTeamMemberRemovalConfirmation(confirmTeamMemberRemoval);
            } else {
              showSuccessBanner(t('BILLING_CONTACT_UPDATE_SUCCESS', 'Your billing contact has been updated.', 'You succeeded in updating your contact'), {
                id: BANNER_ID
              });
            }

            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            showErrorBanner(t('BILLING_CONTACT_UPDATE_BILLING_CONTACT_ERROR', 'Something went wrong', "Something went wrong updating your team's billing contact"), {
              id: BANNER_ID
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function updateBillingContactTask(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();