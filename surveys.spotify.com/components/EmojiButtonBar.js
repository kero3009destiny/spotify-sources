import EmojiButton from './EmojiButton';
import PropTypes from 'prop-types';
import React from 'react';

const SCALES = {
  3: ['nope', 'meh', 'love'],
  5: ['nope', 'dont-like', 'meh', 'like', 'love'],
};

const LABELS = {
  'nope': 'Never',
  'dont-like': 'Nope',
  'meh': 'Meh',
  'like': 'Like',
  'love': 'Love',
};

function ratingToScore(rating, scale) {
  if (rating === null || rating === undefined) {
    return undefined;
  }

  if (rating === 0) {
    return 0;
  } else if (scale === 5 && rating <= 0.25) {
    return 1;
  } else if (scale === 5 && rating <= 0.5) {
    return 2;
  } else if (scale === 3 && rating <= 0.5) {
    return 1;
  } else if (scale === 5 && rating <= 0.75) {
    return 3;
  } else if (scale === 5) {
    return 4;
  } else if (scale === 3) {
    return 2;
  }

  return undefined;
}

function scoreToRating(score, scale) {
  if (score === 0) {
    return 0;
  } else if (score === 1) {
    return scale === 3 ? 0.5 : 0.25;
  } else if (score === 2) {
    return scale === 3 ? 1.0 : 0.5;
  } else if (score === 3) {
    return 0.75;
  } else if (score === 4) {
    return 1.0;
  }

  return undefined;
}

function getButtonState(loading, selectedValue, currentValue) {
  if (selectedValue === currentValue) {
    return loading ? 'loading' : 'selected';
  }

  return 'idle';
}

function handleEmojiClick(onChange, indexValue, scale) {
  const rating = scoreToRating(indexValue, scale);

  if (onChange) {
    onChange({
      rating,
    });
  }
}

export default function EmojiButtonBar({
  loading = false,
  scale = 5,
  value,
  onChange,
}) {
  const indexValue = ratingToScore(value, scale);

  return (
    <div className={`emoji-button-bar emoji-button-bar--scale-${scale}`}>
      <ul>
        {SCALES[scale].map((item, index) =>
          (<li key={item}>
            <EmojiButton
              expression={item}
              buttonState={getButtonState(loading, indexValue, index)}
              onClick={handleEmojiClick.bind(undefined, onChange, index, scale)}
            />
            <span className="emoji-button-bar__label">{LABELS[item]}</span>
          </li>)
        )}
      </ul>
    </div>
  );
}

EmojiButtonBar.propTypes = {
  scale: PropTypes.oneOf([3, 5]),
  value: PropTypes.number,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};



// WEBPACK FOOTER //
// ./src/components/EmojiButtonBar.js