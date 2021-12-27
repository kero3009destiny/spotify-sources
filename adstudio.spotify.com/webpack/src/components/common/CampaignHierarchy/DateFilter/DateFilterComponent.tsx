import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { Moment } from 'moment';
import { Dispatch } from 'redux';
import styled, { keyframes } from 'styled-components';

import {
  Dropdown,
  DropdownItem,
  DropdownLink as EncoreDropdownLink,
  DropdownList as EncoreDropdownList,
  DropdownTrigger,
  gray50,
  IconReleased,
  spacer8,
  Type,
  white,
} from '@spotify-internal/encore-web';

import { isSuperUserAccountActive } from 'ducks/account/selectors';

import { displaySuperUserDatePickerNotification } from 'utils/notificationHelpers';

import { dateFormatter, getDateRange } from './DateFilterHelpers';
import DatePickerWrapper from './DatePickerWrapper';

import {
  DateDropdownOptionKeys,
  DateDropdownOptionValues,
  QueryParamDateFormat,
} from './constants';

interface DispatchProps {
  displaySuperUserNotification: () => void;
}

interface StateProps {
  isSuperUserAccountActive: boolean;
}

export interface DateFilterProps {
  handleChange: (
    dateRange: DateRange | undefined,
    selectedOption: string,
  ) => void;
  dateRange?: DateRangeMoment;
  dateRangePreset?: string;
}

export interface DateRangeMoment {
  dateRangeStart: Moment;
  dateRangeEnd: Moment;
}

export interface DateRange {
  dateRangeStart: string;
  dateRangeEnd: string;
}

interface DateFilterState {
  show: boolean;
  showCalendar: boolean;
  dateRange?: DateRange;
}

// 416 = 8 x 52 = enough height to show all items with a little room.
const DropdownList = styled(EncoreDropdownList)<{
  showCalendar: boolean;
}>`
  max-height: 416px;
  ${props => {
    if (props.showCalendar) {
      return `
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        box-shadow: none;
      `;
    }
    return '';
  }}

  &:focus {
    border: 0;
  }
`;

const boxShadowTrickeryInMotion = keyframes`
  0% {
    right: 0;
  }
  100% {
    right: -618px;
  }
`;

const BoxShadowTrickery = styled.div`
  animation: 0.3s ${boxShadowTrickeryInMotion} ease-out;
  z-index: 1; // Bring above later elements on page.
  position: absolute;
  background: ${white};
  border-radius: ${spacer8};
  top: 64px;
  right: -618px;
  left: 0;
  bottom: -348px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
`;

const DropdownLink = styled(EncoreDropdownLink)`
  padding: 13px 16px;
`;

const DateDropdown = styled.div`
  width: 238px;
`;

const DateDropdownContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentDate = styled.div`
  margin-left: 14px;
`;

const StyledDateRange = styled(Type.p)`
  color: ${gray50};
`;

const StyledDropDown = styled(Dropdown)`
  padding-top: 6px;
  padding-bottom: 6px;
  min-height: 52px;
`;

// Keys for preset values to display, not including CUSTOM
const PresetKeys = Object.keys(DateDropdownOptionKeys).filter(
  key => key !== DateDropdownOptionKeys.CUSTOM,
);

class DateFilter extends Component<
  DateFilterProps & DispatchProps & StateProps,
  DateFilterState
