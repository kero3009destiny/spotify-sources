import React, { useState, useEffect } from 'react';
import DataGroupContainer from '../04_ecosystems/dataGroupContainer';
import Button from '../../common/01_atoms/button';
import { setLoadingBegin, setLoadingFailed, setLoadingFinished } from '../../../actions/contentLoadingAction';
import { connect } from 'react-redux';
import Filters from '../03_organisms/filters';
import { convertDataToFilters } from '../../../../lib/filterLabels';
import Cookie from 'js-cookie';

interface ISubCompanies {
  reloadIndex: number
  setLoadingBegin: () => void;
  setLoadingFailed: (error: any) => void;
  setLoadingFinished: () => void;
}

const SubCompanies = (props: ISubCompanies) => {
  const [companyData, setCompanyData] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    fetchSubCompanies({});
  }, [props.reloadIndex]);

  const filterCallback = (data: any) => {
    fetchSubCompanies(data);
  };

  useEffect(() => {
    fetchSubCompanies({});
    return () => {
      controller.abort();
    };
  }, []);

  const fetchSubCompanies = (formdata: any) => {
    props.setLoadingBegin();
    fetch('/api/companies/sub', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: { 'Content-Type': 'application/json', 'CSRF-TOKEN': Cookie.get('XSRF-TOKEN') },
      signal: signal
    })
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json()
    })
      .then(data => {
        props.setLoadingFinished();
        setCompanyData(data);
      })
      .catch(err => {
        props.setLoadingFailed(err);
      });
  };

  const SubCompanyGroups = () => {
    if (companyData.length) {
      return companyData.map((d: any, i: number) => {
        return (
          <div key={i}>
            <h1>{d.parentComopany}</h1>
            <DataGroupContainer
              data={d.subCompanies.map((company: any) => ({ name: company.title, ...company }))}
              keys={d.subCompanies[0]}
              type="companies"
              fieldList={["name", "members", "domain", "completion", "action"]}
              defaultSortKey="name"
            />
          </div>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <>
      <Filters
        filters={convertDataToFilters({
          company_name: 'Example Company',
          members: 0,
          completion: ''
        })}
        filterBack={d => filterCallback(d)}
        exportType='sub'
      />
      {SubCompanyGroups()}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  reloadIndex: state.reloadIndex
});

const mapDispatchToProps = (dispatch: any) => ({
  setLoadingBegin: () => dispatch(setLoadingBegin()),
  setLoadingFailed: (error: any) => dispatch(setLoadingFailed(error)),
  setLoadingFinished: () => dispatch(setLoadingFinished())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCompanies);
