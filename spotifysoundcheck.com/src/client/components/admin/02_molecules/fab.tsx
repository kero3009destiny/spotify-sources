import React, {useState} from 'react';
import {openModal} from '../../../actions/modalAction';
import {connect} from 'react-redux';
import styled from 'styled-components';
import MenuItem from '../01_atoms/menuItem';
import {setFabForm} from '../../../actions/fabAction';
import FabButton from '../01_atoms/fabButton';
import {UILabel} from '../../../../lib/uiLabels';
const addCompanyIcon = require("~/static/images/icons/ui/company/company-add.svg");
const addSubCompanyIcon = require("~/static/images/icons/ui/subcompany/subcompany-add.svg");
const addUserIcon = require("~/static/images/icons/ui/profile/profile-add.svg");


interface IFabProps {
  openModal: (open:boolean, which?:string) => void
  setForm: (fabType:string) => void
}


interface IStyledFabMenuProps {
  open: boolean
}

const StyledFabMenu = styled.ul`
  width: 400px;
  height: auto;
  position: absolute;
  right: 0;
  top: 0;
  background: black;
  padding: 20px 20px 20px;
  opacity: ${(p: IStyledFabMenuProps) => p.open ? '1' : '0'};
  pointer-events: ${(p: IStyledFabMenuProps) => p.open ? 'auto' : 'none'};
  transition: all .4s;
  z-index: 1;
  border-radius: 10px;
  border-top-right-radius:  30px;
  li{
    list-style: none;
    margin-bottom: 30px;
    &:last-child{margin: 0;}
  }
`;

const StyleFabMenuItem = styled(MenuItem)`
  button{
    color: var(--color-SNOW);
    font-size: 1.6rem;
    font-weight: bold;
    transition: color .4s;
  }
  span{
    max-width: 20px;
  }
  svg{
    display: block;
    width: 100%;
    background: black;
  }

`

const Fab = (props: IFabProps) => {
  const [openFab, setOpenFab] = useState(false);
  return (
    <div>
      <FabButton
        toggler={openFab}
        clickBack={() => openFab ? setOpenFab(false) : setOpenFab(true)}
      />
      <StyledFabMenu open={openFab}>
        <StyleFabMenuItem
          title={`Invite ${UILabel.user.plural}`}
          icon={addUserIcon}
          clickCallback={
            () => {
              setOpenFab(false);
              props.setForm('member');
              props.openModal(true, 'fab');
            }
          }
        />
        <StyleFabMenuItem
          title={`Add ${UILabel.subCompany.singular}`}
          icon={addSubCompanyIcon}
          clickCallback={
            () => {
              setOpenFab(false);
              props.setForm('sub-company');
              props.openModal(true, 'fab');
            }
          }
        />
        <StyleFabMenuItem
          title={`Add ${UILabel.company.singular}`}
          icon={addCompanyIcon}
          clickCallback={
            () => {
              setOpenFab(false);
              props.setForm('company');
              props.openModal(true, 'fab');
            }
          }
        />
      </StyledFabMenu>
    </div>
  )
}

const mapDispatchToProps = (dispatch:any) => ({
  setForm: (fabType:string) => dispatch(setFabForm(fabType)),
  openModal: (open:boolean, which?:string) => dispatch(openModal(open, which))
})

export default connect(
  null,
  mapDispatchToProps
)(Fab);
