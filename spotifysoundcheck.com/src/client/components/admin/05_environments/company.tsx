import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  fetchSelectedCompany
} from '../../../actions/fetchSelectedCompany';
import store from 'store';
import styled from 'styled-components';
import DataGroupContainer from '../04_ecosystems/dataGroupContainer';
import {setLoadingBegin, setLoadingFinished} from '../../../actions/contentLoadingAction';
import {UILabel} from '../../../../lib/uiLabels';
import Members from './members';
import AgencyStats from '../04_ecosystems/agencyStats';

interface IMember {
  companyState: any
  selectCompany: (id:number) => void
  setLoadingBegin: () => void
  setLoadingFinished: () => void
  setNotification: (message:any) => void
}

const StyledCompany = styled.div`
  padding-top: 0px;
  & > h1{
    font-size: 4.0rem;
  }
`;

const StyledCompanyTabContent = styled.div`
  padding-top: 30px;
`;

const Company = (props: IMember) => {
  // fetch controller interrupt
  const controller = new AbortController();
  const signal = controller.signal;
  // state
  const {company_name} = props.companyState;
  const [companyData, setCompanyData] = useState([]);

  // on mount get company data
  useEffect(() => {
    if (store.get('selected_company')) {
      const companyId = store.get('selected_company').id;
      props.setLoadingBegin();
      props.selectCompany(companyId);
    }
  }, []);

  // when company data is fetch grab sub companies
  useEffect(() => {
    const {id} = props.companyState;

    fetch(`/api/companies/parent/${id}`, {signal})
    .then((res) => res.json())
    .then((data) => {
      const dataFormattted = data.map((d:any, i:number) => {
        return {
          name: `${d.company_name}`,
          ...d
        }
      });
      props.setLoadingFinished();
      setCompanyData(dataFormattted);
    })
    .catch((err) => {
      props.setLoadingFinished();
    });
    // on unmount abort fetch
    return () => {
      controller.abort();
    }
  }, [props.companyState]);

  return (
    <StyledCompany>
      {company_name.length && <h1>{company_name}</h1>}
      <AgencyStats company={props.companyState} />
      <Members companyID={props.companyState.id} />
      {
        companyData.length > 0
          ? (
            <StyledCompanyTabContent>
              <h3>{UILabel.subCompany.plural}</h3>
              <DataGroupContainer
                data={companyData}
                keys={companyData[0]}
                type="companies"
                fieldList={["name", "members", "action"]}
                defaultSortKey="name"
              />
            </StyledCompanyTabContent>
          )
          : null
      }
    </StyledCompany>
  )
}

const mapStateToProps = (state:any) => ({
  companyState: state.selectedCompany
})

const mapDispatchToProp = (dispatch:any) => ({
  selectCompany: (id:number) => dispatch(fetchSelectedCompany(id)),
  setLoadingBegin: () => dispatch(setLoadingBegin()),
  setLoadingFinished: () => dispatch(setLoadingFinished())
})

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(Company);
