import React from 'react';
import { ContentfulTeamVacancy } from '../../../typings/graphql-types';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';
import { IconArrow } from '../utilities/ui-icons';
import style from './style.module.css';

export interface Props {
  job: Omit<ContentfulTeamVacancy, 'children' | 'internal'>;
  trackingLabel: string;
}

export const JobListing = ({ job, trackingLabel }: Props) => {
  if (!job.url) return null;

  return (
    <a
      href={job.url}
      rel="noopener noreferrer"
      target="_blank"
      className={style.jobListing}
      onClick={() => {
        sendTrackingEvent(
          trackingLabel,
          'click',
          `${job.location} - ${job.title} - ${job.url}`
        );
      }}
    >
      <div className={style.header}>
        <span className={`t-ui-4 ${style.location}`}>{job.location}</span>
        <div className={style.arrow}>
          <IconArrow rotation={-135} />
        </div>
      </div>
      <span className={`t-heading-2 ${style.heading}`}>{job.title}</span>
    </a>
  );
};
