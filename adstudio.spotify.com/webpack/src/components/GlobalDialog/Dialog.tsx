import React from 'react';
import { Link } from 'react-router';

import {
  Backdrop,
  ButtonTertiary,
  DialogAlert,
  Type,
} from '@spotify-internal/encore-web';

import { GlobalDialogState } from 'ducks/globalDialog/reducer';

import { GlobalDialogListener } from './index';

type IDialogProps = GlobalDialogState & GlobalDialogListener;

const Dialog = (props: IDialogProps) => {
  const { dismiss } = props;

  return props.visible ? (
    <Backdrop center>
      <DialogAlert
        aria-describedby="dialogBody"
        body={
          <Type id="dialogBody" as="p" condensed>
            {props.content.body}
          </Type>
        }
        footer={
          <div>
            <Link to={props.content.actionURL}>
              <ButtonTertiary
                onClick={() => dismiss()}
                buttonSize={ButtonTertiary.sm}
                color="green"
                condensed
                buttonLegacy
              >
                {props.content.actionLabel}
              </ButtonTertiary>
            </Link>
          </div>
        }
      />
    </Backdrop>
  ) : (
    <></>
  );
};
export default Dialog;
