import React, { useState, useEffect, useMemo } from 'react';
import { orderBy } from 'lodash';
import styled from 'styled-components';
import DataGroup from '../03_organisms/dataGroup';
import { UILabel } from '../../../../lib/uiLabels';

interface IDataGroupContainer {
  data?: any;
  keys: any;
  type: string;
  filters?: any;
  fieldList: string[];
  defaultSortKey?: string;
  refreshCallback?: () => void;
}

const StyledTableContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
`

const StyledTable = styled.table`
  font-weight: 500;
  text-align: left;
  border-collapse: collapse;
  width: 100%;
`

const StyledTableHead = styled.thead`
  background: var(--color-DARKNESS);
`;

const StyledSortHeader = styled.th<{which: string}>`
  text-transform: capitalize;
  font-size: 1.4rem;
  padding: 7px 20px;
  color: var(--color-SNOW);
  cursor: pointer;
  text-align: ${props => props.which === 'completion' ? 'right' : 'inherit'};
`

interface ISortProps {
  isActive: boolean
  isDescending: boolean
}

const StyledSortArrow = styled.span<ISortProps>`
  display: ${props => props.isActive ? 'inline-block' : 'none'};
  margin-left: 0.5em;

  &::before {
    display: inline-block;
    position: relative;
    top: -1px;
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--color-SNOW);
    transform: ${props => !props.isDescending ? 'rotate(180deg)' : null};
  }
`

const DataGroupContainer = (props: IDataGroupContainer) => {
  const [sortBy, setSortBy] = useState({
    type: props.defaultSortKey || 'name',
    order: 'asc'
  });
  const [sortedData, setSortedData] = useState(props.data);

  // const isUnregisteredView = (props.filters || {}).invitation_status === 'unregistered'

  // when data changes from outside filtering, update.
  useEffect(() => {
    setSortedData(orderBy(props.data, [sortBy.type], [sortBy.order]));
  }, [props.data, sortBy.type, sortBy.order]);

  const getHeaderLabel = (d: string) => {
    switch (d) {
      case 'status': return UILabel.status.singular
      case 'completion': return `${d} %`
      case 'companies':
      case 'subCompanies':
        return UILabel.subCompany.plural
      case 'members': return UILabel.user.plural
      case 'company_email':
      case 'companyEmail':
          return UILabel.email.singular
      case 'action': return ''
      default: return d
    }
  }

  const getOrderType = (key: string) => {
    switch (key) {
      case 'companyEmail': return 'company_email'
      default: return key
    }
  }

  // on key click event toggle sort between type desc or asc
  const orderDataBy = (key: string) => () => {
    setSortBy({
      type: key,
      order: sortBy.order === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledTableHead>
          <tr>
            {
              props.fieldList
                .map(key => (
                  <StyledSortHeader
                    which={key}
                    key={key}
                    onClick={orderDataBy(getOrderType(key))}
                  >
                    <span>{getHeaderLabel(key)}</span>
                    <StyledSortArrow
                      isActive={sortBy.type === getOrderType(key)}
                      isDescending={sortBy.order === 'desc'}
                    />
                  </StyledSortHeader>
                ))
            }
          </tr>
        </StyledTableHead>

        <DataGroup
          data={sortedData}
          type={props.type}
          filters={props.filters}
          fieldList={props.fieldList}
          refreshCallback={props.refreshCallback}
        />
      </StyledTable>
    </StyledTableContainer>
  );
};

export default DataGroupContainer;
