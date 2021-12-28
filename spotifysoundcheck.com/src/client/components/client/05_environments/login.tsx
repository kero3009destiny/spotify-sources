import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
const queryString = require('query-string');
import store from 'store';
import Button from '../../common/01_atoms/button';
import { Heading1 } from '../01_atoms/heading';
import Modal from '../../admin/03_organisms/modal';
import Cookie from 'js-cookie';
import SignupEmailForm from '../04_ecosystem/signupEmailForm';
import {openModal} from '../../../actions/modalAction';
const speakerImage = require('~/static/images/global/img-loginspeaker.gif');

const StyledLoginContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 40px 20px 80px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-flow: column;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 24px;
    padding: 80px 20px 120px;
  }

  &:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-DODGER-BLUE);
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  ${Heading1} {
    order: 2;
    color: var(--color-SNOW);

    @media (min-width: 768px) {
      order: inherit;
      grid-column: 2 / span 9;
    }
  }
`;

const StyledCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  color: var(--color-SNOW);
  order: 3;

  @media (min-width: 768px) {
    order: inherit;
    grid-column: 2 / span 6;
  }

  p {
    position: relative;
    z-index: 2;
  }

  ${Button} {
    display: block;
    padding-top: 30px;
  }
`;

const StyledImage = styled.div`
  z-index: 0;
  order: 1;
  margin-bottom: 30px;
  text-align: right;

  img {
    max-width: 608px;
    width: 120%;
  }

  @media (min-width: 768px) {
    grid-column: 8 / span 5;
    margin-bottom: 0;
    order: inherit;
    text-align: left;

    img {
      margin-left: -75px;
    }
  }
`;

const StyledRegistrationLink = styled.span`
  display: inline-block;
  margin-left: 2em;
  a {
    color: var(--color-SNOW);
    font-weight: normal;
  }
`

interface ILoginProps {
  modal: any
  openModal: () => void
}

const Login = (props: ILoginProps) => {
  const { modal } = props
  const [queryParams, setQueryParams] = useState({ signup: false });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setQueryParams(params);
    if (params.company_id) {
      store.set('reg_company_id', params.company_id);
    }
    if (params.company_email) {
      store.set('reg_company_email', params.company_email);
    }
    if (params.company_name) {
      store.set('reg_company_name', params.company_name);
    }
    if (params.signup) {
      Cookie.set('signup', true);
      window.location.href = '/auth/spotify';
    }
    if (params.returning) {
      Cookie.set('returning', true);
      window.location.href = '/auth/spotify';
    }
    if (params.showModal) {
      props.openModal();
    }
  }, []);

  const handleClick = (e: any) => {
    props.openModal();
  }

  return (<>
    <Modal open={modal.open === true && modal.which === 'signup'}>
      <SignupEmailForm />
    </Modal>

    <StyledLoginContainer>
      <Heading1>Spotify Soundcheck</Heading1>
      <StyledCopy>
        <p>This is how we do it.</p>
        <p>
          Soundcheck will get you certified to speak fluent Spotify, so you
          can deliver more value to your clients and inspire them to connect
          with the streaming generation.
        </p>
        <p>
          Log in with your Spotify account so we can put a personal touch on
          your Soundcheck experience, and show you the power of our dataset.
        </p>
        <p>
          <small>
            Don&rsquo;t have an account? No worries — it&rsquo;s free to sign
            up! (And you can easily delete it when you&rsquo;re done with
            Soundcheck if you want.)
          </small>
        </p>
        <div>
          <Button
            href="/auth/spotify"
            label="Log In"
            variant="dark-blue"
          />
          { !Cookie.get('rememberMe') &&
            <StyledRegistrationLink onClick={handleClick}>
              <a href="#">Register for account</a>
            </StyledRegistrationLink>
          }
        </div>
      </StyledCopy>
      <StyledImage>
        <img src={speakerImage} />
      </StyledImage>
    </StyledLoginContainer>
  </>);
};

const mapStateToProps = (state: any) => ({
  modal: state.modal
})

const mapDispatchToProps = (dispatch: any) => ({
  openModal: () => dispatch(openModal(true, 'signup'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
