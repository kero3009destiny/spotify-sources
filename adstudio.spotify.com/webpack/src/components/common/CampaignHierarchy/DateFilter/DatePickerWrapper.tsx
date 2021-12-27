import 'react-dates/initialize';
import '!style-loader!css-loader!react-dates/lib/css/_datepicker.css';
import React, { Component } from 'react';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import moment, { Moment } from 'moment';
import styled, { keyframes } from 'styled-components';

import { spacer8, white } from '@spotify-internal/encore-foundation';

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const embiggeningDatePicker = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 618px;
  }
`;

const SelectedRangeColor = '#AA9BAE';
const BorderColor = '#8C7593';

const AnimationWrapper = styled.div`
  animation: 0.3s ${slideInFromLeft} ease-out forwards;
  width: 618px;
  height: 355px;
  position: relative;
`;

const StyledWrapper = styled.div`
  animation: 0.3s ${embiggeningDatePicker} ease-out;
  overflow: hidden;
  padding: 8px 0 15px;
  background: ${white};
  border-radius: 0 ${spacer8} ${spacer8} 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right: none;
  position: absolute;
  z-index: 1060;
  width: 618px;
  height: 340px;
  top: calc(119% - 1px);
  left: 100%;
  .CalendarDay--today {
    background: ${white};
    border: 2px solid ${BorderColor};
  }
  .CalendarDay__selected,
  .CalendarDay__selected_span {
    background: ${SelectedRangeColor};
    border-color: ${BorderColor};
  }
  .CalendarDay__selected_span:hover {
    background: ${props => props.theme.colors.primaryColor};
  }
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    border-color: ${BorderColor};
  }

  .CalendarDay__selected_start,
  .CalendarDay__selected_end {
    background: ${props => props.theme.colors.primaryColor};
    border-color: ${BorderColor};
  }
  .CalendarDay__selected:hover,
  .CalendarDay__hovered,
  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span:hover {
    background: ${props => props.theme.colors.primaryColorHover};
    color: ${white};
    border-color: ${BorderColor};
  }
  .DayPickerKeyboardShortcuts_show__bottomRight:before {
    border-top: 26px solid transparent;
    border-right: 33px solid ${BorderColor};
    bottom: 0;
    right: 0;
  }
  .DayPickerKeyboardShortcuts_show__bottomRight:hover {
    border-right: 33px solid ${BorderColor};
  }
  .DayPickerKeyboardShortcuts_show__bottomRight:hover:before {
    border-right: 33px solid ${BorderColor};
  }
  .DayPicker_weekHeader_ul,
  .DayPicker_weekHeader_ul small {
    padding: 0;
  }
`;

const START_DATE = 'startDate';

export interface DatePickerWrapperProps {
  handleDatesChange: (dates: Record<string, Moment>) => void;
  startDate?: Moment | null;
  endDate?: Moment | null;
}

interface DatePickerWrapperState {
  focusedInput: FocusedInputShape;
  startDate: Moment | null;
  endDate: Moment | null;
}

export default class DatePickerWrapper extends Component<
  DatePickerWrapperProps,
  DatePickerWrapperState
> {
  state: Readonly<DatePickerWrapperState> = {
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  };

  currentDate = moment();

  constructor(props: DatePickerWrapperProps) {
    super(props);
    const { startDate, endDate } = props;
    if (startDate && endDate) {
      this.state = {
        ...this.state,
        startDate,
        endDate,
      };
    }
  }

  onFocusChange = (focusedInput: FocusedInputShape | null) => {
    this.setState({ focusedInput: !focusedInput ? START_DATE : focusedInput });
  };

  onDatesChange = (dates: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    const { startDate, endDate } = dates;
    this.setState({ startDate, endDate });
    if (startDate && endDate) {
      /*  react-dates defaults the time in moments to noon. For the sake of consistency
          with the preset dates in the dropdown, set to midnight.
      */
      this.props.handleDatesChange({
        startDate: startDate.startOf('day'),
        endDate: endDate.startOf('day'),
      });
    }
  };

  getInitialMonth = () => {
    const { startDate, endDate } = this.props;
    return startDate && endDate
      ? startDate
      : this.currentDate.clone().subtract(1, 'months');
  };

  render() {
    return (
      <StyledWrapper>
        <AnimationWrapper>
          <DayPickerRangeController
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={this.state.focusedInput}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            isOutsideRange={day => {
              // leaving this open in case we want to add a start date validation
              const mDay = moment(day);
              return mDay.isAfter(this.currentDate, 'day');
            }}
            numberOfMonths={2}
            hideKeyboardShortcutsPanel
            initialVisibleMonth={this.getInitialMonth}
            noBorder
            minimumNights={0}
            // @ts-ignore
            // maxDate is not exported as a prop on DayPickerRangeController
            // type declaration but is a valid prop
            maxDate={this.currentDate}
          />
        </AnimationWrapper>
      </StyledWrapper>
    );
  }
}
