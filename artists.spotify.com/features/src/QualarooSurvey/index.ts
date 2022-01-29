// ignore-string-externalization
import { useEffect } from 'react';

declare global {
  interface Window {
    _kiq: any;
  }
}

interface AdditionalProperties {
  [key: string]: string;
}

interface QualarooSurveyProps {
  identity?: string;
  additionalProperties?: AdditionalProperties;
}

export const QualarooSurvey = (props: QualarooSurveyProps) => {
  let timeout: ReturnType<typeof setTimeout>;
  useEffect(() => {
    // Qualaroo Intercept Survey
    /* eslint-disable */
    window._kiq = window._kiq || [];
    (() => {
      timeout = setTimeout(function () {
        /* istanbul ignore next */
        var d = document,
          f = d.getElementsByTagName('script')[0],
          s = d.createElement('script');
        /* istanbul ignore next */
        s.type = 'text/javascript';
        /* istanbul ignore next */
        s.async = true;
        /* istanbul ignore next */
        s.src = 'https://cl.qualaroo.com/ki.js/75875/hKp.js';
        /* istanbul ignore next */
        s.id = 'qualaroo-survey-script';
        /* istanbul ignore next */
        f.parentNode && f.parentNode.insertBefore(s, f);
        /* istanbul ignore next */
        s.addEventListener('load', () => {
          if (props.identity) {
            window._kiq.push(['identify', props.identity]);
          }
          if (props.additionalProperties) {
            window._kiq.push(['set', props.additionalProperties]);
          }
        });
      }, 10);
    })();
    return () => {
      clearTimeout(timeout);
      const script = document.getElementById('qualaroo-survey-script');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [props.identity, props.additionalProperties]);
  return null;
};
