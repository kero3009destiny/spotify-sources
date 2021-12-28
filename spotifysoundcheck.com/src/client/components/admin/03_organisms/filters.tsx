import React, { useRef, useState, useEffect } from 'react';
import _filter from 'lodash/filter';
import Button from '../01_atoms/button';
import FilterField from '../01_atoms/filterField';
import styled from 'styled-components';
import { isEqual } from 'lodash'

type Filters = {
  label: string,
  name: string
  type: string,
  values?: number[]
}

interface IFilters {
  showFilters?: boolean
  activeFilters?: any
  setActiveFilters?: (data:any) => void
  filterBack?: (data:any) => void
  filters: Filters[] | null
  exportType?: 'company' | 'sub' | 'user'
}
const StyledFiltersContainer = styled.div`
  position: relative;
`;

const StyledButtonContainer = styled.div`
  text-align: right;
`;

interface IStyledFilters {
  show: boolean
}

const StyledFilters = styled.div`
  background: var(--color-DARKNESS);
  padding: 40px 30px;
  border-radius: 10px;
  border-top-left-radius: 30px;
  max-width: 400px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(p:IStyledFilters) => p.show ? '1' : '0'};
  pointer-events: ${(p:IStyledFilters) => p.show ? 'auto' : 'none'};
  transition: all .2s;
`;

const StyledButtonUI = styled.div`
  display: flex;
  justify-content:space-between;
  margin-bottom: 30px;
`;

const StyledFilterButton = styled(Button)`
  background: var(--color-DIRTY-SNOW);
  color: var(--color-DARKNESS);
`;

const StyledFilterContainer = styled.div`
  a {
    margin-right: 1em;
    padding-bottom: 6px;
    cursor: pointer;
    transition: all .2s;
  }
  a.active {
    border-bottom: 3px solid var(--color-DARKNESS);
  }
  a.inactive {
    color: var(--color-GRAY-DARK);
  }
`;

const StyledFiltersSave = styled(Button)`
  background: var(--color-BRAND-GREEN);
`;

const Filters = (props: IFilters) => {
  const { activeFilters, setActiveFilters } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [propsFilters, setPropsFilters] = useState([{},{}]);

  const submitHandler = (e:any) => {
    setShowFilters(false);
    const formData = new FormData(e.target);
    let tempObj:any = {};
    for(let formEntry of formData.entries()) {
      if (formEntry[1]) {
        tempObj[formEntry[0]] = formEntry[1];
      }
    }
    if(typeof props.filterBack === 'function'){
      props.filterBack(tempObj);
      e.preventDefault();
    }
  }

  const clickHandler = (filter: any) => {
    if(typeof props.filterBack === 'function') {
      const newFilters = { ...activeFilters, ...filter };
      if (isEqual(newFilters, activeFilters)) {
        return
      }
      if (typeof setActiveFilters === 'function') {
        setActiveFilters(newFilters);
      }
      props.filterBack(newFilters);
    }
  }

  useEffect(() => {
    if(props.filters) {
      setPropsFilters(props.filters || []);
    }
  }, [props.filters])

  const createFilters = () => {
    if (props.filters) {
      return props.filters.map((d:any, i:number) => {
        return (
          <FilterField
            label={d.label}
            name={d.name}
            key={i}
            type={d.type}
          />
        )
      });
    } else {
      return propsFilters.map((d:any, i:number) => {
        return (
          <FilterField
            label={d.label}
            name={d.name}
            key={i}
            type={d.type}
          />
        )
      });
    }
  }

  const clearForm = () => {
    // @ts-ignore
    const formFields = formRef.current.querySelectorAll('input');
    for(var i = 0; i < formFields.length; i++) {
      formFields[i].value = '';
    }
  }

  const toggleFilters = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }

  const exportLink = () => {
    switch (props.exportType) {
      case 'user':
        return '/api/users/export';
      case 'sub':
        return '/api/companies/sub/export';
      case 'company':
      default:
        return '/api/companies/export';
    }
  }

  return (
    <StyledFiltersContainer>
      <StyledButtonUI>
        {/* Filters do not work at the moment, so these are temporarily hidden */}
        {/* <StyledFilterButton
          label="Filters"
          link="/toggle-filters"
          file={false}
          clickBack={() => toggleFilters()}
        /> */}
        {props.showFilters ? (
          <StyledFilterContainer>
            <a
              className={activeFilters.invitation_status === 'all' ? 'active' : 'inactive'}
              onClick={() => {clickHandler({ invitation_status: 'all' })}}
            >
              All
            </a>
            <a
              className={activeFilters.invitation_status === 'registered' ? 'active' : 'inactive'}
              onClick={() => {clickHandler({ invitation_status: 'registered' })}}
            >
              Registered
            </a>
            <a
              className={activeFilters.invitation_status === 'unregistered' ? 'active' : 'inactive'}
              onClick={() => {clickHandler({ invitation_status: 'unregistered' })}}
            >
              Invited
            </a>
          </StyledFilterContainer>
        ) : (<div />)}
        <Button
          link={exportLink()}
          label="Download Data"
          file
        />
      </StyledButtonUI>

      {/* <StyledFilters show={showFilters}>
        <form
          onSubmit={(e) => submitHandler(e)}
          ref={formRef}
        >
          {createFilters()}
          <StyledButtonContainer>
            <Button
              label="Clear"
              link="/clear"
              file={false}
              clickBack={() => clearForm()}
            />
            <StyledFiltersSave
              label="Save"
              link="/save"
              file={false}
              submit
            />
          </StyledButtonContainer>
        </form>
      </StyledFilters> */}
    </StyledFiltersContainer>
  )
}


export default Filters;
