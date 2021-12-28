import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useContext,
} from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import get from 'lodash/get';

import { Author } from 'components/molecules';
import { AuthorPropTypes } from 'components/molecules/author/Author';
import { defaultLocale } from 'i18n/config';
import { useAppContext } from 'contexts/app-context';
import { IntroContext } from 'contexts/intro-context';
import { eventTrack, CONTENT_SHARE_CLICK } from 'utils/google-tag-manager';

import * as Styled from './Byline.styled';

/**
 * Dayjs doesn't support all language/country formats, using the language alone
 * should suffice for rendering month names.
 * @param {string} locale The current app locale.
 */
const formatLocaleForDayjs = locale => `${locale.split('-').shift()}`;

/**
 * Formats a dateString from Contentful into a MONTH/YEAR format.
 * @param {string} locale The current locale.
 * @param {string} publishDate The `Publish Date` string from Contentful.
 * @returns {string} A formatted date string.
 */
const getFormattedDate = (locale, publishDate) => {
  const pubDate = dayjs(publishDate);

  return pubDate.isValid() ? pubDate.locale(locale).format('MMMM YYYY') : null;
};

/**
 * Renders a byline for the detail page.
 * @param {Object} author An author object:
 * @param {string} author.authorName The author's name.
 * @param {string} author.authorRole The author's role.
 * @param {string} publishDate The `Publish Date` string from Contentful.
 * @returns {ReactElement}
 */
const Byline = ({ author = null, publishDate }) => {
  const [appState] = useAppContext();
  const { withHeight, withIntro } = useContext(IntroContext);
  const { locale } = appState;
  const authorName = get(author, 'authorName');
  const authorRole = get(author, 'authorRole');
  const defaultDayjsLocale = formatLocaleForDayjs(defaultLocale.id);
  const dayjsLocale = formatLocaleForDayjs(locale);
  const [pubDate, setPubDate] = useState(null);
  const dayjsPromise = useMemo(() => import(`dayjs/locale/${dayjsLocale}.js`), [
    dayjsLocale,
  ]);

  useEffect(() => {
    let isSubscribed = true;

    // Import localized date data
    dayjsPromise
      .then(() => {
        if (isSubscribed) {
          setPubDate(getFormattedDate(dayjsLocale, publishDate));
        }
      })
      .catch(() => {
        // Defaults to en-US on error
        if (isSubscribed) {
          setPubDate(getFormattedDate(defaultDayjsLocale, publishDate));
        }
      });

    // Prevents promise resolver from firing on unmounted component
    return () => {
      isSubscribed = false;
    };
  }, []);

  const onSocialClick = useCallback(event => {
    eventTrack(CONTENT_SHARE_CLICK, {
      event,
      authorName,
      publishDate,
    });
  }, []);

  return (
    <Styled.Container withHeight={withHeight} withIntro={withIntro}>
      <Styled.Byline>
        {authorName && <Author name={authorName} role={authorRole} />}
        {publishDate && <Styled.PublishDate>{pubDate}</Styled.PublishDate>}
        <Styled.Social onClick={onSocialClick} />
      </Styled.Byline>
    </Styled.Container>
  );
};

Byline.propTypes = {
  /**
   * Author object: {name, role}
   */
  author: PropTypes.shape(AuthorPropTypes),
  /**
   * The `Publish Date` string from Contentful.
   */
  publishDate: PropTypes.string,
};

export default Byline;
