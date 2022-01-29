import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { webgateFetch, webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { getTeams } from '@mrkt/features/teamswitcher/lib/useTeams';
import { SWITCHER_STATE } from '@mrkt/features/teamswitcher/lib/constants';
import { MARKETPLACE_MGMT_API, WEBGATE_DOMAIN } from '../../../../shared/lib/api';
import { verifyResponse } from '../../../../shared/lib/api/helpers';
import { MARQUEE_CAMPAIGN_ACTION } from '../../constant';
export var MARQUEE_ASSISTANT_API = "".concat(WEBGATE_DOMAIN, "/marquee-assistant");
export var BUYER_EXPERIENCE_API = "".concat(WEBGATE_DOMAIN, "/buyerxp-campaign-view");
export var BASE_CAMPAIGNS_URI = "".concat(BUYER_EXPERIENCE_API, "/v0/campaigns");
export var BASE_CAMPAIGN_URI = "".concat(BUYER_EXPERIENCE_API, "/v0/campaign");
export var BASE_CAMPAIGN_URI_V1 = "".concat(BUYER_EXPERIENCE_API, "/v1/campaign");
export var BASE_CAMPAIGN_URI_V2 = "".concat(BUYER_EXPERIENCE_API, "/v2/campaign");
export var BASE_ARTIST_URI = "".concat(BUYER_EXPERIENCE_API, "/v0/artist");
export var MRKT_MANAGEMENT_URI = "".concat(WEBGATE_DOMAIN, "/marketplace-mgmt");
export var getArtistTargeting = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(body) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetchJson("".concat(BUYER_EXPERIENCE_API, "/v0/forecast"), {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              }
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getArtistTargeting(_x) {
    return _ref.apply(this, arguments);
  };
}();
export var getArtistEligibility = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(artistId) {
    var response;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return webgateFetchJson("".concat(BASE_ARTIST_URI, "/").concat(artistId, "/eligibility"));

          case 2:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getArtistEligibility(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
export var getCampaigns = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(artistId) {
    var response, campaigns;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return webgateFetch("".concat(BASE_CAMPAIGNS_URI, "?artistId=").concat(artistId));

          case 2:
            response = _context3.sent;
            campaigns = [];
            _context3.t0 = response.status;
            _context3.next = _context3.t0 === 200 ? 7 : _context3.t0 === 401 ? 11 : _context3.t0 === 403 ? 11 : 12;
            break;

          case 7:
            _context3.next = 9;
            return response.json().then(function (r) {
              return r.campaigns;
            });

          case 9:
            campaigns = _context3.sent;
            return _context3.abrupt("break", 13);

          case 11:
            return _context3.abrupt("break", 13);

          case 12:
            throw new Error("".concat(response.status, " ").concat(response.url));

          case 13:
            return _context3.abrupt("return", {
              campaigns: campaigns,
              status: response.status
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCampaigns(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
export var getCampaignDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(campaignId) {
    var response;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return webgateFetchJson("".concat(BASE_CAMPAIGN_URI, "/").concat(campaignId));

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getCampaignDetail(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
export var getCampaignDelivery = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(campaignId) {
    var response;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return webgateFetchJson("".concat(BASE_CAMPAIGN_URI, "/").concat(campaignId, "/results/delivery"));

          case 2:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getCampaignDelivery(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
export var getCampaignEngagement = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(campaignId, useV2Endpoint, artistId) {
    var uri, response;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            uri = useV2Endpoint ? "".concat(BASE_CAMPAIGN_URI_V2, "/").concat(campaignId, "/").concat(artistId, "/results/engagement") : "".concat(BASE_CAMPAIGN_URI_V1, "/").concat(campaignId, "/results/engagement");
            _context6.next = 3;
            return webgateFetchJson(uri);

          case 3:
            response = _context6.sent;
            return _context6.abrupt("return", response);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getCampaignEngagement(_x6, _x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
export var bookCampaign = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(campaignRequest) {
    var options, response;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            options = {
              method: 'POST',
              body: JSON.stringify(campaignRequest)
            };
            _context7.next = 3;
            return webgateFetchJson("".concat(BASE_CAMPAIGNS_URI), options);

          case 3:
            response = _context7.sent;
            return _context7.abrupt("return", response);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function bookCampaign(_x9) {
    return _ref7.apply(this, arguments);
  };
}();
export var updateCampaign = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(campaignRequest, campaignId) {
    var options;
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            options = {
              method: 'PUT',
              body: JSON.stringify(campaignRequest)
            };
            _context8.next = 3;
            return webgateFetch("".concat(BASE_CAMPAIGNS_URI, "/").concat(campaignId), options).then(verifyResponse);

          case 3:
            return _context8.abrupt("return", _context8.sent);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function updateCampaign(_x10, _x11) {
    return _ref8.apply(this, arguments);
  };
}();
export var cancelOrStopCampaign = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(campaignId) {
    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return webgateFetch("".concat(BASE_CAMPAIGNS_URI, "/").concat(campaignId), {
              method: 'DELETE'
            }).then(verifyResponse);

          case 2:
            return _context9.abrupt("return", _context9.sent);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function cancelOrStopCampaign(_x12) {
    return _ref9.apply(this, arguments);
  };
}();
export var getReleases = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(artistId) {
    var response, releases;
    return _regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return webgateFetch("".concat(BASE_ARTIST_URI, "/").concat(artistId, "/releases"));

          case 2:
            response = _context10.sent;
            releases = [];
            _context10.t0 = response.status;
            _context10.next = _context10.t0 === 200 ? 7 : _context10.t0 === 401 ? 11 : _context10.t0 === 403 ? 11 : 12;
            break;

          case 7:
            _context10.next = 9;
            return response.json().then(function (r) {
              return r.releases;
            });

          case 9:
            releases = _context10.sent;
            return _context10.abrupt("break", 13);

          case 11:
            return _context10.abrupt("break", 13);

          case 12:
            throw new Error("".concat(response.status, " ").concat(response.url));

          case 13:
            return _context10.abrupt("return", {
              releases: releases,
              status: response.status
            });

          case 14:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getReleases(_x13) {
    return _ref10.apply(this, arguments);
  };
}();
export var getAlbumGroup = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(artistId, releaseId) {
    var uri;
    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!(artistId.trim() === '' || releaseId.trim() === '')) {
              _context11.next = 2;
              break;
            }

            return _context11.abrupt("return", Promise.reject("artistId and releaseId cannot be empty"));

          case 2:
            uri = "".concat(BASE_ARTIST_URI, "/").concat(artistId, "/releases/").concat(releaseId);
            _context11.next = 5;
            return webgateFetchJson(uri);

          case 5:
            return _context11.abrupt("return", _context11.sent);

          case 6:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function getAlbumGroup(_x14, _x15) {
    return _ref11.apply(this, arguments);
  };
}();
export var getCampaignOnboardingFlag = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12() {
    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", Promise.resolve(false));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function getCampaignOnboardingFlag() {
    return _ref12.apply(this, arguments);
  };
}();
export var setCampaignOnboardingFlag = function setCampaignOnboardingFlag() {
  return false;
};
export var getUserSettings = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13() {
    return _regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return webgateFetchJson("".concat(MARKETPLACE_MGMT_API, "/v0/settings"));

          case 2:
            return _context13.abrupt("return", _context13.sent);

          case 3:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function getUserSettings() {
    return _ref13.apply(this, arguments);
  };
}();
export var updateBusinessEmail = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(newBusinessEmail) {
    return _regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return webgateFetch("".concat(MARKETPLACE_MGMT_API, "/v0/settings"), {
              method: 'PATCH',
              body: JSON.stringify({
                email: newBusinessEmail
              })
            }).then(verifyResponse);

          case 2:
            return _context14.abrupt("return", _context14.sent);

          case 3:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function updateBusinessEmail(_x16) {
    return _ref14.apply(this, arguments);
  };
}();
export var getUserOrgInfoForArtist = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(artistId) {
    var uri;
    return _regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            uri = "".concat(BASE_ARTIST_URI, "/").concat(artistId, "/orgs");
            _context15.next = 3;
            return webgateFetchJson(uri);

          case 3:
            return _context15.abrupt("return", _context15.sent);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function getUserOrgInfoForArtist(_x17) {
    return _ref15.apply(this, arguments);
  };
}();
export var getCampaignTeamInfo = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(albumUri, artistId, campaign) {
    var campaignTeam, _yield$getTeams, teams, switcherState;

    return _regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return getTeams(albumUri, MARQUEE_CAMPAIGN_ACTION, {
              artistId: artistId
            });

          case 2:
            _yield$getTeams = _context16.sent;
            teams = _yield$getTeams.teams;
            switcherState = _yield$getTeams.switcherState;

            if (campaign) {
              campaignTeam = teams.find(function (team) {
                return team.uri === campaign.organization_uri;
              });
            } else {
              campaignTeam = teams[0];
            }

            return _context16.abrupt("return", {
              team: campaignTeam,
              isSingleTeam: switcherState === SWITCHER_STATE.HIDE
            });

          case 7:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));

  return function getCampaignTeamInfo(_x18, _x19, _x20) {
    return _ref16.apply(this, arguments);
  };
}();
export var approveDraft = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee17(campaignId, teamUri) {
    return _regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return webgateFetch("".concat(BUYER_EXPERIENCE_API, "/v0/drafts/").concat(campaignId, "/approve"), {
              method: 'POST',
              body: JSON.stringify({
                orgUri: teamUri
              })
            }).then(verifyResponse);

          case 2:
            return _context17.abrupt("return", _context17.sent);

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));

  return function approveDraft(_x21, _x22) {
    return _ref17.apply(this, arguments);
  };
}();
export var rejectDraft = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee18(campaignId, teamUri) {
    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return webgateFetch("".concat(BUYER_EXPERIENCE_API, "/v0/drafts/").concat(campaignId, "/reject"), {
              method: 'POST',
              body: JSON.stringify({
                orgUri: teamUri
              })
            }).then(verifyResponse);

          case 2:
            return _context18.abrupt("return", _context18.sent);

          case 3:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));

  return function rejectDraft(_x23, _x24) {
    return _ref18.apply(this, arguments);
  };
}();