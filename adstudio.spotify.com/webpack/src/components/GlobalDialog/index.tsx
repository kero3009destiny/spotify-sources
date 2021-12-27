import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GlobalDialogState } from 'ducks/globalDialog/reducer';
import { setGlobalDialogStatus } from 'ducks/globalDialog/actions';
import { getGlobalDialog } from 'ducks/globalDialog/selectors';

import Dialog from './Dialog';

export interface GlobalDialogListener {
  dismiss: () => {};
}

const mapActionsToProps = (dispatch: Dispatch): GlobalDialogListener => {
  return {
    dismiss: () => dispatch(setGlobalDialogStatus(false)),
  };
};
const mapStateToProps = (state: TSFixMe): GlobalDialogState =>
  getGlobalDialog(state);
export default connect(mapStateToProps, mapActionsToProps)(Dialog);
