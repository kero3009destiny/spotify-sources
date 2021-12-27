import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import {
  spacer16,
  spacer24,
  spacer32,
  spacer40,
  spacer64,
} from '@spotify-internal/encore-foundation/web';

import AdvertiserReview from 'components/AdvertiserReview';

export const PageContainer = styled.div`
  position: relative;
  padding: ${spacer40} ${spacer64};
  margin-top: ${spacer24};
`;

export const ContentContainer = styled.div`
  margin: 0 auto;
  max-width: calc(100% - ${parseInt(spacer64, 10) + parseInt(spacer64, 10)}px);

  // if a pageContainer appears as a descendant, change its padding
  ${PageContainer} {
    padding: ${spacer40} 0;
  }
`;

const StyledAdvertiserReview = styled(AdvertiserReview)`
  margin: ${spacer32} ${spacer64} ${spacer16};
  width: auto;
`;

export interface CatalogePageContainerProps {
  dataTestName: string;
  route: string;
}

export const CataloguePageContainer: FunctionComponent<CatalogePageContainerProps> = ({
  dataTestName,
  children,
}) => {
  return (
    <div>
      <StyledAdvertiserReview />
      <PageContainer data-test={dataTestName}>{children}</PageContainer>
    </div>
  );
};
