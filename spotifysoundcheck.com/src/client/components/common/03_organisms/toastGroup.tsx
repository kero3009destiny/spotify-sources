import React, { ReactNode, useEffect, useState } from 'react';
import Toast from '../02_molecules/toast';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { hideNotification } from '../../../actions/notificationAction'
import {useInterval} from '../../../../lib/customHooks';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

type ToastData = {
  type: string
  message: string
  id: number
  show: boolean
  status: string
}

interface IToastGroupProps {
  notification: ToastData
  hideNotification: () => void
}

const StyledToastGroup = styled.div`
  position: fixed;
  top: 0;
  z-index: 9999999;
`;


const ToastGroup = (props: IToastGroupProps) => {
  const { notification } = props

  useInterval(props.hideNotification, notification.show ? 5000 : null);

  return (
    <StyledToastGroup>
      <TransitionGroup className="toasts-transitions">
        { notification.show && (
          <CSSTransition
            timeout={400}
            classNames="toast"
            key={notification.id}
          >
            <Toast
              type={notification.type}
              message={notification.message}
              ready={true}
              status={notification.status}
              hideAction={props.hideNotification}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </StyledToastGroup>
  )
}

const mapStateToProps = (state:any) => ({
  notification: state.notification
});

export default connect(
  mapStateToProps,
  { hideNotification }
)(ToastGroup);