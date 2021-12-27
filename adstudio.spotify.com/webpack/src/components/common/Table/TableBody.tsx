import React, { ComponentType, FunctionComponent, ReactNode } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { spacer80 } from '@spotify-internal/encore-foundation';
import {
  semanticColors,
  TableCell,
  TableRow,
  Type,
} from '@spotify-internal/encore-web';
// TODO: check if we should move to encore loading spinner (v different)
import { LoadingSpinner } from '@spotify-internal/encore-web/advertising/components/LoadingSpinner';

import { translucentOverlay } from 'components/common/styles';

// strings
export const NO_RESULTS_FOUND = i18n.t(
  'I18N_NO_RESULTS_FOUND',
  'No results found',
);
export const NO_RESULTS_FOR_TERM = i18n.t(
  'I18N_NO_RESULTS_FOUND_FOR',
  'No results found for',
);
export const SPELLED_CORRECTLY = i18n.t(
  'I18N_PLEASE_MAKE_SURE_YOUR_WOR',
  'Please make sure your words are spelled correctly or use different search criteria.',
);
export const SPINNER_TEST_ID = 'loading-spinner';
export const SERVER_ERROR = i18n.t(
  'I18N_SOMETHING_WENT_WRONG_PLE1',
  'Something went wrong. Please try again.',
);

// styles
const Centered = styled.div`
  margin: ${spacer80} auto ${spacer80} auto;
  text-align: center;
  width: 30rem;
  margin-left: calc(50vw - 15rem);
`;

const StyledTableRow = styled(TableRow)`
  border: 0;
`;

// FIXME: the typecasting was required based on the versions of typescript and styled components (https://github.com/microsoft/TypeScript/issues/37597#). When we upgrade to styled components 5, "as TSFixMe" can be removed
const Overlay = styled(StyledTableRow as TSFixMe)`
  ${translucentOverlay}
`;

// types
interface NoResultsProps {
  searchWord?: string;
}

export interface TableBodyProps {
  isLoading: boolean;
  empty: boolean;
  searchWord?: string;
  children: ReactNode;
  NoResultsComponent?: ComponentType<{}>;
  LoadingComponent?: ComponentType<{}>;
  catalogueServerError?: boolean;
  droppableRef?: (instance: HTMLTableSectionElement) => void;
  className?: string;
}

// components
function NoResults({ searchWord }: NoResultsProps) {
  return (
    <Centered>
      {!!searchWord && (
        <>
          <Type.p
            weight={Type.bold}
            variant={Type.body1}
            semanticColor={semanticColors.textSubdued}
          >
            {NO_RESULTS_FOR_TERM} '{searchWord}'
          </Type.p>
          <Type.p
            variant={Type.body1}
            semanticColor={semanticColors.textSubdued}
          >
            {SPELLED_CORRECTLY}
          </Type.p>
        </>
      )}

      {!searchWord && (
        <Type.p
          weight={Type.bold}
          variant={Type.body1}
          semanticColor={semanticColors.textSubdued}
        >
          {NO_RESULTS_FOUND}
        </Type.p>
      )}
    </Centered>
  );
}

function ServerError() {
  return (
    <Centered>
      <Type.p
        weight={Type.bold}
        variant={Type.body1}
        semanticColor={semanticColors.textSubdued}
      >
        {SERVER_ERROR}
      </Type.p>
    </Centered>
  );
}

function DefaultLoadingComponent() {
  return (
    <Overlay>
      <Centered data-test={SPINNER_TEST_ID}>
        <LoadingSpinner />
      </Centered>
    </Overlay>
  );
}

export const TableBody: FunctionComponent<TableBodyProps> = ({
  isLoading,
  empty,
  searchWord,
  children,
  NoResultsComponent,
  catalogueServerError,
  droppableRef,
  className,
  LoadingComponent = DefaultLoadingComponent,
}) => {
  return (
    <tbody ref={droppableRef} className={className}>
      {!empty && children}

      {empty && (
        <StyledTableRow>
          <TableCell colSpan={100}>
            {empty && !catalogueServerError && NoResultsComponent && (
              <NoResultsComponent />
            )}
            {empty && !catalogueServerError && !NoResultsComponent && (
              <NoResults searchWord={searchWord} />
            )}
            {empty && catalogueServerError && <ServerError />}
          </TableCell>
        </StyledTableRow>
      )}

      {isLoading && <LoadingComponent />}
    </tbody>
  );
};
