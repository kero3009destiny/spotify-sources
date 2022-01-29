import { useLocation } from 'react-router';
import { useEffect } from 'react';
export var useSetPrepopulatedInviteDetailsBackgroundTask = function useSetPrepopulatedInviteDetailsBackgroundTask(_ref) {
  var setPrepopulatedInviteDetails = _ref.setPrepopulatedInviteDetails;

  var _ref2 = useLocation().state || {},
      fullName = _ref2.fullName,
      businessEmail = _ref2.businessEmail,
      role = _ref2.role,
      company = _ref2.company,
      accessLevel = _ref2.accessLevel;

  useEffect(function () {
    setPrepopulatedInviteDetails({
      fullName: fullName,
      businessEmail: businessEmail,
      role: role,
      company: company,
      accessLevel: accessLevel
    });
  }, [fullName, businessEmail, role, company, accessLevel, setPrepopulatedInviteDetails]);
};