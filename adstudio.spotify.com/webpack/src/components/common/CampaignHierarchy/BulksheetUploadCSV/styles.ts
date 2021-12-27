import styled from 'styled-components';

import {
  DialogConfirmation,
  gray85,
  spacer4,
  spacer8,
  spacer16,
  spacer24,
  spacer32,
  spacer40,
  spacer48,
  TableCell,
  TableHeaderCell,
  TableRow,
} from '@spotify-internal/encore-web';

export const ErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacer8};
  margin: ${spacer16} 0;
`;

export const ModalSection = styled.div`
  margin: ${spacer16} 0;
`;

export const StyledDialogConfirmation = styled(DialogConfirmation)`
  width: 794px;
  max-width: 80vw;
`;

export const BulksheetUploadDisplayContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  box-shadow: 0 1px 3px 0 #d9d9d9;
  padding: ${spacer16};
  border-radius: ${spacer4};
`;

export const BulksheetUploadFileMetadataContainer = styled.div`
  display: flex;
  align-items: start;
  gap: ${spacer16};
  width: 100%;
`;

export const MinWidthTableHeader = styled(TableHeaderCell)<{
  minWidth: number;
}>`
  min-width: ${props => props.minWidth}px;
`;

export const StyledTableRow = styled(TableRow)`
  &:last-of-type {
    border: 0;
  }
`;

export const ChangeLogContainer = styled.div`
  max-width: 954px;
  margin: 0 auto;
`;

export const ChangeLogHeader = styled.header`
  margin: ${spacer48} 0;
`;

export const ChangeLogSection = styled.section`
  margin: ${spacer32} 0;
  border: 1px solid ${gray85};
  border-radius: ${spacer16};
  padding: ${spacer24} ${spacer32};
`;

export const ChangeLogDialogTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  text-align: left;
`;

export const ChangeLogSectionTitle = styled.div`
  margin-bottom: ${spacer40};
`;

export const ChangeLogSectionTitleName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  gap: ${spacer4};
`;

export const ChangeLogSectionEntityLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacer4};

  svg {
    width: 14px;
  }
`;
export const ChangeLogFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacer8};
`;

export const ChangeLogUpdatedValue = styled.div`
  display: inline-block;
  padding: ${spacer8};
  border-radius: ${spacer8};
  border: 1px solid rgba(25, 230, 140, 0.5);
  background: rgba(25, 230, 140, 0.05);
`;

export const CategoryTableCell = styled(TableCell)`
  width: 250px;
`;

export const ValueTableCell = styled(TableCell)`
  width: 400px;
`;
