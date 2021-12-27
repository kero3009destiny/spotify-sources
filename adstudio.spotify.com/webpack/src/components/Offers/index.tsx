import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import i18n from 'i18next';
import get from 'lodash/get';
import { compose, Dispatch } from 'redux';
import styled from 'styled-components';

import { Icons, Type } from '@spotify-internal/adstudio-tape';
import {
  azure,
  gray50,
  royalBlue,
  spacer8,
  spacer16,
  spacer32,
} from '@spotify-internal/encore-foundation';
import {
  Banner as InfoBanner,
  Type as EncoreType,
} from '@spotify-internal/encore-web';
import { Panel } from '@spotify-internal/encore-web/advertising/components/Panel';
import { withRemoteConfig } from '@spotify-internal/remote-config-resolver-react';

import { LocaleEntry, LocaleLinks } from 'ducks/config/types';
import { OffersState } from 'ducks/offers/reducer';
import { fetchOffers as fetchOffersAction } from 'ducks/offers/actions';
import { getSelectedLocale } from '../../ducks/i18n/selectors';
import { getAccount, getAccountCountry } from 'ducks/account/selectors';
import {
  getById,
  getCurrencyFormatter,
  getExtendedCountry,
} from 'ducks/config/selectors';
import { getOffers } from 'ducks/offers/selectors';

import { PromptToCreateEntity } from 'components/common/CampaignHierarchy/PromptToCreateEntity';
import {
  MIN_SPEND,
  WelcomeSlideType,
} from 'components/OnboardingModal/constants';
import { Stars } from 'components/OnboardingModal/svgs';
import { WelcomeCaption } from 'components/OnboardingModal/WelcomeSplash';

import { DEFAULT_LOCALE } from '../../config/i18n';

import { CURRENCY_MICRO_DIVISOR, DEFAULT_CURRENCY } from 'config/config';

const { IconOfferCard } = Icons;

const StyledBanner = styled(InfoBanner)`
  margin-bottom: ${spacer32};
`;

const CheckoutIcon = styled.div`
  display: flex;
  flex-direction: column;
  height: ${spacer32};
  justify-content: center;
  padding-right: ${spacer16};
`;

const Details = styled.span`
  display: inline;
  color: ${gray50};
  margin-left: ${spacer8};
`;

const Description = styled(Type)`
  margin-bottom: 0;
  padding-bottom: ${spacer32};
  padding-top: ${spacer8};
`;

export const TEST_ID = 'offers';

export enum DisplayType {
  BANNER,
  CHECKOUT,
  ONBOARDING,
  TABLE,
}

export interface StateProps {
  offers: OffersState;
  currencyFormatter: (number: number, overrides?: object) => string;
  adAccountId: string;
  localeLinks: LocaleLinks;
}

export interface OwnProps {
  displayType: DisplayType;
  showOffers: boolean;
  defaultComponent?: any; // Option to pass in a default component to render default view in case offers is not available
  tableOnClickCTA?: () => void;
}

export interface MergeProps {
  fetchOffers: (adAccountId: string) => void;
}

export interface OnboardingOffer {
  credit: string;
  expiry: string;
}

export const getWelcomeSplashForOffers = (
  credit: string,
  expiry: string,
  minSpend: string,
  localeLinks: LocaleLinks,
) => {
  return (
    <Trans
      i18nKey="I18N_WELCOME_SPLASH_EASILY_CREATE_AND_MANAGE_ADS_OFFER"
      values={{ credit, expiry, minSpend, localeLinks }}
    >
      Easily create and manage ads that connect you with your target audience on
      Spotify.
      <br /> Offer expires {{ expiry }}.
      <a href={localeLinks?.offersTermsConditions}>Read more here</a>
    </Trans>
  );
};

export const getWelcomeSlideOffersMsg = (
  onboardingOffer: OnboardingOffer,
  minSpendWithCurrency: string,
  localeLinks: LocaleLinks,
): WelcomeSlideType => {
  const { credit, expiry } = onboardingOffer;
  return {
    Icon: Stars,
    title: i18n.t(
      'I18N_WELCOME_TO_AD_STUDIO_OFFER',
      'Welcome! Get {{credit}} off your first bill.',
      { credit },
    ),
    caption: getWelcomeSplashForOffers(
      credit,
      expiry,
      minSpendWithCurrency,
      localeLinks,
    ),
  };
};

export const getTableSubtitle = (
  expiryDate: string,
  credit: string,
  localeLinks: LocaleLinks,
) => {
  return (
    <Trans
      i18nKey="I18N_OFFERS_LAUNCH_YOUR_FIRST_CAMPAIGN"
      values={{ credit, expiryDate, localeLinks }}
    >
      Launch your first campaign before {{ expiryDate }} to get {{ credit }} off
      your first bill. Then come back here to see how it’s doing.
      <a href={localeLinks?.offersTermsConditions}>
        Learn more about ad credits here
      </a>
    </Trans>
  );
};

export type OfferDetailsProps = StateProps & OwnProps & MergeProps;

export class OfferDetails extends Component<OfferDetailsProps> {
  public static defaultProps = {
    defaultComponent: null,
  };

  componentDidMount() {
    const { showOffers, fetchOffers, adAccountId } = this.props;
    if (showOffers) {
      fetchOffers(adAccountId);
    }
  }

