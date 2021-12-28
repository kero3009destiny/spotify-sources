import React, { useEffect, useState, useRef } from 'react';
import SpotifyCard from '../../common/02_molecules/spotifyCard';
import Field from '../../common/01_atoms/field';
import FieldToggle from '../../common/01_atoms/fieldToggle';
import FieldSelect from '../../common/01_atoms/fieldSelect';
import FieldGroup from '../../common/02_molecules/fieldGroup';
import styled from 'styled-components';
import FormButton from '../../common/01_atoms/formButton';
import StaticField from '../../common/01_atoms/staticField';
import { connect } from 'react-redux';
import { setNotification } from '../../../actions/notificationAction';
import { getAddressCountries, getAddressStates } from '../../../actions/getAddressAction';
import store from 'store';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';

const queryString = require('query-string');

interface IRegisterProps {
  countries: any;
  states: any;
  user: any;
  setNotification: (message: any) => void;
  getCountries: () => void;
  getStates: (num: number) => void;
}

const StyledRegistrationFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--color-DODGER-BLUE);
  padding: 0;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const StyledRegistrationForm = styled.form`
  padding: 20px;
  background: var(--color-SNOW);
  max-width: 800px;

  h1 {
    margin-bottom: 40px;
    text-transform: capitalize;
  }

  @media (min-width: 768px) {
    padding: 50px;
  }
`;

const StyledLink = styled(Link)`
  color: 'var(--color-BRAND-GREEN)';
  width: auto;
`

const defaultQueryParams = {
  spotify_id: '',
  spotify_email: '',
  spotify_image: '',
  spotify_display_name: '',
  company_id: 0,
  spotify_access_token: '',
  spotify_refresh_token: '',
  spotify_expires_in: ''
};

const defaultCompany = {
  company_name: '',
  id: 0
};

const defaultError = {
  isError: false,
  errorMessage: ''
};

