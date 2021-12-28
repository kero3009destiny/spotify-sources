import React, { useState, MouseEvent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Cookie from "js-cookie";
import { setFabForm } from "../../../actions/fabAction";
import { openModal } from "../../../actions/modalAction";
import { setNotification } from "../../../actions/notificationAction";

const ellipsis = require("~/static/images/icons/ellipsis.svg");
const pencil = require("~/static/images/icons/pencil.svg");
const trash = require("~/static/images/icons/trash.svg");

interface IPopupProps {
  open: boolean;
  onClick?: (event: MouseEvent) => void;
}

const StyledContainer = styled.div`
  position: relative;
`

const StyledBackdrop = styled.div<IPopupProps>`
  display: ${p => (p.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  z-index: 9001;
`;

const StyledPopup = styled.div<IPopupProps>`
  position: absolute;
  top: 70%;
  right: 10px;
  padding: 10px;
  display: ${p => (p.open ? "block" : "none")};
  border: 1px solid var(--color-GRAY-MED);
  color: var(--color-TUNDORA);
  font-weight: normal;
  background-color: white;
  z-index: 9010;

  div {
    padding: 10px;
    white-space: nowrap;

    img {
      margin-right: 10px;
    }
  }
`;

interface IEditCompanyContextMenuProps {
  id: string;
  userRoleId: number;
  isSubCompany: boolean;
  refreshCallback?: () => void
  setFabForm: typeof setFabForm;
  openModal: typeof openModal;
  setNotification: typeof setNotification;
}

const EditCompanyContextMenu = (props: IEditCompanyContextMenuProps) => {
  const [popupOpen, setpopupOpen] = useState(false);

  const handleClick = (e: MouseEvent) => {
    setpopupOpen(true);
    e.stopPropagation();
  };

  const handleClickAway = (e: MouseEvent) => {
    setpopupOpen(false);
    e.stopPropagation();
  };

  const handleClickEdit = (e: MouseEvent) => {
    props.openModal(true, "fab", props.id);
    props.setFabForm(props.isSubCompany ? "editSubCompany" : "editCompany");
    setpopupOpen(false);
    e.stopPropagation();
  };

  const handleClickDelete = (e: MouseEvent) => {
    // Ideally this would open an "Are you sure?" popup, like:
    // props.openModal(true, 'fab', props.id);
    // props.setFabForm('deleteCompany')

    e.stopPropagation();

    fetch(`/api/company/${props.id}/delete`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "CSRF-TOKEN": Cookie.get("XSRF-TOKEN")
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw "not ok";
        } else {
          return res;
        }
      })
      .then(res => res.json())
      .then(res => {
        props.setNotification({
          status: "success",
          type: "company",
          message: "Company successfully deleted."
        });
        if (typeof props.refreshCallback === 'function') {
          props.refreshCallback();
        }
      })
      .catch(err => {
        props.setNotification({
          status: "error",
          type: "company",
          message: "Could not delete company."
        });
      })
      .finally(() => {
        setpopupOpen(false);
      });
  };

  return (
    <StyledContainer>
      <span onClick={handleClick}>
        <img src={ellipsis} />
      </span>
      <StyledBackdrop open={popupOpen} onClick={handleClickAway} />
      <StyledPopup open={popupOpen} onClick={(e: any) => e.stopPropagation()}>
        <div onClick={handleClickEdit}>
          <img src={pencil} />
          Edit
        </div>
        {props.userRoleId <= 2 && (
          <div onClick={handleClickDelete}>
            <img src={trash} />
            Delete
          </div>
        )}
      </StyledPopup>
    </StyledContainer>
  );
};

const mapStateToProps = (state: any) => ({
  userRoleId: state.user.role_id
});

export default connect(
  mapStateToProps,
  { openModal, setFabForm, setNotification }
)(EditCompanyContextMenu);