> {
  state: Readonly<DateFilterState> = {
    show: false,
    showCalendar: false,
  };

  onShowDropdown = () => {
    if (this.props.isSuperUserAccountActive) {
      this.props.displaySuperUserNotification();
    } else {
      this.setState({
        show: true,
        showCalendar:
          this.props.dateRangePreset === DateDropdownOptionKeys.CUSTOM,
      });
    }
  };

  onHideDropdown = () =>
    this.setState({
      show: false,
      showCalendar: false,
    });

  onClickHandler = (event: MouseEvent, selectedOption: string) => {
    event.preventDefault();

    this.setState({
      show: false,
    });
    this.props.handleChange(undefined, selectedOption);
  };

  onCustomClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showCalendar: true });
  };

  onDatesChange = (dates: Record<string, Moment>) => {
    const { startDate, endDate } = dates;
    const dateRange: DateRange = {
      dateRangeStart: startDate.format(QueryParamDateFormat),
      dateRangeEnd: endDate.format(QueryParamDateFormat),
    };

    this.props.handleChange(dateRange, DateDropdownOptionKeys.CUSTOM);
  };

  shouldShowCalendar = () => {
    const { show, showCalendar } = this.state;
    return show && showCalendar;
  };

  // clicking on certain places in date picker propogates up to the onClick of the dropdown
  // and toggles it which we do not want to do. So we stop propagation here.
  preventPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    e.stopPropagation();

  render() {
    const { dateRangePreset: dateRangePresetFromProps, dateRange } = this.props;

    const showCalendar = this.shouldShowCalendar();

    const dateRangePreset =
      dateRangePresetFromProps || DateDropdownOptionKeys.LIFETIME;
    let parsedDateRange: DateRangeMoment | undefined = dateRange;

    // Generate date range for any dynamic presets (all except Custom and Lifetime)
    if (
      !showCalendar &&
      dateRangePreset !== DateDropdownOptionKeys.CUSTOM &&
      dateRangePreset !== DateDropdownOptionKeys.LIFETIME
    ) {
      parsedDateRange = getDateRange({ dateRangePreset });
    }

    const dateFormat: string = parsedDateRange
      ? dateFormatter(parsedDateRange)
      : '';

    const selectedPreset = showCalendar
      ? DateDropdownOptionKeys.CUSTOM
      : dateRangePreset;

    return (
      <DateDropdown>
        <DropdownTrigger
          overlay={
            this.state.show && (
              <DropdownList
                data-test="dropdown-content"
                showCalendar={showCalendar}
              >
                {PresetKeys.map(option => {
                  return (
                    <DropdownItem
                      data-test={`dropdown-item-${option}`}
                      key={`option-${option}`}
                    >
                      <DropdownLink
                        selected={selectedPreset === option}
                        // @ts-ignore
                        onClick={(e: MouseEvent) =>
                          this.onClickHandler(e, option)
                        }
                      >
                        {DateDropdownOptionValues[option]}
                      </DropdownLink>
                    </DropdownItem>
                  );
                })}

                <DropdownItem
                  data-test={`dropdown-item-${DateDropdownOptionKeys.CUSTOM}`}
                  key={`option-${DateDropdownOptionKeys.CUSTOM}`}
                >
                  <DropdownLink
                    divider
                    selected={selectedPreset === DateDropdownOptionKeys.CUSTOM}
                    // @ts-ignore
                    onClick={(e: MouseEvent) => {
                      this.onCustomClickHandler(e);
                    }}
                  >
                    {DateDropdownOptionValues.CUSTOM}
                  </DropdownLink>
                </DropdownItem>
              </DropdownList>
            )
          }
          data-test="date-picker-dropdown-trigger"
          onShow={this.onShowDropdown}
          onHide={this.onHideDropdown}
        >
          {showCalendar && (
            <div role="presentation" onClick={this.preventPropagation}>
              <BoxShadowTrickery />
              <DatePickerWrapper
                handleDatesChange={this.onDatesChange}
                startDate={parsedDateRange?.dateRangeStart}
                endDate={parsedDateRange?.dateRangeEnd}
              />
            </div>
          )}

          <StyledDropDown data-test="date-picker-dropdown">
            <DateDropdownContent>
              <IconReleased
                aria-label={i18n.t(
                  'I18N_ICON_OF_A_CALENDAR_PAGE',
                  'Icon of a calendar page',
                )}
                iconSize={24}
              />
              <ContentDate>
                <Type data-test="selected-value">
                  {DateDropdownOptionValues[selectedPreset]}
                </Type>
                {parsedDateRange && (
                  <StyledDateRange
                    condensed
                    variant={Type.body4}
                    data-test="selected-range"
                  >
                    {`${parsedDateRange.dateRangeStart.format(
                      dateFormat,
                    )} – ${parsedDateRange.dateRangeEnd.format(dateFormat)}`}
                  </StyledDateRange>
                )}
              </ContentDate>
            </DateDropdownContent>
          </StyledDropDown>
        </DropdownTrigger>
      </DateDropdown>
    );
  }
}

function mapStateToProps(state: TSFixMe): StateProps {
  return {
    isSuperUserAccountActive: isSuperUserAccountActive(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    displaySuperUserNotification: () =>
      dispatch(displaySuperUserDatePickerNotification()),
  };
}

const ConnectedDateFilterComponent = connect<
  StateProps,
  DispatchProps,
  DateFilterProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(DateFilter);

export default ConnectedDateFilterComponent;
