import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectAccountId as selectAccountIdAC } from 'ducks/account/actions';
import { isAccountSelected } from 'ducks/account/selectors';

import ConditionalPassthrough from 'components/common/ConditionalPassthrough';

import PropTypes from 'prop-types';

export class AdAccountSelector extends Component {
  constructor(props) {
    super(props);
    const {
      selectAccountId,
      params: { accountId },
    } = props;

    selectAccountId(accountId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      selectAccountId,
      params: { accountId },
    } = nextProps;
    selectAccountId(accountId);
  }

  render() {
    return <ConditionalPassthrough {...this.props} />;
  }
}

AdAccountSelector.propTypes = {
  loading: PropTypes.bool,
  params: PropTypes.object,
  selectAccountId: PropTypes.func,
  shouldPassthrough: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    loading: !isAccountSelected(state),
    shouldPassthrough: isAccountSelected(state),
  };
}

export default connect(mapStateToProps, {
  selectAccountId: selectAccountIdAC,
})(AdAccountSelector);
