import React, { useEffect, useState } from 'react';
import DataGroupContainer from '../04_ecosystems/dataGroupContainer';
import Button from '../../common/01_atoms/button';
import { setLoadingBegin, setLoadingFailed, setLoadingFinished } from '../../../actions/contentLoadingAction';
import { connect } from 'react-redux';
import Paginator from '../03_organisms/paginator';
import Filters from '../03_organisms/filters';
import { convertDataToFilters } from '../../../../lib/filterLabels';
import Cookie from 'js-cookie';

interface IMembers {
  companyID?: number;
  setLoadingBegin: () => void;
  setLoadingFailed: (error: any) => void;
  setLoadingFinished: () => void;
}

const Members = (props: IMembers) => {
  const [userData, setUserData] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ invitation_status: 'all' });
  const controller = new AbortController();
  const signal = controller.signal;
  const [pagination, setPagination] = useState({
    total: 1,
    perPage: 1,
    currentPage: 1,
    lastPage: 1,
    from: 0,
    to: 2
  });
  useEffect(() => {
    getUsersPaged(1, {});
    return () => {
      controller.abort();
    };
  }, [props.companyID]);

  useEffect(() => {
    getUsersPaged(pagination ? pagination.currentPage : 0, {});
  }, [props.companyID]);

  const filterCallback = (data: any) => {
    getUsersPaged(1, data);
  };

  const getUsersPaged = (page: number, formdata: any) => {
    props.setLoadingBegin();
    const requestURL =
      typeof props.companyID !== 'undefined'
        ? `api/users/company/${props.companyID}/${page}`
        : `/api/users/${page}`;

    return fetch(requestURL, {
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
      .then(members => {
        setPagination(members.pagination);
        const dataFormattted = members.data.map((d: any, i: number) => {
          return (d.uuid != null) ? {
            name: `${d.first_name} ${d.last_name}`,
            id: d.uuid,
            ...d,
            status: 'Active',
            department: d.position_name,
            completion: Math.floor((d.completed_lessons / d.lesson_total) * 100),
            company: d.company_name
          } :
          {
            ...d,
            name: null,
            unregistered: true,
            status: 'Unregistered',
            completion: 0,
            company: d.company_name
          };
        });
        props.setLoadingFinished();
        setUserData(dataFormattted);
      })
      .catch(err => {
        props.setLoadingFailed(err);
      });
  };

  const handlePagination = (page: number) => {
    getUsersPaged(page, {});
  };

  const getFilters = () => {
    if (typeof props.companyID !== 'undefined' && userData.length > 0) {
      return (
        <Filters filters={convertDataToFilters(userData[0])} filterBack={d => filterCallback(d)} exportType="user" />
      );
    }
    if (typeof props.companyID !== 'undefined' && userData.length <= 0) {
      return null;
    }
    if (typeof props.companyID === 'undefined') {
      return (
        <Filters filters={convertDataToFilters(userData[0])} filterBack={filterCallback} showFilters={true} activeFilters={activeFilters} setActiveFilters={setActiveFilters} exportType="user" />
      );
    }
  };

  return (
    <>
      {getFilters()}
      {userData.length > 0 && (
        <>
          <DataGroupContainer
            data={userData}
            keys={userData[0]}
            type="members"
            filters={activeFilters}
            fieldList={["name", "companyEmail", "status", "company", "completion"]}
            defaultSortKey="name"
          />
          {
            userData.length > 0 &&
            <Paginator
              currentPage={+pagination.currentPage}
              lastPage={pagination.lastPage}
              paginatingClickback={page => handlePagination(page)}
            />
          }
        </>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setLoadingBegin: () => dispatch(setLoadingBegin()),
  setLoadingFailed: (error: any) => dispatch(setLoadingFailed(error)),
  setLoadingFinished: () => dispatch(setLoadingFinished())
});

export default connect(
  null,
  mapDispatchToProps
)(Members);
