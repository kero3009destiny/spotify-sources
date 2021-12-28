import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { copyUrlToClipboard } from '../../../common/utils/copyURLToClipboard';
import { IconClipboard } from '../ui-icons';
import buttonStyle from '../../buttons/style.module.css';
import style from './style.module.css';
import { sendTrackingEvent } from '../../../common/utils/sendTrackingEvent';
import { getPathname } from '../../../common/utils/getPathname';

const LABELS = {
  COPY: 'Copy link',
  COPIED: 'Copied!',
};

export const CopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const handleClick = useCallback(() => {
    if (inputRef.current && buttonRef.current) {
      setCopied(true);
      copyUrlToClipboard(inputRef.current, buttonRef.current);

      const pathname = getPathname();
      sendTrackingEvent('article', 'click', `Copy to Clipboard - ${pathname}`);
    }
  }, [inputRef, buttonRef, setCopied]);

  const handleLabelTransitionEnd = useCallback(
    event => {
      if (event.propertyName === 'visibility' && copied) {
        setCopied(false);
      }
    },
    [copied, setCopied]
  );

  useLayoutEffect(() => {
    const label = labelRef.current;

    if (label) {
      label.addEventListener('transitionend', handleLabelTransitionEnd);
    }

    return () => {
      if (label) {
        label.removeEventListener('transitionend', handleLabelTransitionEnd);
      }
    };
  }, [labelRef, copied]);

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        ref={buttonRef}
        aria-pressed={copied ? 'true' : 'false'}
        aria-label="Copy URL to clipboard"
        className={`hidden-without-js ${buttonStyle.buttonBig} ${style.button}`}
      >
        <span className={buttonStyle.icon}>
          <div className={buttonStyle.background} />
          <IconClipboard />
        </span>
        <span className={`t-ui-4 ${style.label}`} ref={labelRef}>
          {copied ? LABELS.COPIED : LABELS.COPY}
        </span>
      </button>
      <input
        type="text"
        value="Copied!"
        aria-label="Copy URL to clipboard"
        id="input-url"
        tabIndex={-1}
        readOnly
        aria-hidden="true"
        className={`a11y-visually-hidden ${style.input}`}
        ref={inputRef}
      />
    </div>
  );
};
