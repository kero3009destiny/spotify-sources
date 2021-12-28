import React from 'react';
import styled from 'styled-components';
import ReInviteLink from '../01_atoms/reInviteLink';
import EditCompanyContextMenu from '../01_atoms/editCompanyContextMenu';

interface IDataRowProps {
  members?: number;
  completion?: number;
  subCompanies?: number;
  department?: string;
  company?: string;
  companyEmail?: string;
  status?: string;
  name: string;
  id: string;
  filters?: any;
  fieldList: string[];
  clickBack?: () => void;
  refreshCallback?: () => void;
}

const StyledRow = styled.tr`
  padding: 20px;
  background: white;
  width: 100%;
  border-bottom: 1px solid var(--color-GRAY-MED);

  h2 {
    margin-bottom: 0;
  }

  &:hover {
    background: var(--color-DIRTY-SNOW);
  }
`;

const StyledRowTitle = styled.th`
  font-weight: 700;
  padding: 20px;
`;

const StyledRowCell = styled.td`
  padding: 20px;
`;

const StyledActionRowCell = styled(StyledRowCell)`
  width: 58px;
`

const StyledDataCell = styled(StyledRowCell)`
  text-align: right;
`

const StyledEmpty = styled.span`
  opacity: 0.25;
`

const getCellContent = (key: string, props: any) => {
  switch (key) {
    case 'status': return (
      <StyledRowCell key={key}>
        <span>{props.status}{props.status==='Unregistered' && ': '}</span>
        {
          props.status === 'Unregistered' &&
          <ReInviteLink companyEmail={props.companyEmail} />
        }
      </StyledRowCell>
    )
    case 'action': return (
      <StyledActionRowCell key={key}>
        <EditCompanyContextMenu
          id={props.id}
          isSubCompany={typeof props.subCompanies === 'undefined'}
          refreshCallback={props.refreshCallback}
        />
      </StyledActionRowCell>
    )
    case 'completion': return (
      <StyledDataCell key={key}>{Math.min(+props[key], 100)}%</StyledDataCell>
    )
    case 'name': return (
      <StyledRowTitle key={key}>{props[key] || <StyledEmpty>&ndash;</StyledEmpty>}</StyledRowTitle>
    )
    default: return (
      <StyledRowCell key={key}>{props[key] || <StyledEmpty>&ndash;</StyledEmpty>}</StyledRowCell>
    )
  }
}

const DataRow = (props: IDataRowProps) => {
  const clickHandler = () => {
    if (typeof props.clickBack === 'function') {
      props.clickBack();
    }
  };

  return (
    <StyledRow onClick={() => clickHandler()}>
      {
        (props.fieldList || [])
          .map(key => getCellContent(key, props))
      }
    </StyledRow>
  );
};

export default DataRow;
