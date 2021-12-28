import PropTypes, { any } from 'prop-types';
import React, { useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import { COMMON_LINK_PROPS } from 'constants/common-props';
import { Container } from 'utils/container';
import { useIsMounted } from 'utils/use-is-mounted';
import { ICONS } from 'constants/icons';
import { Icon, Portal } from 'components/atoms';
import { SocialIcons, LocaleSelector } from 'components/molecules';
import { colors } from 'styles/variables';
import { countries } from 'constants/countries';
import { useAppContext, ACTION_TYPES } from 'contexts/app-context';
import { useTranslation } from 'i18n/nexti18n';
import {
  eventTrack,
  FOOTER_LINK_CLICK,
  FOOTER_MENU_ITEM_CLICK,
  FOOTER_LOGO_CLICK,
  FOOTER_COUNTRY_SELECTOR_TOGGLE,
  FOOTER_COUNTRY_SELECTED,
  FOOTER_ICONS_CLICK,
} from 'utils/google-tag-manager';

import * as Styled from './Footer.styled';

/**
 * Renders the global footer component.
 * @param {Object} data The Contentful data payload.
 * @param {string} collectionName The dynamic collection name.
 * @returns {ReactElement}
 */
const Footer = ({ data, collectionName }) => {
  const { t } = useTranslation();
  const [{ locale, isModalLocaleVisible }, appDispatch] = useAppContext();
  const isMounted = useIsMounted();
  const router = useRouter();
  const [collectionsData] = get(data, `${collectionName}.items`, []);
  const linkGroups = get(collectionsData, 'linkGroupsCollection.items', []);
  const legalLinks = get(collectionsData, 'legalLinksCollection.items', []);
  const socialLinks = get(collectionsData, 'socialLinksCollection.items', []);
  const currentYear = new Date().getFullYear();
  const { text: countryName = '', flag: CountryFlag = null } = useMemo(
    () => countries.find(country => locale.includes(country.code2)),
    [locale],
  );

  const onModalLocaleDismiss = useCallback(() => {
    appDispatch({
      type: ACTION_TYPES.SET_MODAL_LOCALE_VISIBLE,
      visible: false,
    });
  }, []);

  const openModalLocale = useCallback(() => {
    appDispatch({
      type: ACTION_TYPES.SET_MODAL_LOCALE_VISIBLE,
      visible: true,
    });
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    eventTrack(FOOTER_COUNTRY_SELECTOR_TOGGLE, {
      isOpen: isModalLocaleVisible,
    });
  }, [isModalLocaleVisible]);

  const onSocialClick = useCallback(event => {
    eventTrack(FOOTER_ICONS_CLICK, { event });
  }, []);

  return (
    <Styled.Footer id="footer">
      <Container>
        <Styled.Content>
          <Styled.LogoWrapper>
            <Styled.Logo
              href="/[locale]"
              asLink={`/${locale}`}
              onClick={event => {
                eventTrack(FOOTER_LOGO_CLICK, {
                  event,
                  href: `/${locale}`,
                  path: router.asPath,
                });
              }}
            >
              <span className="sr-only">{t('spotifyAdvertising')}</span>
              <Icon name={ICONS.SPOTIFY_ADVERTISING} />
            </Styled.Logo>
          </Styled.LogoWrapper>
          <Styled.LinkCollectionContainer>
            {linkGroups.map(({ title, linksCollection: { items } }, index) => (
              <Styled.LinkCollectionItem
                index={index}
                key={kebabCase(`${title} ${index.toString()}`)}
              >
                <Styled.LinkCollectionTitle>{title}</Styled.LinkCollectionTitle>
                <Styled.LinkCollection>
                  {items &&
                    items.map(({ title: linkTitle, url }) => (
                      <Styled.LinkContainer
                        key={kebabCase(`${linkTitle} ${url}`)}
                      >
                        <Styled.Link
                          href={url}
                          asLink={url}
                          onClick={event => {
                            eventTrack(FOOTER_LINK_CLICK, {
                              event,
                              href: url,
                              columnName: title,
                            });
                          }}
                        >
                          {linkTitle}
                        </Styled.Link>
                      </Styled.LinkContainer>
                    ))}
                </Styled.LinkCollection>
              </Styled.LinkCollectionItem>
            ))}
          </Styled.LinkCollectionContainer>
          <SocialIcons
            theme="InsideFooter"
            icons={socialLinks.map(({ title, url }) => ({
              ariaLabel: title,
              name: title,
              link: url,
              color: colors.white,
              tag: 'a',
              rel: COMMON_LINK_PROPS.NO_OPENER,
              target: COMMON_LINK_PROPS.TARGET_BLANK,
            }))}
            onClick={onSocialClick}
          />
        </Styled.Content>
        <Styled.Legal>
          <Styled.LegalLinksList>
            {legalLinks.map(({ title, url }) => (
              <Styled.LegalLinkItem key={kebabCase(`${title} ${url}`)}>
                <Styled.LegalLink
                  href={url}
                  asLink={url}
                  onClick={event => {
                    eventTrack(FOOTER_MENU_ITEM_CLICK, {
                      event,
                      href: url,
                      columnName: title,
                    });
                  }}
                >
                  {title}
                </Styled.LegalLink>
              </Styled.LegalLinkItem>
            ))}
          </Styled.LegalLinksList>
          <Styled.LocaleContainer>
            <Styled.CtaLocaleSelector onClick={openModalLocale}>
              {CountryFlag && (
                <Styled.CountryFlag>
                  <CountryFlag />
                </Styled.CountryFlag>
              )}
              <Styled.CountryName>{countryName}</Styled.CountryName>
            </Styled.CtaLocaleSelector>
            <Styled.Copy>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              &copy; {currentYear} Spotify AB
            </Styled.Copy>
          </Styled.LocaleContainer>
        </Styled.Legal>
      </Container>
      <Portal>
        <Styled.ModalLocales
          visible={isModalLocaleVisible}
          onDismiss={onModalLocaleDismiss}
        >
          <LocaleSelector
            onClick={({ href, country }) => {
              eventTrack(FOOTER_COUNTRY_SELECTED, {
                href,
                country,
              });
            }}
          />
        </Styled.ModalLocales>
      </Portal>
    </Styled.Footer>
  );
};

Footer.propTypes = {
  /**
   * The Contentful data payload.
   */
  data: PropTypes.objectOf(any).isRequired,
  /**
   * The dynamic collection name.
   */
  collectionName: PropTypes.string.isRequired,
};

export default Footer;