const Register = (props: IRegisterProps) => {
  const [queryParams, setQueryParams] = useState(defaultQueryParams);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [states, setStates] = useState([]);
  const [showStates, setShowStates] = useState(false);
  const [localStore, setLocalStore] = useState({
    company_id: 0,
    company_email: '',
    company_name: ''
  });
  const [firstNameField, setFirstNameField] = useState('');
  const [lastNameField, setLastNameField] = useState('');
  const [positionField, setPositionField] = useState('');
  const [brandsField, setBrandsField] = useState('');
  const [departmentsField, setDepartmentsField] = useState('');
  const [locationField, setLocationField] = useState('');

  // get url params
  useEffect(() => {
    props.getCountries();
    props.getStates(240);
    setQueryParams(queryString.parse(location.search));
    if (
      store.get('reg_company_id') &&
      store.get('reg_company_email') &&
      store.get('reg_company_name')
    ) {
      setLocalStore({
        company_name: store.get('reg_company_name'),
        company_id: +store.get('reg_company_id'),
        company_email: store.get('reg_company_email')
      });
    }
  }, []);

  useEffect(() => {
    // get countries
    const countryData = props.countries.map((p: any) => {
      return { id: p.id, name: p.country_name };
    });
    setCountries(countryData);

    // get departments
    fetch('/api/company/positions')
      .then(res => res.json())
      .then(data => {
        const positionData = data.map((p: any) => {
          return { id: p.id, name: p.position_name };
        });
        setDepartment(positionData);
      });
  }, [queryParams, props.countries]);

  const getStates = (country_id: number) => {
    fetch(`/api/address/country/${country_id}/states`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-TOKEN': Cookie.get('XSRF-TOKEN')
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const stateData = data.map((p: any) => {
            return { id: p.id, name: p.state_name };
          });
          setStates(stateData);
          setShowStates(true);
        } else {
          setShowStates(false);
          setStates([]);
        }
      })
  };

  // submit user registration form
  const handleFormSubmit = (e: any) => {
    const data = new FormData(e.target);
    const jsonData: any = {};

    e.preventDefault();

    // convert form data into obj
    for (var entry of data.entries()) {
      jsonData[entry[0]] = entry[1];
    }

    // post form data
    fetch('/api/user/register', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
        'CSRF-TOKEN': Cookie.get('XSRF-TOKEN')
      }
    })
      .then((res: any) => {
        if (res.status !== 200) {
          props.setNotification({
            status: 'error',
            type: 'member',
            message: `registration error: ${res.statusText}`
          });
        }

        return res.json();
      })
      .then((data = {}) => {
        if (data.status === 401) {
          props.setNotification({
            status: 'error',
            type: 'member',
            message: `registration error: ${data.message}`
          });
        } else if (typeof data.errors !== 'undefined') {
          props.setNotification({
            status: 'error',
            type: 'member',
            message: data.errors
          });
        } else {
          if (data.status === 'success') {
            location.href = "/auth/spotify";
          }
        }
      })
      .catch(err => {
        props.setNotification({
          status: 'error',
          type: 'member',
          message: err
        });
      });
  };

  const shouldDisableButton =
    firstNameField === "" ||
    lastNameField === "" ||
    positionField === "" ||
    brandsField === "" ||
    departmentsField === "" ||
    locationField === "";

  return (
    <StyledRegistrationFormContainer>
      <StyledRegistrationForm method="post" action="/register" onSubmit={e => handleFormSubmit(e)}>
        <input type="hidden" name="_csrf" value={props.user.csrfToken} />
        <h1>Complete Your Profile</h1>
        <FieldGroup split={1} noBorder>
          <StaticField label="Company" value={localStore.company_name || ''} />
          <Field hidden value={localStore.company_id || ''} type="text" name="company_id" />
          <Field hidden value={queryParams.spotify_id || ''} type="text" name="spotify_id" />
          <Field
            hidden
            value={queryParams.spotify_access_token || ''}
            type="text"
            name="spotify_access_token"
          />
          <Field
            hidden
            value={queryParams.spotify_refresh_token || ''}
            type="text"
            name="spotify_refresh_token"
          />
          <Field
            hidden
            value={queryParams.spotify_expires_in || ''}
            type="text"
            name="spotify_expires_in"
          />
        </FieldGroup>
        <FieldGroup split={1} noBorder>
          <StaticField label="Company Email" value={localStore.company_email} />
          <Field
            label="Business Email"
            type="text"
            value={localStore.company_email}
            name="company_email"
            hidden
          />
        </FieldGroup>
        <FieldGroup split={2} noBorder>
          <Field
            label="First Name *"
            type="text"
            placeholder="First Name"
            name="first_name"
            onChange={e => setFirstNameField(e.target.value)}
          />
          <Field
            label="Last Name *"
            type="text"
            placeholder="Last Name"
            name="last_name"
            onChange={e => setLastNameField(e.target.value)}
          />
        </FieldGroup>
        <FieldGroup split={1} noBorder>
          <Field
            label="Position *"
            placeholder="Position"
            type="text"
            name="company_title"
            onChange={e => setPositionField(e.target.value)}
          />
        </FieldGroup>
        <FieldGroup split={1} noBorder>
          <Field
            label="What Brands Do You Work With? *"
            type="text"
            name="brand"
            placeholder="Old Spice, Pantene, etc."
            onChange={e => setBrandsField(e.target.value)}
          />
        </FieldGroup>
        <FieldGroup split={1} noBorder>
          <FieldSelect
            label="Departments *"
            selectLabel="Choose your department"
            data={departments}
            callback={e => setDepartmentsField(e.target.value)}
            name="position_id"
          />
        </FieldGroup>
        <FieldGroup split={1} noBorder>
          <FieldSelect
            label="Location *"
            selectLabel="Choose your location"
            data={countries}
            callback={e => {getStates(+e.target.value); setLocationField(e.target.value)}}
            name="country_id"
            separatorIndex={3}
          />
        </FieldGroup>
        <FieldGroup split={1} show={showStates}>
            <FieldSelect
              label="State"
              selectLabel="Choose your state"
              data={states}
              name="state_id"
            />
          </FieldGroup>
        <SpotifyCard
          image={queryParams.spotify_image}
          displayName={queryParams.spotify_display_name}
          email={queryParams.spotify_email}
        />
        <FieldGroup split={1}>
          <FieldToggle
            title="Newsletter"
            type="checkbox"
            label="Do you want to receive updates from Spotify Soundcheck?"
            name="newsletter_opt_in"
            isEditable
          />
        </FieldGroup>
        <FieldGroup split={0}>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '18px'
            }}
          >
            By clicking on Sign up, you agree to Spotify's Terms and Conditions of Use.
            <br />
            To learn more about how Spotify collects, uses, shares and protects your personal data
            please read{' '}
            <StyledLink to="/privacy">
              Spotify's Privacy Policy
            </StyledLink>
            .
          </p>
        </FieldGroup>
        <FormButton label="Complete Registration" disabled={shouldDisableButton} />

        <p style={{fontSize: '16px', marginTop: '20px' }}>* Required</p>
      </StyledRegistrationForm>
    </StyledRegistrationFormContainer>
  );
};

Register.defaultProps = {
  countries: [],
  states: []
};

const mapDispatchToProps = (dispatch: any) => ({
  setNotification: (message: any) => dispatch(setNotification(message)),
  getCountries: () => dispatch(getAddressCountries()),
  getStates: (num: number) => dispatch(getAddressStates(num))
});

const mapStateToProps = (state: any) => ({
  countries: state.address.countries,
  states: state.address.states,
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
