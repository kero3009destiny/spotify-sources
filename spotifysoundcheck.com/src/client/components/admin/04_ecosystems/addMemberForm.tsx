import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import FieldGroup from "../../common/02_molecules/fieldGroup";
import Field from "../../common/01_atoms/field";
import FieldSelect from "../../common/01_atoms/fieldSelect";
import FormButton from "../../common/01_atoms/formButton";
import { ExtraSmallText } from "../../common/01_atoms/text";
import {
  setLoadingBegin,
  setLoadingFinished
} from "../../../actions/contentLoadingAction";
import { connect } from "react-redux";
import { setNotification } from "../../../actions/notificationAction";
import Cookie from "js-cookie";
import { openModal } from '../../../actions/modalAction';

import ExampleCSV from '../../../../static/downloads/user_bulk_upload_example.csv';
const xIcon = require('~/static/images/icons/x.svg');

interface IAddMemberForm {
  open: boolean;
  which: string;
  setLoadingBegin: () => void;
  setLoadingFinished: () => void;
  setNotification: (message: any) => void;
  closeModal: () => void;
}

export const ReadableFileSize = (size: number) => {
  const kbSize = 1024;
  if (size < kbSize) {
    return size + 'b';
  } else if (size < kbSize * kbSize) {
    return (size / kbSize).toFixed(2) + 'kb';
  } else {
    return (size / (kbSize * kbSize)).toFixed(2) + 'mb';
  }
};

const StyledHeader = styled.h2`
  text-align: center;
  padding-top: 50px;
  padding-bottom: 10px;
`;

const StyledForm = styled.form`
  padding: 0 20px;
`;

export const StyledFileName = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: baseline;
  & p {
    word-break: break-word;
    overflow-wrap: anywhere;
  }
  & span {
    color: var(--color-GRAY-DARK);
    padding-left: 1.5rem;
    & a {
      cursor: pointer;
    }
  }
`;

export const StyledInputCaption = styled(ExtraSmallText)`
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  margin: 1em;
  & a {
    color: blue;
    text-decoration: none;
    cursor: pointer;
  }
  & > span {
    display: block;
  }
