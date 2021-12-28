import React, { useEffect, useState } from 'react';

import { useTranslation, i18n } from 'i18n/nexti18n';
import { ContactForm } from 'components/molecules';

import * as Styled from './FooterForm.styled';

/**
 * This constant is used to track analytics events in contact form
 */
const FORM_NAME = 'get in touch - footer';

/**
 * Renders the footer contact form.
 * @returns {ReactElement}
 */
const FooterForm = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(t('letsTalk'));
  const onSubmit = () => setTitle(t('wereOnIt'));

  useEffect(() => {
    setTitle(t('letsTalk'));
  }, [i18n.language]);

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Title tag="h2" styling="h2">
          {title}
        </Styled.Title>
        <Styled.FormContainer>
          <ContactForm formName={FORM_NAME} onSubmitCallback={onSubmit} />
        </Styled.FormContainer>
      </Styled.Content>
    </Styled.Container>
  );
};

export default FooterForm;
