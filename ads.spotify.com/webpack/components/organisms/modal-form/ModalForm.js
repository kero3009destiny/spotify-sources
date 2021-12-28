import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';

import { ALLOW_SCROLL } from 'constants/js-css-classes';
import { useAppContext, ACTION_TYPES } from 'contexts/app-context';
import { useTranslation } from 'i18n/nexti18n';
import { eventTrack, CONTACT_FORM_TOGGLE } from 'utils/google-tag-manager';
import { useIsMounted } from 'utils/use-is-mounted';

import { ContactForm } from 'components/molecules';

import * as Styled from './ModalForm.styled';

const RESIZE_DEBOUNCE_DELAY = 250;
/**
 * These constants are used to track analytics events in the contact form
 */
const FORM_NAME_MODAL_TOOGLE = 'get in touch - open modal';
const FORM_NAME_CONTACT = 'get in touch - modal';

/**
 * Renders a modal contact form
 * @param {string|null} className The component class name.
 * @returns {ReactElement}
 */
const ModalForm = ({ className = null }) => {
  const { t } = useTranslation();
  const [appState, appDispatch] = useAppContext();
  const [documentHeight, setDocumentHeight] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { isModalFormOpen } = appState;
  const onSubmit = () => setSubmitted(true);
  const isMounted = useIsMounted();

  const closeModalForm = () => {
    appDispatch({
      type: ACTION_TYPES.MODAL_FORM_TOGGLE,
      status: false,
    });
  };

  useEffect(() => {
    const onReSize = () => {
      setDocumentHeight(window.innerHeight);
    };
    const debounceOnReSize = debounce(onReSize, RESIZE_DEBOUNCE_DELAY);

    window.addEventListener('resize', debounceOnReSize);
    setDocumentHeight(window.innerHeight);

    return () => {
      debounceOnReSize.cancel();
      window.removeEventListener('resize', debounceOnReSize);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    setDocumentHeight(window.innerHeight);
    eventTrack(CONTACT_FORM_TOGGLE, {
      formName: FORM_NAME_MODAL_TOOGLE,
      status: isModalFormOpen,
    });
  }, [isModalFormOpen]);

  return (
    <Styled.Modal visible={isModalFormOpen} onDismiss={closeModalForm}>
      <Styled.Container className={className}>
        <Styled.Headline>{t('letsTalk')}</Styled.Headline>
        <Styled.ModalForm documentHeight={documentHeight}>
          <Styled.Content className={ALLOW_SCROLL}>
            {submitted && (
              <Styled.Title tag="h2" styling="h2">
                {t('wereOnIt')}
              </Styled.Title>
            )}
            <ContactForm
              modifier="modal"
              tabIndex={isModalFormOpen ? 0 : -1}
              onSubmitCallback={onSubmit}
              formName={FORM_NAME_CONTACT}
            />
          </Styled.Content>
        </Styled.ModalForm>
      </Styled.Container>
    </Styled.Modal>
  );
};

ModalForm.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
};

export default ModalForm;
