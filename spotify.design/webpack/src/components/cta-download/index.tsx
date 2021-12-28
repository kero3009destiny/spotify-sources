import React from 'react';
import { Link } from '../utilities/gatsby-link';
import { IconArrow } from '../utilities/ui-icons';
import style from './cta-download.module.css';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';

interface Props {
  className?: string;
  url: string;
  downloadable: boolean;
  filetype: string;
  title: string;
}
export const CTADownload = ({
  className,
  url,
  downloadable,
  filetype,
  title,
}: Props) => (
  <Link
    to={url}
    download={downloadable}
    className={`${style.resource} ${className}`}
    onClick={() => {
      if (downloadable) {
        sendTrackingEvent('article-tool', 'download', `${title} - ${url}`);
      }
    }}
  >
    <span className={style.resourceInner}>
      <span className="t-ui-4">{filetype}</span>
      <span className={`t-heading-1 ${style.title}`}>{title}</span>
    </span>
    <div className={style.resourceArrow}>
      <IconArrow rotation={-135} />
    </div>
  </Link>
);

CTADownload.defaultProps = {
  className: '',
};
