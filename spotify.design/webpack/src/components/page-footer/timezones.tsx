import React, { useEffect, useState } from 'react';
import style from './timezones.module.css';
import { padLeft } from '../../common/utils/padLeft';

interface Props {
  className?: string;
}

const TIME_ZONES = [
  {
    label: 'SE',
    subLabels: ['GBG', 'STO'],
    timeZone: 'Europe/Stockholm',
  },
  {
    label: 'UK',
    subLabels: ['LDN'],
    timeZone: 'Europe/London',
  },
  {
    label: 'US',
    subLabels: ['NY', 'BOS'],
    timeZone: 'America/New_York',
  },
];

function hours12(date: Date): number {
  return (date.getHours() + 24) % 12 || 12;
}

function formatDate(date: Date, hour12: boolean | undefined): string {
  const h = padLeft(hour12 ? hours12(date) : date.getHours());
  const m = padLeft(date.getMinutes());
  const s = padLeft(date.getSeconds());

  return `${h}:${m}:${s}`;
}

function getDates(hour12?: boolean): string[] {
  const date = new Date();

  return TIME_ZONES.map(({ timeZone }) => {
    const localisedTime = date.toLocaleString('en-US', { timeZone, hour12 });
    return formatDate(new Date(localisedTime), hour12);
  });
}

export const Timezones = ({ className }: Props) => {
  const [timeZones, setTimeZones] = useState(getDates());

  useEffect(() => {
    const shouldShow12HourClock =
      navigator.language === 'en-US' ? true : undefined;
    const interval = window.setInterval(() => {
      setTimeZones(getDates(shouldShow12HourClock));
    }, 1000);

    setTimeZones(getDates(shouldShow12HourClock));

    return () => window.clearInterval(interval);
  }, [setTimeZones]);

  return (
    <div
      className={`hidden-without-js ${style.timezones} ${className}`}
      aria-hidden="true"
    >
      {TIME_ZONES.map((timeZoneData, index) => (
        <div key={index} className={`t-subhead-2 ${style.timezone}`}>
          <span>
            <strong className="t-heading-2">{timeZoneData.label}</strong>
            {timeZoneData.subLabels &&
              timeZoneData.subLabels.map((subLabel, index) => (
                <span key={index} className={`t-subhead-3 ${style.city}`}>
                  {subLabel}
                </span>
              ))}
          </span>
          <span className={style.time}>{timeZones[index]}</span>
        </div>
      ))}
    </div>
  );
};
