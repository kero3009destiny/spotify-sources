import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { OnboardingActionType } from './OnboardingAction';
import { assertUnreachable } from '../../lib/util/assertUnreachable';
export var onboardingReducer = function onboardingReducer(state, action) {
  switch (action.type) {
    case OnboardingActionType.ARTIST_ACCESS_FLOW_UPDATE_STATE:
      return _objectSpread(_objectSpread({}, state), {}, {
        artistAccessFlow: _objectSpread(_objectSpread({}, state.artistAccessFlow), action.state)
      });

    case OnboardingActionType.ARTIST_ACCESS_FLOW_UPDATE_DETAILS:
      return _objectSpread(_objectSpread({}, state), {}, {
        artistAccessFlow: _objectSpread(_objectSpread({}, state.artistAccessFlow), {}, {
          details: _objectSpread(_objectSpread({}, state.artistAccessFlow.details), action.details)
        })
      });

    case OnboardingActionType.LABEL_ONBOARDING_FLOW_UPDATE_STATE:
      return _objectSpread(_objectSpread({}, state), {}, {
        labelAccessFlow: _objectSpread(_objectSpread({}, state.labelAccessFlow), action.state)
      });

    case OnboardingActionType.LABEL_ONBOARDING_FLOW_UPDATE_DETAILS:
      return _objectSpread(_objectSpread({}, state), {}, {
        labelAccessFlow: _objectSpread(_objectSpread({}, state.labelAccessFlow), {}, {
          details: _objectSpread(_objectSpread({}, state.labelAccessFlow.details), action.details)
        })
      });

    default:
      return assertUnreachable(action);
  }
};