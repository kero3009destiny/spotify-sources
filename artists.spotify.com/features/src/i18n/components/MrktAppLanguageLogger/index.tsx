// ignore-string-externalization
import { useEffect } from 'react';
import { createMrktAppLanguage } from '@spotify-internal/event-definitions/es5/events/createMrktAppLanguage';
import { eventSender } from '@mrkt/features/gabito';
import { useRouter } from 'next/router';

/** logs MrktAppLanguage event when locale changes */
export function MrktAppLanguageLogger() {
  const { locale = 'en' } = useRouter();

  useEffect(() => {
    eventSender.send(
      createMrktAppLanguage({
        language: locale,
      }),
      { authorize: true },
    );
  }, [locale]);

  return null;
}
