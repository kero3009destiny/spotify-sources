import React, { useMemo, useState, useCallback } from 'react';
import PropTypes, { any } from 'prop-types';

import get from 'lodash/get';

import { useImageSupport } from 'utils/use-image-support';
import { useAppContext } from 'contexts/app-context';
import { getTargetMonths } from 'utils/get-target-months';
import { getLinkProps } from 'utils/get-link-props';
import { PAGE_DETAIL_TIME_RANGE } from 'constants/page';
import { useTranslation } from 'i18n/nexti18n';
import * as Styled from './Recirculation.styled';

const IMAGE_POSITION = { x: 200, y: 150 };

/**
 * Recirculation module
 * @param {Object} data A `Recirculation Module` data object, from Contentful.
 * @param {boolean} showTitle visibility title
 * @returns {ReactElement}
 */
const Recirculation = ({ data, showTitle = false }) => {
  const { t } = useTranslation();
  const { queryUrl } = useImageSupport();
  const [{ locale }] = useAppContext();
  const sections = get(data, 'modulesCollection.items', []);
  const pages = get(data, 'pagesCollection.items', []);
  const [activeImage, setActiveImage] = useState(null);
  const [coords, setCoords] = useState(null);

  const disableImage = useCallback(() => {
    setActiveImage(null);
    setCoords(null);
  }, [coords, activeImage]);

  const sectionWithPages = useMemo(
    () =>
      sections.map(section => {
        const targetMonths = getTargetMonths(section.timeRange);

        const filteredPages = pages.filter(({ timeRange: pageTimeRange }) => {
          const month = PAGE_DETAIL_TIME_RANGE[pageTimeRange];

          return typeof month === 'number' && targetMonths.includes(month);
        });

        return { ...section, pages: filteredPages };
      }),
    [sections, pages],
  );

  const hoverImage = (e, id) => {
    setCoords({ x: e.clientX, y: e.clientY });
    setActiveImage(id);
  };

  return (
    <Styled.Root>
      <Styled.Container>
        {showTitle && <Styled.Eyebrow>{t('keepExploring')}</Styled.Eyebrow>}
        {sectionWithPages.map(section => (
          <React.Fragment key={section.title}>
            <Styled.TitleSection>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              {section.title} - {section.titleDetailText}
            </Styled.TitleSection>
            {section.pages.map(page => {
              const itemHover = useCallback(
                event => {
                  hoverImage(event, `${page.navigationTag.slug}-${page.slug}`);
                },
                [hoverImage, page],
              );

              return (
                <React.Fragment key={`${page.navigationTag.slug}-${page.slug}`}>
                  <Styled.Cta
                    onMouseMove={itemHover}
                    onMouseLeave={disableImage}
                    {...getLinkProps(
                      `/${page.navigationTag.slug}/${page.slug}`,
                      locale,
                    )}
                    type="TextLink"
                  >
                    {page.hero.title}
                  </Styled.Cta>
                  {page.hero.foregroundImage && (
                    <Styled.Image
                      active={
                        activeImage ===
                        `${page.navigationTag.slug}-${page.slug}`
                      }
                      style={{
                        top: coords
                          ? `${coords.y - IMAGE_POSITION.y}px`
                          : 'unset',
                        left: coords
                          ? `${coords.x - IMAGE_POSITION.x}px`
                          : 'unset',
                      }}
                      coords={coords}
                      data-src={page.hero.foregroundImage[queryUrl]}
                      alt={page.hero.description}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ))}
      </Styled.Container>
    </Styled.Root>
  );
};

Recirculation.propTypes = {
  /**
   * visibility title
   */
  showTitle: PropTypes.bool,
  /**
   * Recirculation data
   */
  data: PropTypes.objectOf(any).isRequired,
};

export default Recirculation;
