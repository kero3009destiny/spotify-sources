import React, {ReactNode, useState, useEffect} from 'react';
import styled from 'styled-components';
import {openModal} from '../../../actions/modalAction';
import {connect} from 'react-redux';

interface IModalProps {
  children?: ReactNode
  modal: any
  open: boolean
  container: boolean
  fullHeight?: boolean
  openModal: (open:boolean, which?:string) => void
}

interface ISModalProps {
  open?: boolean
  container?: boolean
  fullHeight?: boolean
}

const StyledModal = styled.div<ISModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  pointer-events: ${p => p.open ? 'auto' : 'none'};
  opacity: ${p => p.open ? '1' : '0'};
  transition: all .5s;
  overflow-y: auto;
`;

// Position: sticky instead of fixed, as the scrollbars are hidden with fixed
const StyledBackdrop = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  background: var(--color-DIRTY-SNOW);
  z-index: 0;
  position: sticky;
  top: 0;
  left: 0;
`;

const StyledModalChild = styled.div<ISModalProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, ${p => p.open ? '-50%' : '10%'});
  z-index: 1;
  width: 100%;
  max-width: 600px;
  opacity: ${p => p.open ? '1' : '0'};
  transition: all .8s cubic-bezier(.01,.7,.29,.99);
  transition-delay: .4s;
  height: ${p => p.fullHeight ? '100%' : 'auto'};
  & > div{
    background: white;
    padding: ${p => p.container ? '40px' : '0px'};
    border: ${p => p.container ? '1px solid #CBCBCB' : 'none'};
    position:relative;
    border-radius: 5px;
  }
`;

const Modal = (props: IModalProps) => {

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardControls);
    () => {
      document.removeEventListener('keydown', handleKeyboardControls);
    }
  }, []);

  // disable body scrolling while modal is open
  useEffect(() => {
    if (props.open) {
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflowY = null;
    }
  }, [props.open])

  const handleKeyboardControls = (e:any):void => {
    if (e.keyCode === 27) {
      props.openModal(false);
    }
  }

  return (
    <StyledModal open={props.open}>
      <StyledBackdrop
        onMouseDown={
          () => props.openModal(false)
        }
      />
      <StyledModalChild
        container={props.container}
        open={props.open}
        fullHeight={props.fullHeight}
      >
        <div>
          {props.children}
        </div>
      </StyledModalChild>
    </StyledModal>
  )
}

Modal.defaultProps = {
  container: true,
}

const mapDispatchToProps = (dispatch:any) => ({
  openModal: (open:boolean, which?:string) => dispatch(openModal(open, which))
});

const mapStateToProps = (state:any) => ({
  modal: state.modal
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
