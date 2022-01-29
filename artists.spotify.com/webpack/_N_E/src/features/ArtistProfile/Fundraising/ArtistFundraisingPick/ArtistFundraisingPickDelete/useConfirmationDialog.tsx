import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
export function useConfirmationDialog() {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isOpen = _React$useState2[0],
      setIsOpen = _React$useState2[1];

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return {
    close: close,
    isOpen: isOpen,
    open: open
  };
}