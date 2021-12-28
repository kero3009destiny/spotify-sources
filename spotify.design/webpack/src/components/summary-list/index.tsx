import React from 'react';
import { Link } from '../utilities/gatsby-link';
import { IconArrow } from '../utilities/ui-icons';
import buttonStyle from '../buttons/style.module.css';
import style from './style.module.css';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';

interface Props {
  heading: string;
  subheading?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  children: React.ReactNode;
  className?: string;
  trackingLabel: string;
}

export const SummaryList = ({
  heading,
  subheading,
  buttonLabel,
  buttonUrl,
  children,
  className,
  trackingLabel,
}: Props) => (
  <div className={`${style.wrapper} ${className}`}>
    <h2 className={`t-heading-1 ${style.heading}`}>{heading}</h2>
    {subheading && (
      <p className={`t-subhead-1 ${style.subhead}`}>{subheading}</p>
    )}

    <div className={style.listWrapper}>{children}</div>

    {buttonUrl && buttonLabel && (
      <Link
        className={`t-ui-4 ${buttonStyle.buttonSmall} ${style.link}`}
        to={buttonUrl}
        onClick={() =>
          sendTrackingEvent(
            trackingLabel,
            'click',
            `${heading} - ${buttonLabel}`
          )
        }
      >
        <span className={buttonStyle.label}>{buttonLabel}</span>

        <span className={buttonStyle.icon}>
          <IconArrow rotation={-90} />
        </span>
      </Link>
    )}
  </div>
);

SummaryList.defaultProps = {
  className: '',
};
