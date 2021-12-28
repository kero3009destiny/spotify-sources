import React from 'react';
import { Link } from 'gatsby';
import { ROUTE } from '../../common/constants/routes';
import { getPathname } from '../../common/utils/getPathname';
import style from './style.module.css';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';

const MENU_ITEMS = [
  {
    path: `/${ROUTE.STORIES}`,
    title: 'Stories',
  },
  {
    path: `/${ROUTE.LISTEN}`,
    title: 'Listen',
  },
  {
    path: `/${ROUTE.TEAM}`,
    title: 'Team',
  },
  {
    path: `/${ROUTE.TOOLS}`,
    title: 'Tools',
  },
];

interface Props {
  className?: string;
  linkClassName?: string;
  linkActiveClassName?: string;
  onItemClick?: Function;
}

export const PageNavigation = ({
  className,
  linkClassName,
  linkActiveClassName,
  onItemClick,
}: Props) => (
  <nav aria-label="site navigation" className={className}>
    <ul className={`unstyled-list ${style.navigation}`}>
      {MENU_ITEMS.map(routeData => {
        let partiallyActive = true;
        let activeClassName = linkActiveClassName || style.active;
        let forcedActiveClass = '';

        if (routeData.path === `/${ROUTE.STORIES}`) {
          const pathname = getPathname();
          if (pathname) {
            // listen is nested with stories so we don't want it to partially match
            // or we'd have two active items
            if (pathname.startsWith(`/${ROUTE.LISTEN}`)) {
              partiallyActive = false;
            } else if (
              pathname.startsWith(`/${ROUTE.STORIES}`) ||
              pathname.startsWith(`/${ROUTE.ARTICLE}/`)
            ) {
              forcedActiveClass = activeClassName;
              activeClassName = '';
            }
          }
        }
        return (
          <li key={routeData.path}>
            <Link
              to={routeData.path}
              partiallyActive={partiallyActive}
              className={`${linkClassName} ${forcedActiveClass}`}
              activeClassName={activeClassName}
              onClick={() => {
                sendTrackingEvent('main-navigation', 'click', routeData.title);
                if (onItemClick) onItemClick();
              }}
            >
              <span>{routeData.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

PageNavigation.defaultProps = {
  className: '',
  linkClassName: `t-ui-2 ${style.item}`,
};
