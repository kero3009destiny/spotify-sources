import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { BulkInviteStage, InviteState } from './BulkInviteState';
import { BulkInviteActionType } from './BulkInviteAction';
import { calculateStageBasedOnInvites } from '../util/calculateStageBasedOnInvite';
import { assertUnreachable } from '../../lib/util/assertUnreachable';

var updateInvite = function updateInvite(state, inviteId, transform) {
  if (!state.invites) {
    return state;
  }

  var index = state.invites.findIndex(function (i) {
    return i.id === inviteId;
  });

  if (index === -1) {
    return state;
  }

  var invites = [].concat(_toConsumableArray(state.invites.slice(0, index)), [transform(state.invites[index])], _toConsumableArray(state.invites.slice(index + 1)));
  return _objectSpread(_objectSpread({}, state), {}, {
    invites: invites
  });
};

export var bulkInviteReducer = function bulkInviteReducer(state, action) {
  switch (action.type) {
    case BulkInviteActionType.BULK_INVITE_SET_INVITES:
      return _objectSpread(_objectSpread({}, state), {}, {
        numInvitesOmitted: action.numInvitesOmitted,
        invites: action.invites,
        stage: calculateStageBasedOnInvites(action.invites)
      });

    case BulkInviteActionType.BULK_INVITE_FINISHED_SENDING:
      return _objectSpread(_objectSpread({}, state), {}, {
        // we can't assume "Sent", since there may be outstanding edits
        stage: calculateStageBasedOnInvites(state.invites)
      });

    case BulkInviteActionType.BULK_INVITE_SET_FILE_LOADING:
      return _objectSpread(_objectSpread({}, state), {}, {
        stage: BulkInviteStage.Uploading
      });

    case BulkInviteActionType.BULK_INVITE_SET_STAGE:
      return _objectSpread(_objectSpread({}, state), {}, {
        stage: action.stage
      });

    case BulkInviteActionType.BULK_INVITE_ADVANCE_STAGE:
      return _objectSpread(_objectSpread({}, state), {}, {
        stage: state.stage + 1
      });

    case BulkInviteActionType.BULK_INVITE_FILE_PROCESSING_FAILED:
      return _objectSpread(_objectSpread({}, state), {}, {
        stage: BulkInviteStage.Upload
      });

    case BulkInviteActionType.BULK_INVITE_REMOVE_INVITE:
      return _objectSpread(_objectSpread({}, state), {}, {
        invites: state.invites.filter(function (i) {
          return i.id !== action.inviteId;
        })
      });

    case BulkInviteActionType.BULK_INVITE_UPDATE_INVITE:
      return updateInvite(state, action.invite.id, function () {
        return action.invite;
      });

    case BulkInviteActionType.BULK_INVITE_CANCEL_UPDATE_INVITE:
      return updateInvite(state, action.inviteId, function (invite) {
        return _objectSpread(_objectSpread({}, invite), {}, {
          state: InviteState.VIEWING
        });
      });

    case BulkInviteActionType.BULK_INVITE_EDIT_INVITE:
      return updateInvite(state, action.inviteId, function (invite) {
        return _objectSpread(_objectSpread({}, invite), {}, {
          state: InviteState.EDITING
        });
      });

    case BulkInviteActionType.BULK_INVITE_SENDING_INVITE:
      return updateInvite(state, action.inviteId, function (invite) {
        return _objectSpread(_objectSpread({}, invite), {}, {
          state: InviteState.INVITING,
          serverErrors: []
        });
      });

    case BulkInviteActionType.BULK_INVITE_ERROR_SENDING_INVITE:
      return updateInvite(state, action.inviteId, function (invite) {
        return _objectSpread(_objectSpread({}, invite), {}, {
          state: InviteState.VIEWING,
          serverErrors: [action.message]
        });
      });

    case BulkInviteActionType.BULK_INVITE_SENT_INVITE:
      return updateInvite(state, action.inviteId, function (invite) {
        return _objectSpread(_objectSpread({}, invite), {}, {
          state: InviteState.INVITED,
          serverErrors: []
        });
      });

    case BulkInviteActionType.BULK_INVITE_SAVE_INVITE:
      return updateInvite(state, action.invite.id, function () {
        return _objectSpread(_objectSpread({}, action.invite), {}, {
          state: InviteState.VIEWING,
          validationErrors: []
        });
      });

    default:
      return assertUnreachable(action);
  }
};