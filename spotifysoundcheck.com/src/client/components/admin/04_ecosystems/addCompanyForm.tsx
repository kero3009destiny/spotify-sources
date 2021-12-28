import React, { useEffect, useState, useRef } from 'react';
import FieldGroup from '../../common/02_molecules/fieldGroup';
import Field from '../../common/01_atoms/field';
import FormButton from '../../common/01_atoms/formButton';
import FieldSelect from '../../common/01_atoms/fieldSelect';
import {setLoadingBegin, setLoadingFinished} from '../../../actions/contentLoadingAction';
import {connect} from 'react-redux';
import styled from "styled-components";
import { withRouter } from 'react-router';
import {setNotification} from '../../../actions/notificationAction';
import { openModal } from '../../../actions/modalAction';
import { forceReload } from '../../../actions/forceReloadAction';
import {UILabel} from '../../../../lib/uiLabels';
import Cookie from 'js-cookie';
import { ExtraSmallText } from "../../common/01_atoms/text";
import { ReadableFileSize, StyledInputCaption, HiddenFileField, StyledFileName } from './addMemberForm';
import ExampleCSV from '../../../../static/downloads/agency_bulk_upload_example.csv';
const xIcon = require('~/static/images/icons/x.svg');

interface IAddCompanyFormProps {
  subcompany?: boolean
  setLoadingBegin: () => void
  setLoadingFinished: () => void
  setNotification: (message:any) => void
  forceReload: () => void
  history: any
  fab: any
  modal: any
  closeModal: () => void
  csrfToken: string
}

const StyledHeader = styled.h2`
  text-align: center;
  padding-top: 50px;
  padding-bottom: 10px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  & button {
    background-color: var(--color-BRAND-GREEN);
    border: 0;
  }
`;

const StyledCancelButton = styled(ExtraSmallText)`
  text-align: center;
  margin-top: 16px;
  a {
    color: var(--color-GRAY-DARK);
    text-decoration: underline;
    font-weight: normal;
    cursor: pointer;
  }
`;

