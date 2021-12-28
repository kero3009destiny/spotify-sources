import React, { useState, useRef, useEffect } from 'react';
import PropTypes, { any } from 'prop-types';

import { Markdown } from 'components/molecules';
import debounce from 'lodash/debounce';
import { useTranslation } from 'i18n/nexti18n';
import * as Styled from './Accordion.styled';

const RESIZE_DEBOUNCE_DELAY = 250;

/**
 * Accordion component
 * @param {Array} entries list data
 * @returns {ReactElement}
 */
const Accordion = ({ entries }) => {
  const { t } = useTranslation();
  const [activeEntries, setActiveEntries] = useState(new Set());
  const [maxHeight, setMaxHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const onResize = debounce(() => {
      if (containerRef.current) {
        const descriptionElements = containerRef.current.querySelectorAll(
          '.markdown',
        );
        const marginBottom = 16;
        const tallestHeight =
          Math.max(
            ...Array.from(descriptionElements).map(
              el => el.getBoundingClientRect().height,
            ),
          ) + marginBottom;
        setMaxHeight(tallestHeight);
      }
    }, RESIZE_DEBOUNCE_DELAY);

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      onResize.cancel();
      window.removeEventListener('resize', onResize);
    };
  }, [containerRef]);

  const toogleEntry = index => {
    setActiveEntries(
      prevActiveEntries =>
        new Set(
          prevActiveEntries.delete(index)
            ? prevActiveEntries
            : prevActiveEntries.add(index),
        ),
    );
  };

  const collapseAll = () => {
    setActiveEntries(new Set());
  };

  const expandAll = () => {
    setActiveEntries(new Set([...Array(entries.length).keys()]));
  };

  return (
    <Styled.Root
      expandAll={activeEntries.size < entries.length}
      collapseAll={activeEntries.size > 0}
    >
      <Styled.Container ref={containerRef}>
        {activeEntries.size < entries.length && (
          <Styled.ButtonAll onClick={expandAll}>
            {t('expandAll')}
          </Styled.ButtonAll>
        )}
        <Styled.Entries>
          {entries.map((entry, index) => (
            <Styled.Entry key={entry.title}>
              <Styled.Button onClick={() => toogleEntry(index)}>
                <Styled.Title active={activeEntries.has(index)}>
                  {entry.title}
                </Styled.Title>
              </Styled.Button>
              <Styled.Description
                maxHeight={maxHeight}
                active={activeEntries.has(index)}
              >
                <div className="markdown">
                  <Markdown body={entry.description} />
                </div>
              </Styled.Description>
            </Styled.Entry>
          ))}
        </Styled.Entries>
        {activeEntries.size > 0 && (
          <Styled.ButtonAll onClick={collapseAll}>
            {t('collapseAll')}
          </Styled.ButtonAll>
        )}
      </Styled.Container>
    </Styled.Root>
  );
};

Accordion.propTypes = {
  /**
   * Accordion list data
   */
  entries: PropTypes.arrayOf(any).isRequired,
};

export default Accordion;
