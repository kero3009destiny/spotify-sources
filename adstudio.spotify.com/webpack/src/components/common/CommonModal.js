import React from 'react';

import {
  Banner,
  DialogAlert,
  DialogConfirmation,
} from '@spotify-internal/adstudio-tape';

import PropTypes from 'prop-types';

const CommonModal = ({
  children,
  closeBtn,
  error,
  modalHeader,
  modalSize,
  onHide,
  show,
  submitBtn,
  ...props
}) => {
  const footer = (
    <div>
      {closeBtn}
      {submitBtn}
    </div>
  );

  if (!show) return <div style={{ display: 'none' }} />;

  if (modalSize === 'small') {
    return (
      <DialogAlert
        {...props}
        alert={error && <Banner colorSet="negative">{error}</Banner>}
        dialogTitle={modalHeader}
        body={children}
        onClose={onHide}
        footer={footer}
      />
    );
  }

  return (
    <DialogConfirmation
      {...props}
      dialogTitle={modalHeader}
      body={children}
      onClose={onHide}
      footer={footer}
    />
  );
};

CommonModal.defaultProps = {
  modalSize: 'small',
};

CommonModal.propTypes = {
  backdrop: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  closeBtn: PropTypes.object,
  error: PropTypes.node,
  keyboard: PropTypes.bool,
  labelledBy: PropTypes.string,
  modalHeader: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  modalSize: PropTypes.string,
  onHide: PropTypes.func,
  show: PropTypes.bool,
  submitBtn: PropTypes.element,
};

export default CommonModal;
