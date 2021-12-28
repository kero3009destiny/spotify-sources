import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownLink, DropdownList, StatusIndicator } from '@spotify-internal/encore-web';
import { useDispatch, useSelector } from 'react-redux';
import { CERTIFICATION_FILTERS, CERTIFICATION_STATUSES } from '../utils/Constants';
import { getCertifications } from '../redux/actions/certificationsActions';
import { startCertSession, clearCertSession } from '../redux/actions/certSessionActions';
import { getCertificationsByStatus } from '../redux/selectors/certificationsSelectors';


const SelectCertification = () => {
  const activeCertSession = useSelector((state) => state.certSession.certSession);
  const devices = useSelector((state) => state.devices.devices) || [];
  const items = useSelector((state) => getCertificationsByStatus(state, CERTIFICATION_FILTERS.TESTING_CURRENT_USER));
  const [show, setShow] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCertifications(null, CERTIFICATION_STATUSES.TESTING, true));
  }, []);

  useEffect(() => {
    if (activeCertSession && items.length > 0 && devices.length > 0) {
      const activeCertificationIndex = items.findIndex(item => item.certificationId === activeCertSession.sessionId);
      if (activeCertificationIndex >= 0) {
        if (devices.some(device => device.id === items[activeCertificationIndex].deviceId)) {
          setSelectedItemIndex(activeCertificationIndex);
        } else {
          dispatch(clearCertSession()); // Remove from local storage if the device is not available
        }
      }
    }
  }, [activeCertSession, items, devices]);

  const handleOnSelect = (index) => {
    setSelectedItemIndex(index);
    const certification = items[index];
    dispatch(startCertSession(certification.certificationId, devices.find(device => device.id === certification.deviceId)));
  };

  return items.length > 0 && devices.length > 0 &&
    <DropdownTrigger
      overlay={
        show && (
          <DropdownList
            onBlur={() => setShow(false)}
            aria-activedescendant={selectedItemIndex >= 0 && items[selectedItemIndex].certificationId}
          >
            {items.map((item, index) => {
              const isSelected = selectedItemIndex >= 0 && items[selectedItemIndex].certificationId === item.certificationId;
              const isOnline = devices.some(device => device.id === item.deviceId);
              return (
                <DropdownLink
                  as="li"
                  role="option"
                  key={item.certificationId}
                  onClick={isOnline ? () => handleOnSelect(index) : undefined}
                  selected={isSelected}
                  aria-selected={isSelected}
                  disabled={!isOnline}
                >
                  <StatusIndicator semanticColor={isOnline ? 'essentialPositive' : 'essentialNegative'}>
                    {item.brand} {item.model}<span style={{color: '#A9A9A9'}}>&nbsp;-&nbsp;{item.certificationId}</span>
                  </StatusIndicator>
                </DropdownLink>
              );
            })}
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
        style={{width: 325}}
      >
        {selectedItemIndex >= 0 ?
          <StatusIndicator>
            {items[selectedItemIndex].brand} {items[selectedItemIndex].model}
            <span style={{color: '#A9A9A9'}}>&nbsp;-&nbsp;{items[selectedItemIndex].certificationId}</span>
          </StatusIndicator> :
          'Select certification...'}
      </Dropdown>
    </DropdownTrigger>;
};

export default SelectCertification;
