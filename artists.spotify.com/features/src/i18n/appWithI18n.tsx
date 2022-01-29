// ignore-string-externalization
import React, { useState } from 'react';
import { AppProps, AppContext, AppInitialProps } from 'next/app';
import { Resource } from 'i18next';
import { createI18n, defaultNamespace } from './createI18n';
import { I18NContext } from './hooks/useT';
import { LocaleContainer } from './components/LocaleContainer';
import { LanguageSelection } from './components/LanguageSelection';

type AppType = React.ComponentType<AppProps> & {
  getInitialProps?: (
    context: AppContext,
  ) => AppInitialProps | Promise<AppInitialProps>;
};

type InjectedProps = {
  _i18nStore?: Resource;
};

// get initial store passed down from the server
const hydratedStore: Resource | undefined = process.browser
  ? JSON.parse(document.querySelector('#__I18N_DATA__')?.textContent ?? '{}')
  : {};

function getI18nStore() {
  // use the hydratedStore on the client
  if (process.browser) return hydratedStore;
  // use an empty store on the server.
  return {};
}

export function appWithI18n(WrappedApp: AppType): AppType {
  function AppWithI18n({
    _i18nStore = getI18nStore(),
    ...props
  }: AppProps & InjectedProps) {
    const nextLocale = props.router.locale ?? 'en';
    const [locale, setLocale] = useState(nextLocale);
    const [i18n] = useState(() => createI18n(_i18nStore));

    // preload default namespace before updating locale
    React.useEffect(() => {
      let cancelled = false;

      const clone = i18n.cloneInstance();

      clone.changeLanguage(nextLocale);

      clone.loadNamespaces(defaultNamespace).then(() => {
        if (cancelled) return;
        setLocale(nextLocale);
      });

      return () => {
        cancelled = true;
      };
    }, [i18n, nextLocale]);

    // synchronously preload default namespace on the server
    if (!process.browser) {
      let translations: any;

      try {
        translations =
          locale !== 'en'
            ? require(`./translations/${locale}/strings.json`)
            : {};
      } catch (err) {
        translations = {};
      }

      i18n.addResources(locale, defaultNamespace, translations);
    }

    const serializedState = React.useMemo(
      () => JSON.stringify(_i18nStore),
      [_i18nStore],
    );

    return (
      <I18NContext.Provider value={i18n}>
        <LocaleContainer locale={locale}>
          <LanguageSelection>
            <WrappedApp {...props} />
          </LanguageSelection>
        </LocaleContainer>

        {/** pass down initial store from the server to the client */}
        <script
          id="__I18N_DATA__"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: serializedState,
          }}
        />
      </I18NContext.Provider>
    );
  }

  AppWithI18n.getInitialProps = WrappedApp.getInitialProps;

  return AppWithI18n;
}
