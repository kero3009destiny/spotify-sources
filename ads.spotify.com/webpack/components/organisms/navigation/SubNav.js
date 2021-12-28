import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes, { any } from 'prop-types';

import get from 'lodash/get';

import { ICONS } from 'constants/icons';
import { getLinkProps } from 'utils/get-link-props';
import { eventTrack, NAVIGATION_MENU_CLICK } from 'utils/google-tag-manager';

import { useComponentSize } from 'utils/use-component-size';
import * as Styled from './Navigation.styled';

/**
 * List with the type of components for SubNav
 */
const COMPONENTS = {
  DROPDOWN: 'Dropdown',
};

/**
 * Creates a DropdownMenu instance for SubNav
 * @param {object} item Navigation Item data
 * @param {string} locale Current Locale
 * @param {function} onClick On Click handler for links
 * @param {number} listHeight - The list height
 * @param {function} onLayout - The layout change listener
 */
const Dropdown = ({
  item,
  locale,
  onClick,
  listHeight,
  onLayout = () => {},
}) => {
  const [subNavFocused, setSubNavFocused] = useState(false);
  const navUrl =
    get(item, 'rootLink.slug', null) || get(item, 'rootLink.url', '');
  const { href, asLink } = getLinkProps(navUrl, locale);
  const containerRef = useRef(null);
  const { height } = useComponentSize(containerRef);

  const onMenuClick = useCallback(
    event => {
      eventTrack(NAVIGATION_MENU_CLICK, { event, href: asLink || href });
    },
    [href, asLink],
  );

  useEffect(() => {
    if (height !== 0 && typeof height === 'number') {
      onLayout(height);
    }
  }, [height]);

  return (
    <Styled.NavTextLinkContainer
      subNavFocused={subNavFocused}
      listHeight={listHeight}
    >
      <Styled.SubNavContainer
        subNavFocused={subNavFocused}
        setSubNavFocused={setSubNavFocused}
      >
        <Styled.NavTextLinkDrop onClick={onMenuClick}>
          {item.rootLink.title}
          <Styled.Caret name={ICONS.CARET_DOWN} />
        </Styled.NavTextLinkDrop>
        <Styled.SubNav className={subNavFocused && 'open'}>
          <ul ref={containerRef}>
            {item.subLinksCollection.items.map(({ sys, title, url }) => {
              const { href: subHref, asLink: subAsLink } = getLinkProps(url);

              return (
                <Styled.SubNavItem key={sys.id}>
                  <Styled.SubNavLink
                    onClick={event => {
                      eventTrack(NAVIGATION_MENU_CLICK, {
                        event,
                        href: subAsLink || subHref,
                      });
                      onClick(event);
                    }}
                    href={subHref}
                    asLink={subAsLink}
                  >
                    {title}
                  </Styled.SubNavLink>
                </Styled.SubNavItem>
              );
            })}
          </ul>
        </Styled.SubNav>
      </Styled.SubNavContainer>
    </Styled.NavTextLinkContainer>
  );
};

/**
 * Creates a regular navigation item instance with no dropdown for subnav
 * @param {object} item Navigation Item data
 * @param {string} locale Current Locale
 * @param {function} onClick On Click handler for links
 * @returns {ReactElement}
 */
const NavItem = ({ item, locale, onClick }) => {
  const asLink = `/${locale}/${item.slug}`;
  const onMenuClick = useCallback(
    event => {
      eventTrack(NAVIGATION_MENU_CLICK, { event, href: asLink });
      onClick(event);
    },
    [asLink],
  );

  return (
    <Styled.NavTextLinkContainer>
      <Styled.NavTextLink
        onClick={onMenuClick}
        href="/[locale]/[tag]"
        asLink={asLink}
      >
        {item.title}
      </Styled.NavTextLink>
    </Styled.NavTextLinkContainer>
  );
};

/**
 * Creates a dropdown or a Navigation Link depending on the data.
 * @param {object} item Navigation Item data
 * @param {string} locale Current Locale
 * @param {function} onClick On Click handler for links
 * @param {number} listHeight - The list height
 * @param {function} onLayout - The layout change listener
 * @returns {ReactElement}
 */
export const SubNav = ({
  item,
  locale,
  onClick,
  listHeight,
  onLayout = () => {},
}) => {
  const { type } = item;

  switch (type) {
    case COMPONENTS.DROPDOWN:
      return (
        <Dropdown
          item={item}
          locale={locale}
          onClick={onClick}
          listHeight={listHeight}
          onLayout={onLayout}
        />
      );
    default:
      return <NavItem item={item} locale={locale} onClick={onClick} />;
  }
};

SubNav.propTypes = {
  /**
   * Navigation Item data
   */
  item: PropTypes.objectOf(any).isRequired,
  /**
   * Current Locale
   */
  locale: PropTypes.string.isRequired,
  /**
   * On Click handler for links
   */
  onClick: PropTypes.func.isRequired,
};