  render() {
    const {
      displayType,
      offers,
      currencyFormatter,
      showOffers,
      defaultComponent,
      tableOnClickCTA,
      localeLinks,
    } = this.props;

    if (
      !showOffers ||
      !offers ||
      !offers.totalOfferAmountMicros ||
      !offers.expiry
    )
      return defaultComponent;

    const offerAmount = offers.totalOfferAmountMicros / CURRENCY_MICRO_DIVISOR;
    const offerAmountWithCurrency = currencyFormatter(offerAmount, {});
    const offersExpiry: Date = new Date(offers.expiry.toString());
    const localExpiryDate: string = offersExpiry.toLocaleDateString();
    const tableCtaText = i18n.t(
      'I18N_CREATE_NEW_CAMPAIGN',
      'Create new campaign',
    );

    switch (displayType) {
      case DisplayType.BANNER: {
        const credit = offerAmountWithCurrency;
        const expiryDate = localExpiryDate;
        return (
          <StyledBanner data-test={TEST_ID}>
            <Trans
              i18nKey="I18N_GET_AN_OFFER"
              values={{ credit, expiryDate, localeLinks }}
            >
              You have {{ credit }} credit on your account until
              {{ expiryDate }}.
              <a href={localeLinks?.offersTermsConditions}>
                Read more about ad credits here
              </a>
            </Trans>
          </StyledBanner>
        );
      }

      case DisplayType.CHECKOUT:
        return (
          <div data-test={TEST_ID}>
            <Panel>
              <CheckoutIcon>
                <IconOfferCard
                  strokeColor={royalBlue}
                  color={azure}
                  iconSize={36}
                />
              </CheckoutIcon>
              <div>
                {i18n.t('I18N_CREDIT_APPLIED', {
                  formattedAmount: offerAmountWithCurrency,
                  defaultValue: '{{formattedAmount}} credit applied',
                })}
                <Details>
                  {i18n.t('I18N_OFFERS_DETAILS_MESSAGE', {
                    formattedAmount: offerAmountWithCurrency,
                    defaultValue:
                      'Submit your ad order for {{formattedAmount}} off your next bill.',
                  })}
                </Details>
              </div>
            </Panel>
            <Description element="p" variant="body-2-book">
              {i18n.t('I18N_OFFERS_DESCRIPTION_MESSAGE', {
                expiryDate: localExpiryDate,
                defaultValue:
                  'We’ll use your available credit before charging your card. Offer expires {{ expiryDate }}.' +
                  'By submitting this order, I agree to the terms and conditions of the credit.',
              })}
            </Description>
          </div>
        );

      case DisplayType.ONBOARDING: {
        const onboardingOffer: OnboardingOffer = {
          credit: offerAmountWithCurrency,
          expiry: localExpiryDate,
        };
        const minSpendWithCurrency = currencyFormatter(MIN_SPEND, {
          decimals: 0,
        });
        const { Icon, title, caption } = getWelcomeSlideOffersMsg(
          onboardingOffer,
          minSpendWithCurrency,
          localeLinks,
        );
        return (
          <div data-test={TEST_ID}>
            <Icon width={249} height={142} viewBox="" />
            <EncoreType.h1 variant={EncoreType.heading2}>{title}</EncoreType.h1>
            <WelcomeCaption>{caption}</WelcomeCaption>
          </div>
        );
      }

      case DisplayType.TABLE: {
        const tableSubtitlea = getTableSubtitle(
          offerAmountWithCurrency,
          localExpiryDate,
          localeLinks,
        );
        return (
          <PromptToCreateEntity
            title={i18n.t('I18N_GET_OFFER_WHEN', {
              formattedAmount: offerAmountWithCurrency,
              defaultValue: 'Get a {{formattedAmount}} credit when...',
            })}
            subtitle={tableSubtitlea}
            ctaText={tableCtaText}
            onClickCTA={tableOnClickCTA!}
          />
        );
      }

      default:
        return null;
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchOffers: (adAccountId: string) =>
      dispatch(fetchOffersAction({ adAccountId })),
  };
}

export const mapStateToProps = (state: TSFixMe): StateProps => {
  const offers = getOffers(state);
  const currency = offers
    ? offers.currency
    : get(
        getExtendedCountry(state, getAccountCountry(state)!),
        'currencyCode',
        DEFAULT_CURRENCY,
      );
  const selectedLang = getSelectedLocale(state);
  let locale: LocaleEntry = getById(state, selectedLang);
  if (!locale || !locale.links) {
    locale = getById(state, DEFAULT_LOCALE);
  }

  return {
    offers: offers,
    currencyFormatter: getCurrencyFormatter(state, currency!),
    adAccountId: get(getAccount(state), 'id'),
    localeLinks: get(locale, 'links', {}),
  };
};

const mapResolverToProps = (resolver: TSFixMe) => ({
  showOffers:
    resolver &&
    resolver.isActive &&
    resolver.getBool('ad-studio-offers-enabled'),
});

export default compose<OfferDetailsProps>(
  connect(mapStateToProps, mapDispatchToProps),
  withRemoteConfig(mapResolverToProps, {
    blockRendering: false,
  }),
)(OfferDetails) as TSFixMe;
