// ignore-string-externalization
import { useEffect } from 'react';
export var useDropdownLinkFocus = function useDropdownLinkFocus(showDropdown, id) {
  useEffect(function () {
    // move focus to currently selected item when dropdown is opened
    if (showDropdown) {
      var element = document.getElementById(id);
      element.focus();
    }
  }, [showDropdown, id]);
};