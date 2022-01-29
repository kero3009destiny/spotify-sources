import styled from 'styled-components';

export const resizeObserverSupported = typeof ResizeObserver !== 'undefined';

// Initially this component was doing more, changing the positioning based on whether ResizeObserver was supported.
// Things wound up simplifying a great deal, but I'll keep this root component abstraction in place, in case anything
// winds up being added to it
export const ComboboxRoot = styled.div``;
