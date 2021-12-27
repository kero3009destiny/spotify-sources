import { DialogEvents, GlobalDialogTypes, IDialogContent } from './types';

export interface GlobalDialogState {
  visible: boolean;
  content: IDialogContent;
}

const defaultState: GlobalDialogState = {
  visible: false,
  content: {
    body: '',
    actionLabel: '',
    actionURL: '/',
  },
};

export default (
  state: GlobalDialogState = defaultState,
  action: GlobalDialogTypes,
) => {
  switch (action.type) {
    case DialogEvents.isVisible:
      return { ...state, visible: action.payload };
    case DialogEvents.setContent:
      return { ...state, content: action.payload, visible: true };
    default:
      return state;
  }
};
