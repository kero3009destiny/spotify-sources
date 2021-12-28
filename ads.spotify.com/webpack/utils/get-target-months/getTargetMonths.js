import dayjs from 'dayjs';

/**
 * @param {string} timeRange A string to define time range 1-30 from Contentful
 * @returns {Array} with months position [0, 1, 2, ..., 11] regarding to timeRange
 */
const getTargetMonths = timeRange => {
  const [, start = 0, end = 0] = (timeRange || '').match(/(\d+)-(\d+)/) || [];
  const startDate = dayjs().add(start, 'month');
  const endDate = dayjs().add(end, 'month');
  const monthDiff =
    startDate.year() === endDate.year()
      ? endDate.month() - startDate.month()
      : endDate.month() + 12 - startDate.month();
  const targetMonths = [
    startDate.month(),
    ...Array.from({ length: monthDiff }).map((_, index) =>
      startDate.add(index + 1, 'month').month(),
    ),
  ];

  return targetMonths;
};

export default getTargetMonths;