`;

export const HiddenFileField = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
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

const FormatBulkUploadResponse = (data: any) => {
  let message = '';
  if (data.error_count > 0) {
    message += `${data.error_count} emails were invalid or had other errors. `
  }
  if (data.valid_count > 0) {
    message += `${data.valid_count} emails imported.`
  }

  return message;
}

const AddMemberForm = (props: IAddMemberForm) => {
  const [companies, setCompanies] = useState([]);
  const [isFileUpload, setFileUpload] = useState(false);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvFileSize, setCsvFileSize] = useState("");
  const [showError, setShowError] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null);

  const getCompanies = () => {
    fetch("/api/companies")
      .then(res => res.json())
      .then(data => setCompanies(data));
  };

  const getCompany = async (id: string) => {
    return await fetch(`/api/company/${id}`)
      .then(res => res.json())
      .then(data => data);
  };

  const handleFormSubmit = (e:any) => {
    const data = new FormData(e.target);
    const jsonData:any = {}

    // convert form data into obj
    for(var entry of data.entries()) {
      jsonData[entry[0]] = entry[1];
    }

    getCompany(jsonData.company_id).then(data => {
      const payload = {
        company_email: jsonData.company_email,
        company_id: jsonData.company_id,
        company_name: data[0].company_name,
        _csrfToken: jsonData._csrfToken
      }

      // post form data
      props.setLoadingBegin();
      fetch("/api/email/invite", {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "CSRF-TOKEN": Cookie.get("XSRF-TOKEN")
        }
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        props.setLoadingFinished();
        if (typeof data.success !== 'undefined') {
          props.setNotification({
            status: 'success',
            type: 'profile',
            message: 'User invite sent.'
          })
          props.closeModal();
          return data
        } else {
          const {error} = data;
          props.setNotification({
            status: 'error',
            type: 'profile',
            message: error
              });
            }
          })
          .catch(err => {
            props.setLoadingFinished();
          });
      })
      .catch(err => {});

    e.preventDefault();
  };

  const handleBulkUpload = (e: any) => {
    const formData = new FormData(e.target);

    getCompany(formData.get("company_id") as string).then((data: any) => {
      formData.append("company_name", data[0].company_name);
      formData.delete("company_email");

      // post form data
      props.setLoadingBegin();
      fetch("/api/email/bulkinvite", {
        credentials: "same-origin",
        method: "POST",
        body: formData,
        headers: {
          "CSRF-TOKEN": Cookie.get("XSRF-TOKEN")
        }
      })
        .then(res => res.json())
        .then(data => {
          props.setLoadingFinished();
          if (typeof data.success !== "undefined") {
            props.setNotification({
              status: data.error_count === 0 ? "success" : "error",
              type: "profile",
              message: FormatBulkUploadResponse(data)
            });
            props.closeModal();
            return data;
          } else {
            const { error } = data;
            props.setNotification({
              status: "error",
              type: "profile",
              message: error
            });
          }
      })
        .catch(() => {
          props.setLoadingFinished();
        });
    });

    e.preventDefault();
  };

  const getCompanyMap = () => {
    return companies.map((d: any) => {
      return {
        name: d.company_name,
        id: d.id
      };
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
  };


  const updateFileLabel = (e: any) => {
    if (e.target.files.length > 0) {
      setFileUpload(true);
      setCsvFileName(e.target.files[0].name);
      setCsvFileSize(ReadableFileSize(e.target.files[0].size))
      setShowError(!e.target.files[0].name.endsWith('.csv'))
    } else {
      setFileUpload(false);
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
      setFileUpload(false);
      setCsvFileName("");
      setCsvFileSize("");
      setShowError(false);
    }
  };

  const handleCancelClick = () => {
    clearFileUpload();
    props.closeModal()
  };

  useEffect(() => {
    if (props.open === true && props.which === 'member') {
      getCompanies();
    }
  }, [props.open, props.which]);

  return (
    <StyledForm
      onSubmit={e => (isFileUpload ? handleBulkUpload(e) : handleFormSubmit(e))}
    >
      <StyledHeader>
        {isFileUpload ? 'Ready to upload' : 'All we need is an email!'}
      </StyledHeader>

      {!isFileUpload && (
          <Field
            name="company_email"
            type="text"
            placeholder="email@emailsuffix.com"
            isBordered
          />
      )}

      <HiddenFileField
        type="file"
        ref={fileInput}
        onChange={updateFileLabel}
        name="csv"
      />

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
      {isFileUpload && showError && (
        <StyledInputCaption>
          You must select a .csv formatted file to use this feature.
        </StyledInputCaption>
      )}
      {!csvFileName && (
        <StyledInputCaption>
          <span>
            or <a onClick={handleUploaderClick}>bulk upload a .csv</a>
          </span>
          <span>
            need a template? <a href={ExampleCSV}>download .csv template</a>
          </span>
        </StyledInputCaption>
      )}

      <FieldGroup split={1} noBorder>
        <FieldSelect
          selectLabel="Select Agency"
          data={getCompanyMap()}
          name="company_id"
        />
      </FieldGroup>

      <StyledButtonWrapper>
        <FormButton
          label={isFileUpload ? "Send Invites" : "Send Invite"}
          type="submit"
        />
      </StyledButtonWrapper>
      <StyledCancelButton>
        <a onClick={handleCancelClick}>
          Cancel
        </a>
      </StyledCancelButton>
    </StyledForm>
  );
};

const mapStateToProps = (state) => ({
  open: state.modal.open,
  which: state.fab.type,
})

const mapDispatchToProps = (dispatch: any) => ({
  setLoadingBegin: () => dispatch(setLoadingBegin()),
  setLoadingFinished: () => dispatch(setLoadingFinished()),
  setNotification: (message: any) => dispatch(setNotification(message)),
  closeModal: () => dispatch(openModal(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMemberForm);
