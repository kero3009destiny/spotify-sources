import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  ButtonTertiary,
  Type,
  LoadingIndicator,
  spacer8,
} from '@spotify-internal/encore-web';

const iframeHeight = 380;

const TermsIframe = styled.iframe.attrs({
  frameBorder: 0,
})`
  height: ${iframeHeight}px;
  width: 100%;
`;

const ContentArea = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  max-height: ${iframeHeight}px;
  justify-content: center;
  margin: 0 auto;
  max-width: 300px;
  text-align: center;
`;

type TermsAndConditionsProps = {
  getTermsUrl: () => Promise<string | undefined>;
  introBody: string;
  introHeader: string;
  onLoad: () => void;
  onError: () => void;
  staticTermsUrl?: string;
  textDirection?: string;
};

export function TermsAndConditions({
  getTermsUrl,
  introBody,
  introHeader,
  onLoad,
  onError,
  staticTermsUrl,
  textDirection = 'ltr',
}: TermsAndConditionsProps) {
  const [termsUrl, setTermsUrl] = useState<string | undefined>();
  const [hasError, setHasError] = useState(false);
  const [iFrameLoaded, setIFrameLoaded] = useState(false);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (staticTermsUrl && componentIsMounted.current) {
      setTermsUrl(staticTermsUrl);
      setHasError(false);
      onLoad();
    }
  }, [staticTermsUrl, onLoad]);

  useEffect(() => {
    if (staticTermsUrl && componentIsMounted.current) {
      setIFrameLoaded(false);
    }
  }, [staticTermsUrl]);

  const loadTermsUrl = async () => {
    try {
      setTermsUrl(undefined);
      setHasError(false);

      const url = staticTermsUrl || (await getTermsUrl());
      if (!url) {
        throw new Error('Could not load terms and services iframe URL');
      }

      if (componentIsMounted.current) {
        setTermsUrl(url);
        setHasError(false);
        setIFrameLoaded(true);
        onLoad();
      }
    } catch (e) {
      setTermsUrl(undefined);
      setHasError(true);
      onError();
    }
  };

  const handleIFrameLoaded = () => {
    setIFrameLoaded(true);
  };

  // only load the terms URL once, if the request fails we can retry from the error message
  useMemo(loadTermsUrl, []);

  const Intro = (
    <Type
      as="p"
      style={{
        paddingTop: spacer8,
        textAlign: textDirection === 'rtl' ? 'right' : 'left',
      }}
      dir={textDirection}
    >
      <strong>{introHeader}</strong>
      <br />
      {introBody}
    </Type>
  );

  if (hasError) {
    return (
      <>
        {Intro}
        <ContentArea>
          <Type as="p" condensed>
            There’s a problem on our end and we can’t show these terms right
            now.
          </Type>
          <ButtonTertiary
            buttonSize={ButtonTertiary.sm}
            semanticColor="textBrightAccent"
            onClick={loadTermsUrl}
          >
            Try again
          </ButtonTertiary>
        </ContentArea>
      </>
    );
  }

  if (termsUrl) {
    return (
      <>
        {Intro}
        {!iFrameLoaded && (
          <ContentArea>
            <LoadingIndicator indicatorSize="md" data-testid="terms-loading" />
          </ContentArea>
        )}

        <TermsIframe
          style={{ opacity: iFrameLoaded ? 100 : 0 }}
          title="Terms and Conditions"
          src={termsUrl}
          data-testid="terms-iframe"
          dir={textDirection}
          onLoad={handleIFrameLoaded}
        />
      </>
    );
  }

  return (
    <>
      {Intro}
      <ContentArea>
        <LoadingIndicator indicatorSize="md" data-testid="terms-loading" />
      </ContentArea>
    </>
  );
}
