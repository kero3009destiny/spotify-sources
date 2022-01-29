// ignore-string-externalization
import { ArtistAccessFlowStep, CodeVerificationStatus, isLabelAccessFlowDetails, isLabelAccessFlowStep, LabelAccessFlowStep, LabelTeamType } from './models';
export var emptyOnboardingState = {
  artistAccessFlow: {
    details: {
      businessEmail: '',
      selectedArtist: null,
      teamType: 'ARTIST',
      artistName: '',
      firstName: '',
      lastName: '',
      role: '',
      company: '',
      companyWebsiteUrl: '',
      instagramUsername: null,
      twitterUsername: null,
      token: '',
      distributor: null,
      requestId: null,
      captcha: null
    },
    step: ArtistAccessFlowStep.LANDING,
    codeVerificationStatus: CodeVerificationStatus.incorrectLength,
    isTest: false
  },
  labelAccessFlow: {
    details: {
      businessEmail: '',
      selectedLabel: null,
      teamName: null,
      teamType: LabelTeamType.Label,
      firstName: '',
      lastName: '',
      role: '',
      company: '',
      companyWebsiteUrl: '',
      socialUrl: '',
      selectedMedia1: null,
      selectedMedia2: null,
      selectedMedia3: null,
      token: ''
    },
    step: LabelAccessFlowStep.FIND_TEAM,
    codeVerificationStatus: CodeVerificationStatus.incorrectLength
  }
};
export var isLabelAccessFlowState = function isLabelAccessFlowState(candidate) {
  return typeof candidate === 'object' && isLabelAccessFlowDetails(candidate.labelAccessFlow.details) && isLabelAccessFlowStep(candidate.labelAccessFlow.step) && (candidate.labelAccessFlow.findLabelResults === null || candidate.labelAccessFlow.findLabelResults instanceof Array && !candidate.labelAccessFlow.findLabelResults.find(function (_ref) {
    var uri = _ref.uri,
        name = _ref.name;
    return typeof uri !== 'string' || typeof name !== 'string';
  })) && typeof candidate.labelAccessFlow.findLabelQuery === 'string' && typeof candidate.labelAccessFlow.codeVerificationStatus === typeof CodeVerificationStatus;
};