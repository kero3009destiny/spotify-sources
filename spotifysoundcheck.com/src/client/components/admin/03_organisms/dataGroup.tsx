import React from 'react';
import DataRow from '../02_molecules/dataRow';
import styled from 'styled-components';
import {
  fetchSelectedAccount
} from '../../../actions/fetchSelectedAccount';
import {
  fetchSelectedCompany
} from '../../../actions/fetchSelectedCompany';
import {connect} from 'react-redux';
import { withRouter } from "react-router";

type DataRowType = {
  stats: Array<object>
  title: string
}

interface IDataGroupProps {
  data: DataRowType[]
  type: "companies" | "members"
  selectAccount: (id:number) => void
  selectCompany: (id:number) => void
  history: any
  match: any
  location: any
  filters?: any
  fieldList: string[];
  refreshCallback?: () => void
}

const StyledGroup = styled.tbody`
  cursor: pointer;
`;

const DataGroup = (props: IDataGroupProps) => {
  const createData = (data:any) => (
    data.map((d:any, i:number) => (
      <DataRow
        key={`${d.company_email}-${i}`}
        status={d.status}
        name={d.name}
        members={d.members}
        completion={d.completion}
        subCompanies={d.companies}
        company={d.company}
        companyEmail={d.company_email}
        id={d.id}
        domain={d.domain}
        filters={props.filters}
        fieldList={props.fieldList}
        clickBack={
          () => handleClick(d.id)
        }
        refreshCallback={props.refreshCallback}
      />
    ))
  );

  const handleClick = (id:number) => {
    // Null IDs are invited - but not registered - members
    if (id == null) {
      return
    }
    if (props.type === "members") {
      props.selectAccount(id);
      props.history.push("/admin/member");
    }
    if (props.type === "companies") {
      props.selectCompany(id);
      props.history.push("/admin/company");
    }
  }

  return (
    <StyledGroup>
      {props.data ? createData(props.data) : null}
    </StyledGroup>
  )
}

const mapDispatchToProp = (dispatch:any) => ({
  selectAccount: (id:number) => dispatch(fetchSelectedAccount(id)),
  selectCompany: (id:number) => dispatch(fetchSelectedCompany(id))
})


export default withRouter(
  connect(
  null,
  mapDispatchToProp
)(DataGroup));
