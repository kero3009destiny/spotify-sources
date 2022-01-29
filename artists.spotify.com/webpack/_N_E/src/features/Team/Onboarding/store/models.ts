// ignore-string-externalization
export var ArtistAccessFlowStep;

(function (ArtistAccessFlowStep) {
  ArtistAccessFlowStep["LANDING"] = "LANDING";
  ArtistAccessFlowStep["VERIFY_ACCOUNT"] = "VERIFY_ACCOUNT";
  ArtistAccessFlowStep["FIND_ARTIST"] = "FIND_ARTIST";
  ArtistAccessFlowStep["SPEEDBUMP"] = "SPEEDBUMP";
  ArtistAccessFlowStep["ENTER_EMAIL"] = "ENTER_EMAIL";
  ArtistAccessFlowStep["CONFIRM_EMAIL"] = "CONFIRM_EMAIL";
  ArtistAccessFlowStep["CLAIM_ARTIST"] = "CLAIM_ARTIST";
  ArtistAccessFlowStep["VERIFY_CLAIM"] = "VERIFY_CLAIM";
  ArtistAccessFlowStep["SOCIAL_VERIFICATION"] = "SOCIAL_VERIFICATION";
  ArtistAccessFlowStep["JOIN_ARTIST_TEAM"] = "JOIN_ARTIST_TEAM";
  ArtistAccessFlowStep["DETAILS_CONFIRMATION"] = "DETAILS_CONFIRMATION";
})(ArtistAccessFlowStep || (ArtistAccessFlowStep = {}));

export var LabelAccessFlowStep;

(function (LabelAccessFlowStep) {
  LabelAccessFlowStep["FIND_TEAM"] = "FIND_TEAM";
  LabelAccessFlowStep["SPEEDBUMP"] = "SPEEDBUMP";
  LabelAccessFlowStep["ENTER_EMAIL"] = "ENTER_EMAIL";
  LabelAccessFlowStep["CONFIRM_EMAIL"] = "CONFIRM_EMAIL";
  LabelAccessFlowStep["CREATE_TEAM"] = "CREATE_TEAM";
  LabelAccessFlowStep["JOIN_TEAM"] = "JOIN_TEAM";
  LabelAccessFlowStep["SELECT_CONTENT"] = "SELECT_CONTENT";
  LabelAccessFlowStep["DETAILS_CONFIRMATION"] = "DETAILS_CONFIRMATION";
})(LabelAccessFlowStep || (LabelAccessFlowStep = {}));

export var isLabelAccessFlowStep = function isLabelAccessFlowStep(value) {
  return Object.values(LabelAccessFlowStep).includes(value);
};

var isSelectedMedia = function isSelectedMedia(candidate) {
  return candidate === null || typeof candidate === 'object' && typeof candidate.uri === 'string' && candidate.status === 'entering' || candidate.status === 'loading' || candidate.status === 'error' || candidate.status === 'loaded' && typeof candidate.mediaName === 'string' && typeof candidate.labelName === 'string' && (typeof candidate.imageUrl === 'string' || typeof candidate.imageUrl === 'undefined');
};

export var isArtistAccessFlowDetails = function isArtistAccessFlowDetails(candidate) {
  return typeof candidate === 'object' && typeof candidate.businessEmail === 'string' && (candidate.selectedArtist === null || typeof candidate.selectedArtist === 'object' && typeof candidate.selectedArtist.name === 'string' && typeof candidate.selectedArtist.uri === 'string') && candidate.teamType === 'ARTIST' && typeof candidate.firstName === 'string' && typeof candidate.lastName === 'string' && typeof candidate.role === 'string' && typeof candidate.company === 'string' && typeof candidate.companyWebsiteUrl === 'string' && typeof candidate.token === 'string';
};
export var isLabelAccessFlowDetails = function isLabelAccessFlowDetails(candidate) {
  return typeof candidate === 'object' && typeof candidate.businessEmail === 'string' && (candidate.selectedLabel === null || typeof candidate.selectedLabel === 'object' && typeof candidate.selectedLabel.name === 'string' && typeof candidate.selectedLabel.uri === 'string') && (candidate.teamName === null || typeof candidate.teamName === 'string') && isLabelTeamType(candidate.teamType) && typeof candidate.firstName === 'string' && typeof candidate.lastName === 'string' && typeof candidate.role === 'string' && typeof candidate.company === 'string' && typeof candidate.companyWebsiteUrl === 'string' && typeof candidate.socialUrl === 'string' && isSelectedMedia(candidate.selectedMedia1) && isSelectedMedia(candidate.selectedMedia2) && isSelectedMedia(candidate.selectedMedia3) && typeof candidate.token === 'string';
};
export var LabelTeamType;

(function (LabelTeamType) {
  LabelTeamType["Label"] = "LABEL";
  LabelTeamType["Distributor"] = "DISTRIBUTOR";
})(LabelTeamType || (LabelTeamType = {}));

export var isLabelTeamType = function isLabelTeamType(value) {
  return Object.values(LabelTeamType).includes(value);
};
export var toLabelTeamType = function toLabelTeamType(value) {
  if (isLabelTeamType(value)) {
    return value;
  }

  return LabelTeamType.Label;
};
export var CodeVerificationStatus;

(function (CodeVerificationStatus) {
  CodeVerificationStatus["expired"] = "EXPIRED";
  CodeVerificationStatus["invalid"] = "INVALID";
  CodeVerificationStatus["success"] = "SUCCESS";
  CodeVerificationStatus["malformed"] = "MALFORMED";
  CodeVerificationStatus["incorrectLength"] = "INCORRECT_LENGTH";
  CodeVerificationStatus["timeout"] = "TIMEOUT";
})(CodeVerificationStatus || (CodeVerificationStatus = {}));

export var MediaType;

(function (MediaType) {
  MediaType["album"] = "album";
  MediaType["track"] = "track";
})(MediaType || (MediaType = {}));

export var isMediaType = function isMediaType(type) {
  return type in MediaType;
};
export var assertMediaType = function assertMediaType(type) {
  if (isMediaType(type)) {
    return type;
  }

  throw new Error("Unexpected media type: ".concat(type));
};