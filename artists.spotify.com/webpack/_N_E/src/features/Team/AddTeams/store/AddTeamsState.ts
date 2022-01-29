// ignore-string-externalization
export var AddTeamType;

(function (AddTeamType) {
  AddTeamType["artist"] = "ARTIST";
  AddTeamType["label"] = "LABEL";
  AddTeamType["distributor"] = "DISTRIBUTOR";
})(AddTeamType || (AddTeamType = {}));

export var emptyAddTeamsState = {
  details: {
    selectedTeam: null,
    newLabelTeamName: null,
    role: '',
    company: '',
    instagramUsername: null,
    twitterUsername: null,
    websiteLink: '',
    socialLink: '',
    selectedMedia1: null,
    selectedMedia2: null,
    selectedMedia3: null
  },
  platform: null,
  selectedTeamType: AddTeamType.artist,
  canRequestAccessError: null,
  showError: false,
  formErrors: new Map(),
  requestSubmissionError: null,
  requestId: null
};