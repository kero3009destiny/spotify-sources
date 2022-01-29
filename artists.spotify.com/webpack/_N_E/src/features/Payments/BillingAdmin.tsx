import React, { createRef, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import debounce from 'lodash/debounce';
import { Dropdown, DropdownLink, DropdownTrigger, FormInput, FormInputIcon, IconSearch } from '@spotify-internal/encore-web';
import { useCurrentTeamMembers } from '../Team/hooks';
import { NameCell } from '../Team/TeamListPage/TeamMemberTable/NameCell';
import { useBillingContactDropdownLogger, useBillingUserSelectionLogger } from './hooks/usePaymentsUbi';
import { BADGE_HEIGHT, StyledDropdownlist, ToggleChildrenVisibility, EmptyStateText, EmptyStateContainer } from './styled';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var BillingAdminKeyboardControls;

(function (BillingAdminKeyboardControls) {
  BillingAdminKeyboardControls["ARROW_UP"] = "ArrowUp";
  BillingAdminKeyboardControls["ARROW_DOWN"] = "ArrowDown";
  BillingAdminKeyboardControls["ARROW_RIGHT"] = "ArrowRight";
  BillingAdminKeyboardControls["ARROW_LEFT"] = "ArrowLeft";
  BillingAdminKeyboardControls["ENTER"] = "Enter";
  BillingAdminKeyboardControls["ESC"] = "Esc";
  BillingAdminKeyboardControls["ESCAPE"] = "Escape";
  BillingAdminKeyboardControls["TAB"] = "Tab";
})(BillingAdminKeyboardControls || (BillingAdminKeyboardControls = {}));

export var BillingAdmin = function BillingAdmin(_ref) {
  var disabled = _ref.disabled,
      filterOptions = _ref.filterOptions,
      onDropdownChange = _ref.onDropdownChange,
      onChange = _ref.onChange,
      orgUri = _ref.orgUri,
      billingContactId = _ref.billingContactId;
  var t = useT();
  var members = useCurrentTeamMembers(orgUri);
  var admins = useMemo(function () {
    return (members === null || members === void 0 ? void 0 : members.filter(function (member) {
      var _member$accessLevel;

      if (filterOptions && !filterOptions(member)) return false;
      return (member === null || member === void 0 ? void 0 : (_member$accessLevel = member.accessLevel) === null || _member$accessLevel === void 0 ? void 0 : _member$accessLevel.includes('Full Access')) && member.status === 'active' && member.businessEmail && member.businessEmail !== '';
    })) || [];
  }, [members]);

  var _useState = useState(''),
      searchValue = _useState[0],
      setSearchValue = _useState[1];

  var _useState2 = useState(false),
      isSelectingAdmin = _useState2[0],
      setSelectingAdmin = _useState2[1];

  var _useState3 = useState(0),
      selectedAdminIdx = _useState3[0],
      setSelectedAdminIdx = _useState3[1];

  var _useState4 = useState(admins),
      filteredAdmins = _useState4[0],
      setFilteredAdmins = _useState4[1];

  var selectedAdmin = useMemo(function () {
    return filteredAdmins[selectedAdminIdx];
  }, [selectedAdminIdx, filteredAdmins]);
  var dropdownListRef = /*#__PURE__*/createRef();
  var searchInputRef = useRef(null);
  var logBillingContactDropdown = useCallback(useBillingContactDropdownLogger(orgUri), [orgUri]);
  var logBillingUserSelection = useBillingUserSelectionLogger(orgUri);

  var updateIsSelectingAdmin = function updateIsSelectingAdmin(isSelecting) {
    setSelectingAdmin(isSelecting);
    onDropdownChange && onDropdownChange(isSelecting);
  };

  useEffect(function () {
    isSelectingAdmin && logBillingContactDropdown();
  }, [isSelectingAdmin, logBillingContactDropdown]);

  var resetAdminDropdownState = function resetAdminDropdownState() {
    setSearchValue('');
    updateIsSelectingAdmin(false);
    setSelectedAdminIdx(0);
    setFilteredAdmins(admins);
  };

  var handleSelect = function handleSelect(admin) {
    onChange(admin);
    resetAdminDropdownState();
    logBillingUserSelection(admin.id);
  };

  var onSearchKeyDown = useCallback(function (e) {
    e.stopPropagation();

    switch (e.key) {
      case BillingAdminKeyboardControls.ARROW_DOWN:
      case BillingAdminKeyboardControls.ARROW_UP:
        {
          var _dropdownListRef$curr;

          dropdownListRef === null || dropdownListRef === void 0 ? void 0 : (_dropdownListRef$curr = dropdownListRef.current) === null || _dropdownListRef$curr === void 0 ? void 0 : _dropdownListRef$curr.focus({
            preventScroll: true
          });
          break;
        }

      case BillingAdminKeyboardControls.TAB:
        {
          resetAdminDropdownState();
          break;
        }

      case BillingAdminKeyboardControls.ENTER:
        {
          handleSelect(selectedAdmin);
          break;
        }

      case BillingAdminKeyboardControls.ESC:
      case BillingAdminKeyboardControls.ESCAPE:
        {
          resetAdminDropdownState();
          break;
        }

      default:
        {
          return;
        }
    }
  }, [dropdownListRef, selectedAdmin]);
  var onAdminListKeyDown = useCallback(function (e) {
    e.stopPropagation();
    var noResults = !Boolean(filteredAdmins.length);

    switch (e.key) {
      case BillingAdminKeyboardControls.ARROW_UP:
        {
          if (noResults) return;

          if (selectedAdminIdx !== 0) {
            setSelectedAdminIdx(selectedAdminIdx - 1);
          }

          break;
        }

      case BillingAdminKeyboardControls.ARROW_DOWN:
        {
          if (noResults) return;

          if (selectedAdminIdx < filteredAdmins.length - 1) {
            setSelectedAdminIdx(selectedAdminIdx + 1);
          }

          break;
        }

      case BillingAdminKeyboardControls.ARROW_RIGHT:
      case BillingAdminKeyboardControls.ARROW_LEFT:
        {
          var _searchInputRef$curre;

          searchInputRef === null || searchInputRef === void 0 ? void 0 : (_searchInputRef$curre = searchInputRef.current) === null || _searchInputRef$curre === void 0 ? void 0 : _searchInputRef$curre.focus();
          break;
        }

      case BillingAdminKeyboardControls.ENTER:
        {
          if (noResults) return;
          handleSelect(selectedAdmin);
          break;
        }

      case BillingAdminKeyboardControls.ESC:
      case BillingAdminKeyboardControls.ESCAPE:
        {
          resetAdminDropdownState();
          break;
        }

      default:
        {
          return;
        }
    }
  }, [filteredAdmins, onChange, selectedAdmin, setSelectedAdminIdx, updateIsSelectingAdmin]);
  var savedAdmin = useMemo(function () {
    if (!billingContactId) {
      return undefined;
    }

    return admins.find(function (admin) {
      return admin.id === billingContactId;
    });
  }, [admins, billingContactId]);
  var handleSearchChange = useCallback(debounce(function (targetValue) {
    var newFilter = admins.filter(function (admin) {
      var _admin$businessEmail, _admin$fullName;

      return ((_admin$businessEmail = admin.businessEmail) === null || _admin$businessEmail === void 0 ? void 0 : _admin$businessEmail.toLowerCase().includes(targetValue.toLowerCase())) || ((_admin$fullName = admin.fullName) === null || _admin$fullName === void 0 ? void 0 : _admin$fullName.toLowerCase().includes(targetValue.toLowerCase()));
    });
    setFilteredAdmins(newFilter);
    setSelectedAdminIdx(0);
  }, 200), [admins, debounce, setFilteredAdmins, setSelectedAdminIdx, isSelectingAdmin]);
  var displaySearch = useMemo(function () {
    return isSelectingAdmin || !savedAdmin;
  }, [isSelectingAdmin, savedAdmin]);
  var displayDropdown = useMemo(function () {
    return !isSelectingAdmin && Boolean(savedAdmin);
  }, [isSelectingAdmin, savedAdmin]);
  return /*#__PURE__*/_jsx(DropdownTrigger, {
    "data-testid": "billing-admin-dropdown-trigger",
    overlay: isSelectingAdmin ? /*#__PURE__*/_jsx(StyledDropdownlist, {
      id: "billing-admin-listbox",
      ref: dropdownListRef,
      "aria-label": "Billing Contact Choices",
      "data-testid": "billing-admin-listbox",
      onKeyDown: onAdminListKeyDown,
      "aria-activedescendant": selectedAdmin === null || selectedAdmin === void 0 ? void 0 : selectedAdmin.id,
      children: !filteredAdmins.length ? /*#__PURE__*/_jsx(EmptyStateContainer, {
        children: /*#__PURE__*/_jsx(EmptyStateText, {
          children: t('PAYMENTS_CONTACT_NO_RESULTS', 'No results', 'Describes the dropdown state when no contacts are found.')
        })
      }) : filteredAdmins.map(function (admin) {
        return /*#__PURE__*/_jsx(DropdownLink, {
          as: "li",
          "aria-label": "".concat(admin.fullName || '', ", ").concat(admin.businessEmail),
          "data-testid": "billing-admin-option",
          role: "option",
          id: admin.id,
          onClick: function onClick() {
            return handleSelect(admin);
          },
          selected: selectedAdmin.id === admin.id,
          "aria-selected": selectedAdmin.id === admin.id,
          children: /*#__PURE__*/_jsx(NameCell, {
            teamMember: admin
          })
        }, admin.id);
      })
    }) : null,
    onShow: function onShow() {
      var _searchInputRef$curre2;

      updateIsSelectingAdmin(true);
      searchInputRef === null || searchInputRef === void 0 ? void 0 : (_searchInputRef$curre2 = searchInputRef.current) === null || _searchInputRef$curre2 === void 0 ? void 0 : _searchInputRef$curre2.focus();
    },
    onHide: function onHide(e) {
      e.stopPropagation();
      resetAdminDropdownState();
    },
    children: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(ToggleChildrenVisibility, {
        "aria-hidden": !displaySearch,
        children: /*#__PURE__*/_jsx(FormInputIcon, {
          iconLeading: /*#__PURE__*/_jsx(IconSearch, {}),
          children: /*#__PURE__*/_jsx(FormInput, {
            onFocus: function onFocus(e) {
              e.stopPropagation();

              if (!isSelectingAdmin) {
                updateIsSelectingAdmin(true);
              }
            },
            onClick: function onClick(e) {
              e.stopPropagation();

              if (!isSelectingAdmin) {
                updateIsSelectingAdmin(true);
              }
            },
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-expanded": isSelectingAdmin,
            "aria-controls": "billing-admin-listbox",
            "aria-haspopup": "true",
            id: "billing-admin",
            ref: searchInputRef,
            onKeyDown: onSearchKeyDown,
            value: searchValue,
            "data-testid": "billing-admin-search",
            type: "text",
            placeholder: t('PAYMENTS_CONTACT_PLACEHOLDER', 'Choose an admin', 'Placeholder text for selecting a person as an admin'),
            onChange: function onChange(e) {
              setSearchValue(e.target.value);
              handleSearchChange(e.target.value);
            },
            style: {
              height: BADGE_HEIGHT
            }
          })
        })
      }), /*#__PURE__*/_jsx(ToggleChildrenVisibility, {
        "aria-hidden": !displayDropdown,
        children: /*#__PURE__*/_jsx(Dropdown, {
          id: "billing-admin-toggle",
          tabIndex: displayDropdown ? -1 : 0,
          "data-testid": "billing-admin-toggle",
          "aria-labelledby": "billing-admin-label billing-admin-toggle",
          "aria-expanded": isSelectingAdmin || undefined,
          onClick: function onClick() {
            return updateIsSelectingAdmin(true);
          },
          disabled: disabled,
          children: savedAdmin && /*#__PURE__*/_jsx(NameCell, {
            teamMember: savedAdmin
          })
        })
      })]
    })
  });
};