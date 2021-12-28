import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Banner, ButtonPrimary, Type, Dropdown, DropdownTrigger, DropdownLink, DropdownList,
  StatusIndicator, FormHelpText, HorizontalRule, FormGroup, FormToggle, FormRadio } from '@spotify-internal/encore-web';
import { getConnectDevices } from '../redux/actions/connectDevicesActions';
import { createCertification } from '../api/api';
import { startCertSession } from '../redux/actions/certSessionActions';
import { getCertifications, getQuestions } from '../redux/actions/certificationsActions';
import { CERTIFICATION_STATUSES, CERTIFICATION_ACTIONS } from '../utils/Constants';

const StartNew = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConnectDevices());
    dispatch(getQuestions());
  }, []);

  const devices = useSelector((state) => state.devices.devices) || [];
  const questions = useSelector((state) => state.certifications.questions) || [];
  const [show, setShow] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('');
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    const propertyIds = Object.values(formData).filter(propertyId => !!propertyId);
    if (selectedDevice) {
      createCertification(
        selectedDevice.brand,
        selectedDevice.model,
        selectedDevice.productId,
        selectedDevice.clientId,
        selectedDevice.id,
        selectedDevice.deviceType,
        selectedDevice.esdkVersion,
        propertyIds,
      )
        .then((response) => {
          if (response && response.status === 201) {
            dispatch(startCertSession(response.data.certificationId, selectedDevice));
            dispatch(getCertifications(null, CERTIFICATION_STATUSES.TESTING, true));
            history.push({
              pathname: '/certomatostart',
              search: `?status=${CERTIFICATION_STATUSES.TESTING}`,
              state: { action: CERTIFICATION_ACTIONS.STARTED },
            });
          }
        })
        .catch(() => {
          // TODO: Get something more meaningful from the backend.
          setBannerMessage('Failed to start Certification. Make sure all values are present for the device.');
          setShowBanner(true);
        });
    }
  };

  return (
    <>
      <h1>New Certification</h1>
      <p><strong>Select device to test:</strong></p>
      <DropdownTrigger
        style={{maxWidth: 400}}
        overlay={
          show && (
            <DropdownList
              onBlur={() => setShow(false)}
              aria-activedescendant={selectedDevice?.id}
            >
              {devices.map((item) => (
                <DropdownLink
                  as="li"
                  role="option"
                  key={item.id}
                  onClick={() => setSelectedDevice(item)}
                  selected={selectedDevice?.id === item.id}
                  aria-selected={selectedDevice?.id === item.id}
                >
                  <StatusIndicator semanticColor="essentialPositive">{item.name}</StatusIndicator>
                </DropdownLink>
              ))}
              {devices.length === 0 && (
                <DropdownLink as="li">
                  No available devices
                </DropdownLink>
              )}
            </DropdownList>
          )
        }
        onShow={() => setShow(true)}
        onHide={() => setShow(false)}
      >
        <Dropdown
          id="dropdown-toggle"
          aria-labelledby="dropdown-label dropdown-toggle"
          aria-expanded={show || undefined}
        >
          { selectedDevice ? <StatusIndicator>{selectedDevice.name}</StatusIndicator> : 'Select device...' }
        </Dropdown>
      </DropdownTrigger>
      <FormHelpText>To see the device in the list, log in to the mobile/desktop Spotify app with the same account as you use for Certomato and select the device in the <a href="https://support.spotify.com/us/article/spotify-connect/" target="_blank">device picker in the Spotify app</a>.</FormHelpText>
      { selectedDevice && (
        <>
          <HorizontalRule />
          <Type as="h3" variant="heading3">
            Device: {selectedDevice.brand} {selectedDevice.model}
          </Type>
          <dl className="panel">
            {[
              { label: 'Brand', value: selectedDevice.brand },
              { label: 'Model', value: selectedDevice.model },
              { label: 'Device type', value: selectedDevice.deviceType },
              { label: 'Product ID', value: selectedDevice.productId },
              { label: 'eSDK version', value: selectedDevice.esdkVersion },
            ].map(({ label, value }) => (
              <Fragment key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </Fragment>
            ))}
          </dl>
          <form onSubmit={handleSubmit(onSubmit)}>
            {questions.map(({ id: questionId, text, options = [], multipleOptionsAllowed = true }) => (
              <FormGroup
                key={questionId}
                label={text.replace('{{brand}}', selectedDevice.brand).replace('{{model}}', selectedDevice.model)}
                withFieldset>
                {options.map(({ propertyId, label, defaultChecked }) => (
                  multipleOptionsAllowed ? (
                    <FormToggle key={propertyId} {...register(propertyId)} value={propertyId} defaultChecked={defaultChecked}>{label}</FormToggle>
                  ) : (
                    <FormRadio key={propertyId} {...register(questionId)} id={`${questionId}-${propertyId}`} value={propertyId} defaultChecked={defaultChecked}>{label}</FormRadio>
                  )
                ))}
              </FormGroup>
            ))}
            {showBanner && (
              <div className={'errorBannerCertificationCreation'}>
                <Banner colorSet="negative" onClose={() => setShowBanner(false)}>
                  {bannerMessage}
                </Banner>
              </div>
            )}
            <ButtonPrimary type="submit">Start new certification</ButtonPrimary>
          </form>
        </>
      )}
    </>
  );
};

export default StartNew;
