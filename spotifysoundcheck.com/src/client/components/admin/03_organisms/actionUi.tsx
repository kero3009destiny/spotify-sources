import React from 'react';
import Fab from '../02_molecules/fab';
import SearchButton from '../01_atoms/searchButton';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {openModal} from '../../../actions/modalAction';

interface IFabProps {
  openModal: (open:boolean, which?:string) => void
}

const StyledActionUI = styled.aside`
  position: fixed;
  top: 50px;
  right: 50px;
  z-index: 2;

  & > * + * {
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row-reverse;
    top: 30px;
    right: 30px;

    & > * + * {
      margin-top: 0;
      margin-right: 10px;
    }
  }
`;

const ActionUI = (props: IFabProps) => {
  return (
    <StyledActionUI>
      <Fab />
      {/* <SearchButton clickBack={() => props.openModal(true, 'search')}/> */}
    </StyledActionUI>
  )
}


const mapDispatchToProps = (dispatch:any) => ({
  openModal: (open:boolean, which?:string) => dispatch(openModal(open, which))
})

export default connect(
  null,
  mapDispatchToProps
)(ActionUI);
