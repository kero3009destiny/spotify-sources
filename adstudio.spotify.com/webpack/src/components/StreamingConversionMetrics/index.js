import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AOS from 'aos';
import bowser from 'bowser';
import i18n from 'i18next';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import { Type } from '@spotify-internal/encore-web';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import {
  getIsAuthorized,
  isAuthorizedFetching,
} from '../../ducks/auth/selectors';

import VideoPlayer from 'components/common/VideoPlayer';
import HomePageFooter from 'components/MarketingPageFooter';

import CustomWayPoint from '../common/CustomWayPoint';
import Testimonials from '../Home/Testimonials';
import carouselContent from './carouselContent';
import {
  HowItWorksVideoBackgroundImageAlt,
  HowItWorksVideoBackgroundImageSrc,
  HowItWorksVideoYoutubeUrl,
  WaVoVideoBackgroundImageAlt,
  WaVoVideoBackgroundImageSrc,
  WaVoVideoYoutubeUrl,
} from './videos';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

export function HomeMainButton({ authFetching, isAuthorized, logUserAction }) {
  if (authFetching) {
    return <p />;
  } else if (isAuthorized) {
    return (
      <p className="text-center call-to-action">
        <ButtonPrimary
          buttonSize="lg"
          color="white"
          component={Link}
          data-test="home-main-button-manage-ads"
          id="authorized-cta"
          title={i18n.t(
            'I18N_SPOTIFY_AD_STUDIO_BROWSE',
            'Spotify Ad Studio browse ads page',
          )}
          to={routes.BUILD_AD}
          onClick={() => {
            const params = { ctaType: 'jumbotron-create-ad' };
            logUserAction({
              label: 'click_cta',
              category: 'scm_landing_page',
              params,
            });
          }}
          buttonLegacy
        >
          {i18n.t('I18N_CREATE_AN_AD', 'Create an ad')}
        </ButtonPrimary>
      </p>
    );
  }
  return (
    <p className="text-center">
      <ButtonPrimary
        component={Link}
        title={i18n.t(
          'I18N_SPOTIFY_AD_STUDIO_SIGNUP',
          'Spotify Ad Studio signup page',
        )}
        id="signup-cta"
        to={{
          pathname: routes.ADSTUDIO_SIGNUP,
          search: window.location.search,
        }}
        buttonSize="lg"
        data-test="home-main-button-get-access"
        color="white"
        onClick={() => {
          const params = { ctaType: 'jumbotron-sign-up' };
          logUserAction({
            label: 'click_cta',
            category: 'scm_landing_page',
            params,
          });
        }}
        buttonLegacy
      >
        {i18n.t('I18N_SIGN_UP', 'Sign up')}
      </ButtonPrimary>
    </p>
  );
}

HomeMainButton.propTypes = {
  authFetching: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  logUserAction: PropTypes.func,
};

export class streamingConversionMetrics extends Component {
  componentDidMount() {
    AOS.init({
      easing: 'ease-in',
      duration: 300,
      delay: 100,
      once: true,
    });

    if (bowser.safari) {
      // https://github.com/michalsnik/aos/issues/140
      window.addEventListener('load', AOS.refresh);
    }
  }

  componentWillUnmount() {
    if (bowser.safari) {
      // https://github.com/michalsnik/aos/issues/140
      window.removeEventListener('load', AOS.refresh);
    }
  }

