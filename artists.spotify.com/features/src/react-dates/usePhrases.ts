import { useT } from '@mrkt/features/i18n';

/**
 * Localized phrases for react-dates
 * @see https://github.com/airbnb/react-dates#localization
 */
export function usePhrases() {
  const t = useT();

  return {
    calendarLabel: t('REACT_DATES_calendarLabel', 'Calendar', ''),
    roleDescription: 'datepicker',
    closeDatePicker: t('REACT_DATES_closeDatePicker', 'Close', ''),
    focusStartDate: t(
      'REACT_DATES_focusStartDate',
      'Interact with the calendar and add the check-in date for your trip.',
      'This is generic text taken from a 3rd party plug-in. Should be translated as an arrival date.',
    ),
    clearDate: t('REACT_DATES_clearDate', 'Clear Date', ''),
    clearDates: t('REACT_DATES_clearDates', 'Clear Dates', ''),
    jumpToPrevMonth: t(
      'REACT_DATES_jumpToPrevMonth',
      'Move backward to switch to the previous month.',
      '',
    ),
    jumpToNextMonth: t(
      'REACT_DATES_jumpToNextMonth',
      'Move forward to switch to the next month.',
      '',
    ),
    keyboardShortcuts: t(
      'REACT_DATES_keyboardShortcuts',
      'Keyboard Shortcuts',
      '',
    ),
    showKeyboardShortcutsPanel: t(
      'REACT_DATES_showKeyboardShortcutsPanel',
      'Open the keyboard shortcuts panel.',
      '',
    ),
    hideKeyboardShortcutsPanel: t(
      'REACT_DATES_hideKeyboardShortcutsPanel',
      'Close the shortcuts panel.',
      '',
    ),
    openThisPanel: t('REACT_DATES_openThisPanel', 'Open this panel.', ''),
    enterKey: t('REACT_DATES_enterKey', 'Enter key', ''),
    leftArrowRightArrow: t(
      'REACT_DATES_leftArrowRightArrow',
      'Right and left arrow keys',
      '',
    ),
    upArrowDownArrow: t(
      'REACT_DATES_upArrowDownArrow',
      'up and down arrow keys',
      '',
    ),
    pageUpPageDown: t(
      'REACT_DATES_pageUpPageDown',
      'page up and page down keys',
      '',
    ),
    homeEnd: t('REACT_DATES_homeEnd', 'Home and end keys', ''),
    escape: t('REACT_DATES_escape', 'Escape key', ''),
    questionMark: t('REACT_DATES_questionMark', 'Question mark', ''),
    selectFocusedDate: t(
      'REACT_DATES_selectFocusedDate',
      'Select the date in focus.',
      '',
    ),
    moveFocusByOneDay: t(
      'REACT_DATES_moveFocusByOneDay',
      'Move backward (left) and forward (right) by one day.',
      '',
    ),
    moveFocusByOneWeek: t(
      'REACT_DATES_moveFocusByOneWeek',
      'Move backward (up) and forward (down) by one week.',
      '',
    ),
    moveFocusByOneMonth: t(
      'REACT_DATES_moveFocusByOneMonth',
      'Switch months.',
      '',
    ),
    moveFocustoStartAndEndOfWeek: t(
      'REACT_DATES_moveFocustoStartAndEndOfWeek',
      'Go to the first or last day of a week.',
      '',
    ),
    returnFocusToInput: t(
      'REACT_DATES_returnFocusToInput',
      'Return to the date input field.',
      '',
    ),
    keyboardForwardNavigationInstructions: t(
      'REACT_DATES_keyboardForwardNavigationInstructions',
      'Navigate forward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.',
      'This is a calendar component that has a button with a question mark sign. Pressing it reveals a menu. You can also access the same menu by pressing the physical key on a keyboard.',
    ),
    keyboardBackwardNavigationInstructions: t(
      'REACT_DATES_keyboardBackwardNavigationInstructions',
      'Navigate backward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.',
      '',
    ),
    chooseAvailableStartDate: ({ date }: any) =>
      t(
        'REACT_DATES_chooseAvailableStartDate',
        'Choose {date} as your check-in date. It’s available.',
        'This string appears in a calendar component and refers to the date being free and selectable. This is generic text taken from a 3rd party plug-in.',
        { date },
      ),
    chooseAvailableEndDate: ({ date }: any) =>
      t(
        'REACT_DATES_chooseAvailableEndDate',
        'Choose {date} as your check-out date. It’s available.',
        'This is generic text taken from a 3rd party plug-in. Let’s just leave it as a departure date for now.',
        { date },
      ),
    chooseAvailableDate: ({ date }: any) => date,
    dateIsUnavailable: ({ date }: any) =>
      t('REACT_DATES_dateIsUnavailable', 'Not available. {date}', '', {
        date,
      }),
    dateIsSelected: ({ date }: any) =>
      t('REACT_DATES_dateIsSelected', 'Selected. {date}', '', { date }),
    dateIsSelectedAsStartDate: ({ date }: any) =>
      t(
        'REACT_DATES_dateIsSelectedAsStartDate',
        'Selected as start date. {date}',
        '',
        { date },
      ),
    dateIsSelectedAsEndDate: ({ date }: any) =>
      t(
        'REACT_DATES_dateIsSelectedAsEndDate',
        'Selected as end date. {date}',
        '',
        { date },
      ),
  };
}
