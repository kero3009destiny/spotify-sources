import React, {useEffect, useState} from 'react';
import {Banner, ButtonPrimary, FormGroup, FormInput, FormToggle} from '@spotify-internal/encore-web';
import {useDispatch, useSelector} from 'react-redux';
import {getOrganization} from '../redux/actions/organizationsActions';
import {editOrganization} from '../api/api';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';

const OrganizationEdit = (props) => {
  const dispatch = useDispatch();
  const { reset, register, handleSubmit } = useForm();
  const {uri} = useParams();

  useEffect(() => {
    dispatch(getOrganization(uri));
    reset({
      name: '',
      jiraOrgId: '',
      isAutoApproved: false,
      hasOldRequirements: false,
    });
  }, [uri]);

  const [bannerInfo, setBannerInfo] = useState({
    show: false,
    color: 'negative',
    message: '',
  });

  const onSubmit = (formData) => {
    editOrganization(
      uri,
      formData.name,
      formData.jiraOrgId,
      formData.isAutoApproved,
      formData.hasOldRequirements,
    )
      .then((response) => {
        if (response && response.status === 200) {
          setBannerInfo({
            show: true,
            message: 'Organization successfully edited!',
            color: 'positive',
          });
        }
      })
      .catch(() => {
        setBannerInfo({
          show: true,
          message: 'Failed to edit Organization',
          color: 'negative',
        });
      });
  };

  const organization = useSelector((state) => state.organization.organization) || {};
  useEffect(() => {
    reset({
      name: organization.name,
      jiraOrgId: organization.jiraOrgId,
      isAutoApproved: organization.isAutoApproved,
      hasOldRequirements: organization.hasOldRequirements,
    });
  }, [organization]);

  return (
    <div>
      <h1>Edit Organization</h1>
      {!(props.featureFlags.includes('access_management') || this.props.admin) ?
        <h2>You do not have permission to view this content</h2> :
        <div>
          {bannerInfo.show && (
            <div className={'errorBannerOrganizationEdit'}>
              <Banner colorSet={bannerInfo.color} onClose={() => setBannerInfo({show: false})}>
                {bannerInfo.message}
              </Banner>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup
              label="Name"
              withFieldset>
              <FormInput {...register('name')}/>
            </FormGroup>
            <FormGroup
              label="Jira Org ID"
              withFieldset>
              <FormInput {...register('jiraOrgId')}/>
            </FormGroup>
            <FormGroup
              label="Auto-Approved"
              withFieldset>
              <FormToggle
                {...register('isAutoApproved')}>Auto-Approved
              </FormToggle>
            </FormGroup>
            <FormGroup
              label="Old requirements"
              withFieldset>
              <FormToggle
                {...register('hasOldRequirements')}>Old requirements
              </FormToggle>
            </FormGroup>
            <ButtonPrimary type="submit">Save</ButtonPrimary>
          </form>
        </div>
      }
    </div>);
};

export default OrganizationEdit;
