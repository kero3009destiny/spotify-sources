import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { isLabelAccessFlowDetails } from '../models';
export var submitRequest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(details, isCreatingNewTeam) {
    var _selectedArtist, _selectedArtist2;

    var firstName, lastName, businessEmail, token, teamType, role, company, companyWebsiteUrl, isLabel, teamName, selectedMedia1, selectedMedia2, selectedMedia3, selectedTeam, joinTeamName, requestInfo;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            firstName = details.firstName, lastName = details.lastName, businessEmail = details.businessEmail, token = details.token, teamType = details.teamType, role = details.role, company = details.company, companyWebsiteUrl = details.companyWebsiteUrl;
            isLabel = isLabelAccessFlowDetails(details);
            teamName = details.teamName;
            selectedMedia1 = details.selectedMedia1;
            selectedMedia2 = details.selectedMedia2;
            selectedMedia3 = details.selectedMedia3;
            selectedTeam = isLabel ? details.selectedLabel : {
              name: (_selectedArtist = details.selectedArtist) === null || _selectedArtist === void 0 ? void 0 : _selectedArtist.name,
              uri: (_selectedArtist2 = details.selectedArtist) === null || _selectedArtist2 === void 0 ? void 0 : _selectedArtist2.uri
            };
            joinTeamName = selectedTeam && selectedTeam.name || '';
            requestInfo = isCreatingNewTeam && isLabelAccessFlowDetails(details) ? {
              url: "https://generic.wg.spotify.com/s4a-onboarding/v0/access/team?emailVerificationCode=".concat(token, "&businessEmail=").concat(encodeURIComponent(businessEmail)),
              type: 'POST',
              body: {
                businessEmail: businessEmail,
                teamName: teamName,
                teamType: teamType,
                firstName: firstName,
                lastName: lastName,
                role: role,
                company: company,
                additionalLinks: [companyWebsiteUrl, details.socialUrl],
                mediaUris: [selectedMedia1 === null || selectedMedia1 === void 0 ? void 0 : selectedMedia1.uri, selectedMedia2 === null || selectedMedia2 === void 0 ? void 0 : selectedMedia2.uri, selectedMedia3 === null || selectedMedia3 === void 0 ? void 0 : selectedMedia3.uri],
                token: token
              }
            } : {
              url: "https://generic.wg.spotify.com/s4a-onboarding/v0/access/team/".concat(encodeURIComponent(joinTeamName), "?emailVerificationCode=").concat(token, "&businessEmail=").concat(encodeURIComponent(businessEmail)),
              type: 'PUT',
              body: {
                businessEmail: businessEmail,
                team: selectedTeam,
                teamType: teamType,
                firstName: firstName,
                lastName: lastName,
                role: role,
                company: company,
                additionalLinks: [companyWebsiteUrl, isLabelAccessFlowDetails(details) ? details.socialUrl : ''],
                token: token
              }
            };
            _context.next = 11;
            return webgateFetch(requestInfo.url, {
              method: requestInfo.type,
              body: JSON.stringify(requestInfo.body),
              headers: {
                'content-type': 'application/json'
              }
            });

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function submitRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();