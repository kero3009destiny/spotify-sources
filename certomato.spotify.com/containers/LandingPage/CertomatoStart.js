import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Banner, ButtonPrimary, spacer12 } from '@spotify-internal/encore-web';
import Markdown from '../../components/Markdown';
import Certifications from '../../containers/Certifications';
import { CERTIFICATION_ACTIONS } from '../../utils/Constants';

const CertomatoStart = ({ isAdmin, certSession }) => {
  const location = useLocation();
  const [text, setText] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const history = useHistory();


  const handleStartNewClick = () => {
    history.push('/new');
  };

  useEffect(() => {
    if (location.state?.action === CERTIFICATION_ACTIONS.STARTED) {
      setShowBanner(true);
    }
  }, [location]);

  useEffect(() => {
    const content = require('../../content/LandingPage.md');
    fetch(content).then((response) => response.text()).then((landingPageText) => {
      setText(landingPageText);
    });
  }, []);

  return (
    <>
      {showBanner && (
        <Banner colorSet="positive" onClose={() => setShowBanner(false)}>
          New certification started
        </Banner>
      )}
      <Markdown source={text}/>
      <ButtonPrimary style={{ paddingTop: spacer12 }} onClick={handleStartNewClick}>Start New Certification</ButtonPrimary>
      <Certifications isAdmin={isAdmin} currentSession={certSession} />
    </>
  );
};

export default CertomatoStart;
