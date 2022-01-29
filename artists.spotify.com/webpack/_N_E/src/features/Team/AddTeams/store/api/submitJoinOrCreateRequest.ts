import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { webgateFetch } from '@mrkt/features/webgate-fetch';
export var submitJoinOrCreateRequest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(details, currentUserDetails, teamType) {
    var selectedTeam, newLabelTeamName, role, company, websiteLink, socialLink, selectedMedia1, selectedMedia2, selectedMedia3, firstName, lastName, businessEmail, requestInfo;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            selectedTeam = details.selectedTeam, newLabelTeamName = details.newLabelTeamName, role = details.role, company = details.company, websiteLink = details.websiteLink, socialLink = details.socialLink, selectedMedia1 = details.selectedMedia1, selectedMedia2 = details.selectedMedia2, selectedMedia3 = details.selectedMedia3;
            firstName = currentUserDetails.firstName, lastName = currentUserDetails.lastName, businessEmail = currentUserDetails.businessEmail;
            requestInfo = newLabelTeamName ? {
              url: "https://generic.wg.spotify.com/s4a-onboarding/v0/access/team/preverified",
              type: 'POST',
              body: {
                businessEmail: businessEmail,
                teamName: newLabelTeamName,
                teamType: teamType,
                firstName: firstName,
                lastName: lastName,
                role: role,
                company: company,
                additionalLinks: [websiteLink, socialLink],
                mediaUris: [selectedMedia1 === null || selectedMedia1 === void 0 ? void 0 : selectedMedia1.uri, selectedMedia2 === null || selectedMedia2 === void 0 ? void 0 : selectedMedia2.uri, selectedMedia3 === null || selectedMedia3 === void 0 ? void 0 : selectedMedia3.uri]
              }
            } : {
              url: "https://generic.wg.spotify.com/s4a-onboarding/v0/access/team/preverified",
              type: 'PUT',
              body: {
                businessEmail: businessEmail,
                team: selectedTeam,
                teamType: teamType,
                firstName: firstName,
                lastName: lastName,
                role: role,
                company: company,
                additionalLinks: [websiteLink]
              }
            };
            _context.next = 5;
            return webgateFetch(requestInfo.url, {
              method: requestInfo.type,
              body: JSON.stringify(requestInfo.body),
              headers: {
                'content-type': 'application/json'
              }
            });

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function submitJoinOrCreateRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();