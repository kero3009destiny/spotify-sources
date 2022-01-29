// ignore-string-externalization
import React, { createContext, useContext, useMemo } from 'react';
import { createI18n, defaultNamespace } from '../createI18n';
import { useLocale } from './useLocale';

const defaultI18n = createI18n();

export const I18NContext = createContext(defaultI18n);

// We aren't currently using namespacing, which is a feature built into i18next.
export function useT(_namespace = defaultNamespace): TFunction {
  const [, forceRender] = React.useReducer(state => state + 1, 1);
  const locale = useLocale();
  const i18n = useContext(I18NContext);

  // Default namespace in i18next is 'translation'
  // todo: support useT(namespace) in the future
  const namespace = defaultNamespace;

  const [clone, loading] = React.useMemo(() => {
    const _clone = i18n.cloneInstance();
    _clone.changeLanguage(locale);
    return [
      _clone,
      _clone.loadNamespaces(namespace), // preload namespace
    ] as const;
  }, [i18n, locale, namespace]);

  const isLoading = !clone.hasResourceBundle(locale, namespace);

  // force rerender after finished loading
  React.useEffect(() => {
    if (isLoading) loading.then(forceRender);
  }, [isLoading, loading]);

  return useMemo(() => {
    return createT(clone, isLoading, loading);
  }, [clone, isLoading, loading]);
}

function createT(
  i18n: typeof defaultI18n,
  isLoading: boolean,
  loading: Promise<void>,
) {
  const _t = i18n.t.bind(i18n);

  function wrappedT(
    id: string,
    stringValue: string,
    _description: string,
    interpolatedValues: { [key: string]: any } = {},
  ) {
    // _t function doesn't require `description` — we extract it later to send context to Smartling.
    return _t(id, stringValue, interpolatedValues);
  }

  // suspend rendering if loading
  wrappedT.read = function read() {
    if (isLoading) throw loading;
    return wrappedT;
  };

  return wrappedT;
}

export type TFunction = ReturnType<typeof createT>;

export const mockT = createT(defaultI18n, false, Promise.resolve());

export type InjectedTProps = {
  t: TFunction;
};

export function withT<Props extends InjectedTProps>(
  ClassComponent: React.ComponentClass<Props>,
) {
  return function WithT(props: Omit<Props, keyof InjectedTProps>) {
    const t = useT();
    return <ClassComponent {...(props as Props)} t={t} />;
  };
}
