import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import i18n from 'i18next';

import { Autosuggest } from '@spotify-internal/adstudio-shared';
import { countrySearch } from '@spotify-internal/adstudio-shared/lib/components/LocationTargetingByCountry/api';
import ApiContainer from '@spotify-internal/adstudio-shared/lib/components/LocationTargetingByCountry/ApiContainer';
import CountrySuggestion from '@spotify-internal/adstudio-shared/lib/components/LocationTargetingByCountry/CountrySearch/Suggestion';
import CountryValue from '@spotify-internal/adstudio-shared/lib/components/LocationTargetingByCountry/CountrySearch/Value';
import {
  ButtonTertiary,
  FormGroup,
  IconDownloadAlt,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import { getExcludedCountries } from 'ducks/account/selectors';
import { getSelectedLang } from 'ducks/i18n/selectors';

import { FormGroupLabel } from 'components/form-common/FormGroupLabel';

import { downloadTargetingList } from 'utils/bulksheets';

import {
  AutosuggestContainer,
  CountryTargetingContainer,
  InputContainer,
  StyledButtonTertiary,
} from './styles';

import { DEFAULT_LANGUAGE } from 'config/config';

import { TargetingServiceGeo } from 'types/common/state/api/flight';

export const CountryTargeting = () => {
  const [targetingGeo, setTargetingGeo] = useState<
    TargetingServiceGeo | undefined
  >();
  const selectedLanguage = useSelector(getSelectedLang);
  const excludeCountries = useSelector(getExcludedCountries);
  const language = selectedLanguage || DEFAULT_LANGUAGE;

  return (
    <>
      <ApiContainer apiHost="https://edge-grpc.spotify.com">
        <CountryTargetingContainer>
          <FormGroup
            label={
              <>
                <FormGroupLabel variant={Type.body2} weight={Type.bold}>
                  {i18n.t(
                    'I18N_DOWNLOAD_BULKSHEET_COUNTRY_LABEL',
                    'Select a country',
                  )}
                </FormGroupLabel>
                <FormGroupLabel
                  variant={Type.body2}
                  semanticColor={semanticColors.textSubdued}
                >
                  {i18n.t(
                    'I18N_DOWNLOAD_BULKSHEET_COUNTRY_BODY',
                    'Get a targeting guide with instructions on how to edit your CSV.',
                  )}
                </FormGroupLabel>
              </>
            }
            labelFor="targeting-list"
          >
            <InputContainer>
              <AutosuggestContainer>
                <Autosuggest
                  exclude={(item: TargetingServiceGeo) =>
                    excludeCountries.includes(item.countryCode)
                  }
                  keyField="geoId"
                  debounced
                  inlineValue
                  placeholder={i18n.t(
                    'I18N_DOWNLOAD_BULKSHEET_COUNTRY_GHOST_TEXT',
                    'Search for a country',
                  )}
                  onInputChange={(query: string) =>
                    countrySearch(query, language)
                  }
                  onChange={setTargetingGeo}
                  id="targeting-list"
                  renderSuggestion={(suggestionProps: TSFixMe) => (
                    <CountrySuggestion {...suggestionProps} />
                  )}
                  value={targetingGeo ? [targetingGeo] : undefined}
                  renderValue={(props: TSFixMe) => {
                    const {
                      disabled,
                      value = [],
                      keyField,
                      valueField,
                    } = props;
                    const item = value[0] || {};
                    return (
                      <CountryValue
                        disabled={disabled}
                        item={item}
                        onClick={() => {
                          setTargetingGeo(undefined);
                        }}
                        keyField={keyField}
                        key={item[keyField]}
                        valueField={valueField}
                      />
                    );
                  }}
                  suggestionsLimit={Infinity}
                  onBlur={(suggestion: TargetingServiceGeo[]) => {
                    setTargetingGeo(suggestion[0]);
                  }}
                />
              </AutosuggestContainer>
              {/* encore v4 has a 'leadingIcon' property that should be used instead of custom styling */}
              {/* FIXME: https://jira.spotify.net/browse/MADS-175 */}
              <StyledButtonTertiary
                buttonSize={ButtonTertiary.sm}
                disabled={!targetingGeo}
                onClick={() =>
                  downloadTargetingList(targetingGeo!.countryCode, language)
                }
              >
                <IconDownloadAlt />
                {i18n.t(
                  'I18N_DOWNLOAD_BULKSHEET_COUNTRY_LINKED_TEXT',
                  'Download targeting guide',
                )}
              </StyledButtonTertiary>
            </InputContainer>
          </FormGroup>
        </CountryTargetingContainer>
      </ApiContainer>
    </>
  );
};
