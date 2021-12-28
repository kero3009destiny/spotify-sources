import React, {useEffect, ReactNode} from 'react';
import AdminNavigation from '../../admin/04_ecosystems/adminNavigation';
import styled from 'styled-components';
import Modal from '../../admin/03_organisms/modal';
import AddCompanyForm from '../../admin/04_ecosystems/addCompanyForm';
import AddMemberForm from '../../admin/04_ecosystems/addMemberForm';
import {connect} from 'react-redux';
import ActionUI from '../../admin/03_organisms/actionUi';
import Search from '../../admin/03_organisms/search';
import Throbber from '../01_atoms/throbber';
import MobileBlocker from '../01_atoms/mobileBlocker';

const StyledAdminLayout = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledAdminComponent = styled.section`
  flex-grow: 1;
  padding: 100px 30px 50px;
  max-width: 1600px;

  @media (min-width: 768px) {
    padding: 120px 50px 60px 50px;
  }

  @media (min-width: 1280px) {
    padding: 60px 150px 60px 50px;
  }
`;

interface IModalProps {
  loading: boolean
  modal?: any
  fab?: any
  user: any
  displayOnMobile?: boolean
  children?: ReactNode
}

const AdminLayout = (props: IModalProps) => {
  const {modal, fab, displayOnMobile} = props;
  const openFab = modal.open === true && modal.which === 'fab';
  const openSearch = modal.open === true && modal.which === 'search';
  const getFabForm = (type:string) => {
    switch(type) {
      case 'editCompany':
      case 'company':
        return (<AddCompanyForm />);
        break;
      case 'editSubCompany':
      case 'sub-company':
        return (<AddCompanyForm subcompany />);
        break;
      case 'member':
        return (<AddMemberForm />);
        break;
      default:
        return null;
    }
  }

  return (
    <MobileBlocker forceDisplay={displayOnMobile}>
      {props.loading && <Throbber />}
      <Modal open={openFab} container>
        {getFabForm(fab.type)}
      </Modal>
      {/* <Modal
        open={openSearch}
        container={false}
        fullHeight
      >
        <Search
          focusField={openSearch}
          open={openSearch}
        />
      </Modal> */}

      <StyledAdminLayout>
        <AdminNavigation role={props.user.role_id}/>
        {props.user.role_id < 4 && <ActionUI />}
        <StyledAdminComponent>
          {props.children}
        </StyledAdminComponent>
      </StyledAdminLayout>
    </MobileBlocker>
  );
}

const mapStateToProps = (state:any) => ({
  loading: state.contentLoading.loading,
  fab: state.fab,
  modal: state.modal,
  user: state.user
});

export default connect(
  mapStateToProps
)(AdminLayout);
