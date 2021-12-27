import React, { useLayoutEffect, useRef } from 'react';
import { color, Type, IconExclamationAlt, spacer12, spacer16, spacer4, spacer24 } from '@spotify-internal/encore-web';
import styled from 'styled-components';

const Error = styled.div`
  background: ${color.red100};
  border-radius: ${spacer4};
  color: ${color.white};
  padding: ${spacer12} ${spacer16};
  margin: ${spacer16};
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: ${spacer24};
  height: ${spacer24};
  margin-right: ${spacer12};
`;

type Props = {
  error: string | null;
};

export const ErrorContainer = ({ error }: Props) => {
  const myRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (error) {
      myRef.current!.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [error]);

  return (
    <>
      {error && (
        <Error ref={myRef}>
          <IconWrapper>
            <IconExclamationAlt iconSize={24} />
          </IconWrapper>
          <Type>{error}</Type>
        </Error>
      )}
    </>
  );
};
