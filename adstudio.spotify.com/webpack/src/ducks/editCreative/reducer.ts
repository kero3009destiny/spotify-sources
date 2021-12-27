import {
  EDIT_CREATIVE,
  EDIT_CREATIVE_FAILED,
  EDIT_CREATIVE_SUCCEEDED,
  EditCreativeAction,
} from './types';

export interface EditCreativeState {
  editingCreative: boolean;
  editCreativeSuccess: boolean;
  editCreativeError: boolean;
}

export const defaultEditCreativeState: EditCreativeState = {
  editingCreative: false,
  editCreativeSuccess: false,
  editCreativeError: false,
};

export default (
  state: EditCreativeState = defaultEditCreativeState,
  action: EditCreativeAction,
) => {
  switch (action.type) {
    case EDIT_CREATIVE:
      return {
        ...state,
        editingCreative: true,
        editCreativeSuccess: false,
        editCreativeError: false,
      };

    case EDIT_CREATIVE_SUCCEEDED:
      return {
        ...state,
        editingCreative: false,
        editCreativeSuccess: true,
        editCreativeError: false,
      };

    case EDIT_CREATIVE_FAILED:
      return {
        ...state,
        editingCreative: false,
        editCreativeSuccess: false,
        editCreativeError: true,
      };

    default:
      return state;
  }
};