  render() {
    const { isAuthorized, authFetching, logUserAction } = this.props;

    const mainContainerStyles = `
      .main{
        padding-top:0; margin-top:0;
      }
    `;
    return (
      <>
        <Helmet>
          <style>{mainContainerStyles}</style>
        </Helmet>
        <div className="streaming-conversion-metrics-wrapper">
          <div className="jumbotron jumbotron-inverse jumbotron-hero sp-jumbotron-custom-inverse">
            <section
              className="container container-insights"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="row">
                <div className="col-md-12">
                  <header className="header text-center">
                    <Type.h1
                      className="jumbotron-heading"
                      variant={Type.display1}
                    >
                      {i18n.t(
                        'I18N_TURN_UP_YOUR_MUSIC_MARKET',
                        'Turn up your music marketing',
                      )}
                    </Type.h1>
                    <Type.h2
                      className="jumbotron-paragraph"
                      variant={Type.heading3}
                      weight={Type.black}
                    >
                      {i18n.t(
                        'I18N_CONNECT_WITH_FANS_WHERE_T',
                        "Connect with fans where they're already listening.",
                      )}
                    </Type.h2>
                  </header>
                  <HomeMainButton
                    authFetching={authFetching}
                    isAuthorized={isAuthorized}
                    logUserAction={logUserAction}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="container">
            <CustomWayPoint>
              <section className="row streaming-conversion-metrics-content-section">
                <div className="col-md-12">
                  <Type.h1 variant={Type.heading1}>
                    {i18n.t(
                      'I18N_GROW_YOUR_AUDIENCE_SPREAD',
                      'Grow your audience, spread your music, and create lifelong fans with Spotify Ad Studio',
                    )}
                  </Type.h1>
                </div>
                <div className="col-md-12">
                  <VideoPlayer
                    className="streaming-conversion-metrics-video-player"
                    youtubeVideoUrl={HowItWorksVideoYoutubeUrl}
                    videoBackgroundImageSrc={HowItWorksVideoBackgroundImageSrc}
                    videoBackgroundImageAlt={HowItWorksVideoBackgroundImageAlt}
                  />
                </div>
                <CustomWayPoint
                  triggerOnView={logUserAction}
                  params={{
                    category: 'scm_landing_page',
                    label: 'scroll_depth',
                    params: { section: '1', title: 'grow-your-audience' },
                  }}
                />
              </section>
            </CustomWayPoint>
            <CustomWayPoint>
              <section className="streaming-conversion-metrics-section row">
                <div
                  className="streaming-conversion-metrics-text col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <Type.h1 variant={Type.heading1}>
                    {i18n.t(
                      'I18N_SHARE_YOUR_SOUND_WITH_AUD',
                      'Share your sound with audio ads',
                    )}
                  </Type.h1>
                  <p>
                    {i18n.t(
                      'I18N_GIVE_LISTENERS_A_TASTE_OF',
                      'Give listeners a taste of the artist you’re promoting on a platform where they’re already discovering new music. Plus, your artists can talk to fans directly, in their own voice.',
                    )}
                  </p>
                </div>
                <div
                  className="streaming-conversion-metrics-image col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <img
                    alt={i18n.t(
                      'I18N_CONNECT_WITH_PEOPLE_WHERE',
                      'Connect with people where they’re already listening',
                    )}
                    src="https://adstudio.scdn.co/assets/streaming-conversion-metrics/streaming-conversion-metrics-landing-page-connect-listeners.jpg"
                  />
                </div>
                <CustomWayPoint
                  triggerOnView={logUserAction}
                  params={{
                    category: 'scm_landing_page',
                    label: 'scroll_depth',
                    params: { section: '2', title: 'share-your-sound' },
                  }}
                />
              </section>
            </CustomWayPoint>
            <CustomWayPoint>
              <section className="streaming-conversion-metrics-section row">
                <div
                  className="streaming-conversion-metrics-image col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <img
                    alt={i18n.t(
                      'I18N_REACH_FANS_YOU_KNOW_AND_O',
                      'Reach fans you know — and ones that don’t know you yet',
                    )}
                    src="https://adstudio.scdn.co/assets/streaming-conversion-metrics/streaming-conversion-metrics-landing-page-find-fans.jpg"
                  />
                </div>
                <div
                  className="streaming-conversion-metrics-text col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <Type.h1 className="white" variant={Type.heading1}>
                    {i18n.t(
                      'I18N_CONNECT_WITH_YOUR_FANS',
                      'Connect with your fans — and discover new ones',
                    )}
                  </Type.h1>
                  <p>
                    {i18n.t(
                      'I18N_THE_MORE_OUR_AUDIENCE_STR',
                      'The more our audience streams, the more we learn about their                     tastes. Use these insights to reach the right audience —                     people who already listen to your artist’s music and people                     who we know will love their sound.',
                    )}
                  </p>
                </div>
                <CustomWayPoint
                  triggerOnView={logUserAction}
                  params={{
                    category: 'scm_landing_page',
                    label: 'scroll_depth',
                    params: { section: '3', title: 'connect-with-fans' },
                  }}
                />
              </section>
            </CustomWayPoint>
            <CustomWayPoint>
              <section className="streaming-conversion-metrics-section row">
                <div
                  className="streaming-conversion-metrics-text col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <Type.h1 className="white" variant={Type.heading1}>
                    <Trans i18nKey="I18N_UNDERSTAND_THE_IMPACT">
                      Understand the
                      <br />
                      impact (new!)
                    </Trans>
                  </Type.h1>
                  <p>
                    {i18n.t(
                      'I18N_FOR_THE_FIRST_TIME_KNOW',
                      'For the first time, know how your campaign impacted streams and listener growth. With streaming conversion metrics, you can understand your audience and how they engaged with your content on Spotify. Then, you can use these actionable insights to inform your future marketing strategy.',
                    )}
                  </p>
                  <p>
                    <Trans i18nKey="I18N_LEARN_MORE_ABOUT_THESE_ME">
                      Learn more about these metrics{' '}
                      <Link
                        id="pdf-link"
                        className="text-azure"
                        to={routes.LEARN_MORE_ABOUT_SCM}
                        target="_blank"
                        rel="noopener"
                      >
                        here
                      </Link>
                      .
                    </Trans>
                  </p>
                </div>
                <div
                  className="streaming-conversion-metrics-image col-md-6"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <img
                    alt={i18n.t(
                      'I18N_UNDERSTAND_THE_IMPACT1',
                      'Understand the impact (new!)',
                    )}
                    src="https://adstudio.scdn.co/assets/streaming-conversion-metrics/streaming-conversion-metrics-landing-page-animated-chart.gif"
                  />
                </div>
                <CustomWayPoint
                  triggerOnView={logUserAction}
                  params={{
                    category: 'scm_landing_page',
                    label: 'scroll_depth',
                    params: { section: '4', title: 'understand-the-impact' },
                  }}
                />
              </section>
            </CustomWayPoint>
            <CustomWayPoint>
              <section
                className="row streaming-conversion-metrics-content-section row"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="col-md-12">
                  <Type.h1 variant={Type.heading1}>
                    {i18n.t(
                      'I18N_SEE_HOW_MUSIC_MARKETING_A',
                      'See how music marketing agency Wavo uses Spotify Ad Studio to learn how listeners engage with their artists’ message.',
                    )}
                  </Type.h1>
                </div>
                <div className="col-md-12">
                  <VideoPlayer
                    className="streaming-conversion-metrics-video-player"
                    youtubeVideoUrl={WaVoVideoYoutubeUrl}
                    videoBackgroundImageSrc={WaVoVideoBackgroundImageSrc}
                    videoBackgroundImageAlt={WaVoVideoBackgroundImageAlt}
                  />
                </div>
                <CustomWayPoint
                  triggerOnView={logUserAction}
                  params={{
                    category: 'scm_landing_page',
                    label: 'scroll_depth',
                    params: { section: '5', title: 'testimonial-video-player' },
                  }}
                />
              </section>
            </CustomWayPoint>
          </div>
        </div>
        {/* Testimonials */}
        <CustomWayPoint>
          <div
            className="streaming-conversion-metrics-background-black"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Testimonials
              header={i18n.t(
                'I18N_JOIN_OTHER_ARTISTS_AND_LA',
                'Join other artists and labels',
              )}
              carouselContent={carouselContent}
            />

            <CustomWayPoint
              triggerOnView={logUserAction}
              params={{
                category: 'scm_landing_page',
                label: 'scroll_depth',
                params: {
                  section: '6',
                  title: 'testimonials',
                },
              }}
            />
          </div>
        </CustomWayPoint>
        {!isAuthorized && (
          <CustomWayPoint>
            <div data-aos="fade-up" data-aos-delay="400">
              <div className="row streaming-conversion-metrics-content-section">
                <div className="col-md-12">
                  <section className="row">
                    <div className="col-md-2" />
                    <div
                      className="col-md-8 streaming-conversion-metrics-text text-center"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <Type.h1 className="white" variant={Type.heading1}>
                        {i18n.t(
                          'I18N_SOUND_GOOD_GET_STARTED_T',
                          'Sound good? Get started today.',
                        )}
                      </Type.h1>
                    </div>
                    <div className="col-md-2" />
                    <div
                      className="col-md-12 signup-button"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <p className="text-center">
                        <ButtonPrimary
                          component={Link}
                          title={i18n.t(
                            'I18N_SPOTIFY_AD_STUDIO_SIGNUP',
                            'Spotify Ad Studio signup page',
                          )}
                          id="signup-cta"
                          to={routes.ADSTUDIO_SIGNUP}
                          buttonSize="lg"
                          data-test="home-main-button-get-access"
                          onClick={() => {
                            const params = { ctaType: 'bottom-sign-up' };
                            logUserAction({
                              label: 'click_cta',
                              category: 'scm_landing_page',
                              params,
                            });
                          }}
                          buttonLegacy
                        >
                          {i18n.t('I18N_SIGN_UP', 'Sign up')}
                        </ButtonPrimary>
                      </p>
                    </div>
                  </section>
                </div>
              </div>
              <CustomWayPoint
                triggerOnView={logUserAction}
                params={{
                  category: 'scm_landing_page',
                  label: 'scroll_depth',
                  params: { section: '7', title: 'bottom-page-cta' },
                }}
              />
            </div>
          </CustomWayPoint>
        )}

        <CustomWayPoint>
          <div
            className="light-grey-background"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="row streaming-conversion-metrics-content-section">
              <div className="col-md-12">
                <section className="row">
                  <div className="col-md-2" />
                  <div
                    className="col-md-8 streaming-conversion-metrics-text text-center"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <p>
                      <Trans i18nKey="I18N_WANT_TO_SEE_YOUR_AUDIENCE">
                        Want to see your audience on Spotify, submit to
                        playlists, or manage your profile? Visit{' '}
                        <a
                          className="text-azure"
                          href="https://artists.spotify.com/"
                          title={i18n.t(
                            'I18N_SPOTIFY_FOR_ARTISTS',
                            'Spotify for Artists',
                          )}
                        >
                          Spotify for Artists
                        </a>{' '}
                        to get started.
                      </Trans>
                    </p>
                  </div>
                  <div className="col-md-2" />
                </section>
              </div>
            </div>
            <CustomWayPoint
              triggerOnView={logUserAction}
              params={{
                category: 'scm_landing_page',
                label: 'scroll_depth',
                params: { section: '8', title: 'artist-profile-link-footer' },
              }}
            />
          </div>
        </CustomWayPoint>
        <CustomWayPoint>
          <HomePageFooter />
        </CustomWayPoint>
      </>
    );
  }
}

streamingConversionMetrics.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  authFetching: PropTypes.bool.isRequired,
  logUserAction: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthorized: getIsAuthorized(state),
    authFetching: isAuthorizedFetching(state),
  };
}

export default connect(mapStateToProps, { logUserAction: logUserActionAC })(
  streamingConversionMetrics,
);