const AddCompanyForm = (props: IAddCompanyFormProps) => {
  const [companies, setCompanies] = useState([]);
  const isEditing = props.fab.type === 'editCompany' || props.fab.type === 'editSubCompany';
  const [isFileUploadMode, setFileUploadMode] = useState(false);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvFileSize, setCsvFileSize] = useState("");
  const [showError, setShowError] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null);

  let endpoint = '/api/company/create'
  if (isEditing) {
    endpoint = `/api/company/${props.modal.id}`
  }

  const getCompanies = () => {
    fetch('/api/companies')
    .then((res) => res.json())
    .then((data) => setCompanies(data))
  }

  const handleFormSubmit = (e:any) => {
    const data = new FormData(e.target);
    const jsonData:any = {}

    // convert form data into obj
    for(var entry of data.entries()) {
      jsonData[entry[0]] = entry[1];
    }

    // post form data
    props.setLoadingBegin();
    fetch(endpoint, {
      credentials: 'same-origin',
      method: isEditing ? 'PUT' : 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json",
        "CSRF-TOKEN": Cookie.get('XSRF-TOKEN')
      },
    })
    .then((res) => res.json())
    .then((data) => {
      props.setLoadingFinished();
      if (typeof data.success !== 'undefined') {
        props.setNotification({
          status: 'success',
          type: 'company',
          message: `${props.subcompany ? UILabel.subCompany.singular : UILabel.company.singular} successfully ${isEditing ? 'saved' : 'created'}.`
        })
        if (isEditing) {
          props.closeModal();
        }
        props.forceReload();
        return data;
      } else {
        const {error} = data;
        props.setNotification({
          status: 'error',
          type: 'company',
          message: error
        })
      }
    })
    .catch((err) => {
      props.setLoadingFinished();
      console.error(err);
    });
    e.preventDefault();
  }

  const updateFileLabel = (e: any) => {
    if (e.target.files.length > 0) {
      setFileUploadMode(true);
      setCsvFileName(e.target.files[0].name);
      setCsvFileSize(ReadableFileSize(e.target.files[0].size))
      setShowError(!e.target.files[0].name.endsWith('.csv'))
    } else {
      setFileUploadMode(false);
      setCsvFileName("");
      setCsvFileSize("");
      setShowError(false);
    }
  };

  const handleUploaderClick = () => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  const clearFileUpload = () => {
    if (fileInput.current != null) {
      fileInput.current.value = "";
      setFileUploadMode(false);
      setCsvFileName("");
      setCsvFileSize("");
      setShowError(false);
    }
  };

  const handleCancelClick = () => {
    clearFileUpload();
    props.closeModal()
  };

  // format company data for select
  const getCompanyMap = () => {
    return companies.map((d:any) => {
      return {
        name: d.company_name,
        id: d.id
      }
    }).sort((a, b) => {
      const A = a.name.toUpperCase();
      const B = b.name.toUpperCase();
      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  useEffect(() => {
    if(props.modal.open === true && props.fab.type === 'sub-company') {
      getCompanies();
    }
  }, [props.modal, props.fab]);

  useEffect(() => {
    if (isEditing && props.modal.open) {
      fetch(`/api/company/${props.modal.id}`, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "CSRF-TOKEN": Cookie.get('XSRF-TOKEN')
        },
      })
      .then((res) => res.json())
      .then((data) => {
        document.getElementsByName('company_name')[0].value = data[0].company_name
        document.getElementsByName('domain')[0].value = data[0].domain
      })
    }
  }, [props.modal])

  const handleBulkUpload = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Short-circuit if no holding company is selected
    if (formData.get('parent_id') === "0") {
      props.setNotification({
        status: "error",
        type: "company",
        message: "You must select a holding company to bulk upload agencies."
      });
      return;
    }

    props.setLoadingBegin();
    fetch("/api/company/bulkupload", {
      credentials: "same-origin",
      method: "POST",
      body: formData,
      headers: {
        "CSRF-TOKEN": Cookie.get("XSRF-TOKEN")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data.success !== "undefined") {
          const { updated, new: newDomains, invalidDomains } = data;
          let message = `Successfully updated ${updated} and created ${newDomains} companies.`;
          if (parseInt(invalidDomains) > 0) {
            message += ` ${invalidDomains} companies had invalid domains specified, so these domains were set as blank.`
          }
          props.setNotification({
            status: "success",
            type: "company",
            message
          });
          props.forceReload();
          props.history.push("/admin/agencies");
        }
      })
      .finally(() => {
        props.setLoadingFinished();
      });
  };

  return (
    <form
      onSubmit={e => (isFileUploadMode ? handleBulkUpload(e) : handleFormSubmit(e))}
    >
      <input type="hidden" name="_csrf" value={props.csrfToken} />

      <HiddenFileField
        type="file"
        ref={fileInput}
        onChange={updateFileLabel}
        name="csv"
      />

      <StyledHeader>
        {isEditing ? 'Edit ' : `Create ${props.subcompany ? 'an' : 'a'} `}
        {props.subcompany ? UILabel.subCompany.singular : UILabel.company.singular}
      </StyledHeader>

      {props.subcompany && !isEditing ? (
        <FieldGroup split={1} noBorder>
          <FieldSelect
            selectLabel="Company"
            label={`Select ${UILabel.company.singular}`}
            data={getCompanyMap()}
            name="parent_id"
          />
        </FieldGroup>
      ) : null}

      {csvFileName && (
        <StyledFileName>
          <p>Selected: {csvFileName}</p>
          <span>
            {csvFileSize}
            <a onClick={clearFileUpload}>
              <img src={xIcon} alt="Remove this file" />
            </a>
          </span>
        </StyledFileName>
      )}

      {isFileUploadMode && showError && (
        <StyledInputCaption>
          You must select a .csv formatted file to use this feature.
        </StyledInputCaption>
      )}

      {!isFileUploadMode && (<>
        <FieldGroup split={1} noBorder>
          <Field
            label="Company Name"
            name="company_name"
            type="text"
            isBordered
            />
        </FieldGroup>
        <FieldGroup split={1} noBorder>
          <Field
            label='Company Domain (ex. "agency.com")'
            placeholder="YourCompany.com"
            name="domain"
            type="text"
            isBordered
            />
        </FieldGroup>

        {!isEditing && (
            <StyledInputCaption>
              <span>
                or <a onClick={handleUploaderClick}>bulk upload a .csv</a>
              </span>
              <span>
                need a template? <a href={ExampleCSV}>download .csv template</a>
              </span>
            </StyledInputCaption>
        )}
       </>)}

      <StyledButtonWrapper>
        <FormButton label={`${isEditing ? 'Edit' : 'Add'} ${props.subcompany ? UILabel.subCompany.singular : UILabel.company.singular}`} type="submit" />
      </StyledButtonWrapper>
      <StyledCancelButton>
        <a onClick={handleCancelClick}>
          Cancel
        </a>
      </StyledCancelButton>
    </form>
  )
}

const mapDispatchToProps = (dispatch:any) => ({
  setLoadingBegin: () => dispatch(setLoadingBegin()),
  setLoadingFinished: () => dispatch(setLoadingFinished()),
  setNotification: (message:any) => dispatch(setNotification(message)),
  closeModal: () => dispatch(openModal(false)),
  forceReload: () => dispatch(forceReload())
})

const mapStateToProps = (state: any) => ({
  fab: state.fab,
  modal: state.modal,
  csrfToken: state.user.csrfToken
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCompanyForm));
