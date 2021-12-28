import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookie from "js-cookie";
import FieldGroup from '../../common/02_molecules/fieldGroup';
import FieldSelect from '../../common/01_atoms/fieldSelect';
import SpotifyCard from '../../common/02_molecules/spotifyCard';
import FormButton from '../../common/01_atoms/formButton';
import StaticField from '../../common/01_atoms/staticField';
import { connect } from 'react-redux';
import store from 'store';
import { updateSpotifyAccess } from '../../../actions/updateSpotifyUserAction';
import { setUserAccount } from '../../../actions/setUserAccountDetailsAction';
import { updateUser } from '../../../actions/updateUserAction';
import { roles } from '../../../../lib/roleLabelMap';

import PencilSVG from '../../../../static/images/icons/pencil.svg';
import FieldToggle from '../../common/01_atoms/fieldToggle';

//TODO: redux/context api gets
// user data from withAuth function or something

const StyledEditLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  span {
    width: 100%;
    background-color: var(--color-GRAY-MEDDARK);
    height: 1px;
  }
  button {
    background: none;
    display: flex;
    flex-direction: row;
    flex-wrap: none;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    padding-left: 8px;
    &:hover {
      cursor: pointer;
    }
    img {
      padding-right: 4px;
    }
  }
`;

const StyledButtonLine = styled.div`
  display: flex;
  & :first-child {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    & > * + * {
      margin-top: 10px;
    }
  }
`;

interface IUserAccountFormProps {
  data: any;
  user: any;
  single?: boolean;
  updateSpotifyAccess: (token: string) => void;
  setUserAccount: (token: string, cb: () => void) => void;
  updateUserData: (userData: UserDataType) => void;
}

const defaultFieldState: any = {
  first_name: '',
  last_name: '',
  company_email: '',
  company_name: '',
  company_title: '',
  position_name: '',
  title: '',
  state_name: '',
  country_name: '',
  spotify: {
    spotify_image: null,
    spotify_display_name: '',
    spotify_email: ''
  }
};

type RoleType = {
  role_id: number;
  title: string;
};

type UserDataType = {
  id: number;
  role_id?: number;
}

const UserAccountForm = (props: IUserAccountFormProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const isThisMyPage = props.data.uuid === props.user.user_id;
  const showDeleteButton = isThisMyPage
    || props.user.role_id <= 2
    || (props.user.company_id === props.data.company_id && props.user.role_id <= 3)

  const deleteAccount = (id: number) => {
    fetch(`/api/user/${id}/delete`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "CSRF-TOKEN": Cookie.get("XSRF-TOKEN")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (props.data.uuid === props.user.id) {
          store.remove('user');
          store.remove('tmpaccess');
          location.href = '/auth/logout';
        } else {
          location.href = '/admin/members';
        }
      })
      .catch(err => console.log('user delete failed'));
  };


  const handleSubmitForm = (event: any) => {
    event.preventDefault();

    const { id: selectedUserID } = props.data;

    const targetWhitelist = ['role_id', 'newsletter_opt_in']; // Valid targets that the users can modify
    setIsEditable(false);
    let modifiedData: UserDataType = {
      id: selectedUserID
    };
    [].forEach.call(event.target, (target: any) => {
      let targetValue = target.value
      // Checkboxes like newsletter-opt-in use "on" and "off", switch to db-friendly 0 or 1
      if (target.type === 'checkbox') {
        targetValue = target.value === 'on' ? 1 : 0;
      }

      if (targetWhitelist.indexOf(target.name) > -1) {
        modifiedData = {
          ...modifiedData,
        [target.name]: targetValue
        }
      }
    })
    props.updateUserData(modifiedData);
  };

  const userRoleSelectLabel: RoleType | undefined = roles.find(
    (role: RoleType) => role.role_id === props.data.role_id
  );

  return (
    <form action="/api/user/update" onSubmit={(event: any) => handleSubmitForm(event)}>
      <input type="hidden" name="_csrf" value={props.user.csrfToken} />
      {!props.single ? (
        <SpotifyCard
          image={props.user.image}
          displayName={props.user.displayName}
          email={props.user.email}
        />
      ) : null}
      <FieldGroup split={1} noBorder>
        <StyledEditLine>
          <span />
          <button type="button" onClick={() => setIsEditable(true)}>
            <img src={PencilSVG} alt="Pencil Icon for the Edit Button" />
            Edit
          </button>
        </StyledEditLine>
      </FieldGroup>
      <FieldGroup split={2} noBorder>
        <StaticField label="First Name" value={props.data.first_name} />
        <StaticField label="Last Name" value={props.data.last_name} />
      </FieldGroup>
      <FieldGroup split={1} noBorder>
        <StaticField label="Company" value={props.data.company_name} />
      </FieldGroup>
      <FieldGroup split={1} noBorder>
        <StaticField label="Business Email" value={props.data.company_email} />
      </FieldGroup>
      <FieldGroup split={2} noBorder>
        <StaticField label="Department" value={props.data.position_name} />
        {roles.length > 0 && (
          <FieldSelect
            label="Role"
            name="role_id"
            selectLabel={userRoleSelectLabel !== undefined ? userRoleSelectLabel.title : ''}
            data={roles
              .map((role: RoleType) => ({ id: role.role_id, name: role.title }))
              .filter((role: any) => role.id > props.user.role_id || role.id === props.user.role_id)}
            isEditable={isEditable}
          />
        )}
      </FieldGroup>
      <FieldGroup split={2} noBorder>
        <StaticField label="Country" value={props.data.country_name} />
        <StaticField label="State" value={props.data.state_name || 'N/A'} />
      </FieldGroup>

      {/* <FieldGroup split={1} noBorder>
      </FieldGroup> */}

      <FieldGroup split={1} noBorder>
        <FieldToggle
          title="Newsletter Opt In"
          type="checkbox"
          label="I want to receive updates from Spotify Soundcheck"
          value={props.data.newsletter_opt_in}
          name="newsletter_opt_in"
          isEditable={isEditable && isThisMyPage}
        />
      </FieldGroup>
      <StyledButtonLine>
        <div>
          {isEditable && (
            <FormButton
              type="submit"
              label="Save"
            />
          )}
        </div>
        <div>
          {showDeleteButton ? (
            <FormButton
              label="Delete Account"
              clickBack={() => {
                deleteAccount(props.data.uuid);
                if (props.data.uuid === props.user.user_id) {
                  store.remove('user'); // delete user cache
                  location.href = '/auth/logout'; // Finish logging out
                }
              }}
            />
          ) : null}
        </div>
      </StyledButtonLine>
    </form>
  );
};

UserAccountForm.defaultProps = {
  data: defaultFieldState
};

const mapStateToProps = (state: any) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSpotifyAccess: (token: string) => dispatch(updateSpotifyAccess(token)),
  setUserAccount: (token: string, cb: () => void) => dispatch(setUserAccount(token, cb)),
  updateUserData: (userData: UserDataType) => dispatch(updateUser(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccountForm);
