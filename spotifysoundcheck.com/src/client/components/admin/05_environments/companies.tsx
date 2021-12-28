import React, { useState, useEffect } from 'react';
import DataGroupContainer from '../04_ecosystems/dataGroupContainer';
import { setLoadingBegin, setLoadingFailed, setLoadingFinished } from '../../../actions/contentLoadingAction';
import { connect } from 'react-redux';
import Filters from '../03_organisms/filters';
import { convertDataToFilters } from '../../../../lib/filterLabels';
import { setNotification } from '../../../actions/notificationAction';
import Cookie from 'js-cookie';

interface ICompanies {
  reloadIndex: number;
  setLoadingBegin: () => void;
  setLoadingFinished: () => void;
  setLoadingFailed: (error: any) => void;
  setNotification: (message: any) => void;
}

const Companies = (props: ICompanies) => {
  const [companyData, setCompanyData] = useState([]);
  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    fetchFilterData({});
    return () => {
      controller.abort();
    };
  }, [props.reloadIndex]);

  const filterCallback = (data: any) => {
    fetchFilterData(data);
  };

  const fetchFilterData = (formdata: any) => {
    props.setLoadingBegin();
    fetch('/api/companies/filter', {
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
        if (data.length && typeof data.errors === 'undefined') {
          const dataFormattted = data.map((d: any) => {
            return {
              name: `${d.company_name}`,
              ...d,
              completion: Math.floor(d.avg_completion)
            };
          });
          setCompanyData(dataFormattted);
        } else {
          props.setNotification({
            status: 'error',
            type: 'company',
            message: data.errors
          });
          setCompanyData([]);
        }
        props.setLoadingFinished();
      })
      .catch(err => {
        props.setLoadingFailed(err);
      });
  };

  const refreshCallback = () => fetchFilterData({});

  return (
    <>
      <Filters
        filters={convertDataToFilters(companyData[0])}
        filterBack={d => {
          filterCallback(d);
        }}
      />
      <DataGroupContainer
        data={companyData}
        keys={companyData[0]}
        type="companies"
        fieldList={["name", "members", "subCompanies", "completion", "action"]}
        defaultSortKey="name"
        refreshCallback={refreshCallback}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  reloadIndex: state.reloadIndex
});

const mapDispatchToProps = (dispatch: any) => ({
  setLoadingBegin: () => dispatch(setLoadingBegin()),
  setLoadingFinished: () => dispatch(setLoadingFinished()),
  setLoadingFailed: (error: any) => dispatch(setLoadingFailed(error)),
  setNotification: (message: any) => dispatch(setNotification(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Companies));
