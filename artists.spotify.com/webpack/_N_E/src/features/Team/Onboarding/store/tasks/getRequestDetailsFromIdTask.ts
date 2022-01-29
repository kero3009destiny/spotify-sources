import { ArtistAccessFlowStep } from '../models';
import { requestDetailsLoader } from '../api/requestDetailsLoader';
import { getNames } from '../../../lib';
export var getRequestDetailsFromIdTask = function getRequestDetailsFromIdTask(requestId, _ref) {
  var goToArtistAccessFlowStep = _ref.goToArtistAccessFlowStep,
      setArtistAccessFlowDetails = _ref.setArtistAccessFlowDetails,
      artistAccessRouteReset = _ref.artistAccessRouteReset;
  return requestDetailsLoader.load(requestId).then(function (res) {
    if (res) {
      var _getNames = getNames(res.fullName),
          firstName = _getNames.firstName,
          lastName = _getNames.lastName;

      var company = res.company,
          notificationEmail = res.notificationEmail,
          role = res.role,
          artists = res.artists;
      setArtistAccessFlowDetails({
        firstName: firstName,
        lastName: lastName,
        company: company,
        businessEmail: notificationEmail,
        role: role,
        twitterUsername: artists[0].twitterUsername,
        instagramUsername: artists[0].instagramUsername
      });
    } else {
      artistAccessRouteReset();
      goToArtistAccessFlowStep(ArtistAccessFlowStep.VERIFY_ACCOUNT);
    }
  });
};