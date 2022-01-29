// ignore-string-externalization
import i18next, { Resource } from 'i18next';
import ICU from 'i18next-icu';

export const defaultNamespace = 'translation';

export function createI18n(initialStore: Resource = {}) {
  const i18n = i18next.createInstance();

  // enables ICU message syntax
  // see: https://github.com/i18next/i18next-icu
  i18n.use(ICU);

  // custom backend plugin for loading translations from the generated ./translations folder
  // see: https://www.i18next.com/how-to/add-or-load-translations#load-using-a-backend-plugin
  i18n.use({
    type: 'backend',
    async read(lang: string, _ns: any, callback: any) {
      try {
        // fallback to inline strings when loading english
        if (lang === 'en') {
          return callback(null, {});
        }

        return callback(
          null,
          // eslint-disable-next-line import/dynamic-import-chunkname
          await import(`./translations/${lang}/strings.json`),
        );
      } catch (err) {
        // fallback to inlined strings on error
        return callback(null, {});
      }
    },
  });

  i18n.init({
    nsSeparator: false,
    keySeparator: false,
    fallbackLng: false,
    ns: [],
    defaultNS: defaultNamespace,
  });

  // hydrate with initial store
  i18n.store.data = initialStore;
  i18n.isInitialized = true;

  return i18n;
}
