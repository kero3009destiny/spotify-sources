import { useEffect, lazy, Suspense } from 'react';
import {
  App as AppLayout,
  LoadingIndicator,
  EmptyState,
  EmptyStateTitle,
  EmptyStateButton,
  IconBanActive,
  EmptyStateText,
  IconExclamationAltActive,
  spacer16,
  spacer24,
  spacer48,
  screenXsMax,
  screenSmMax,
} from '@spotify-internal/encore-web';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import Raven from 'raven-js';
import styled from 'styled-components';
import { useCurrentTeams, useCurrentUser } from 'libs/services/s4p';
import { currentTermsAndConditions, useAnnouncements } from 'libs/services/announcements';
import {
  AUTH_CALLBACK_PATH,
  handleAuthCodeResponse,
  logoutUser,
  SITE_ROOT_URL,
} from 'libs/services/auth';
import { MediaPlaybackProvider } from 'components/MediaPlayback';
import gTagManager from 'libs/services/logging';
import PageLoadingIndicator from 'components/PageLoadingIndicator';
import Banner from 'components/Banner';
import StickyTriggerProvider from 'components/StickyTrigger';
import { ErrorBoundary } from 'components/ErrorBoundary';
import RemoteConfig from './RemoteConfig';
import SkipLink from '../components/SkipLink';
import { ForbiddenError, NotFoundError } from 'libs/services/request';
import { SnackbarProvider, SnackbarContainer } from './Snackbar';
import { NavigationHeader, SidePanel, SidePanelState } from './Navigation';
import { isSongwriterTeamUser } from 'libs/utils';
import Footer from './Footer';

const AcceptInvite = lazy(
  () => import(/* webpackChunkName: "AcceptInvite" */ './ManageTeam/AcceptInvite'),
);
const Catalog = lazy(() => import(/* webpackChunkName: "Catalog" */ './Catalog/CatalogContainer'));
const FAQ = lazy(() => import(/* webpackChunkName: "FAQ" */ './FAQ'));
const ManageTeam = lazy(
  () => import(/* webpackChunkName: "ManageTeam" */ './ManageTeam/ManageTeam'),
);
const Recording = lazy(
  () => import(/* webpackChunkName: "Recording" */ './Recording/RecordingContainer'),
);
const ReviewMatches = lazy(
  () => import(/* webpackChunkName: "ReviewMatches" */ './Catalog/Suggestions/ReviewMatches'),
);
const SearchAll = lazy(
  () => import(/* webpackChunkName: "SearchAll" */ './Search/SearchAllContainer'),
);
const SearchEntity = lazy(
  () => import(/* webpackChunkName: "SearchEntity" */ './Search/SearchEntity'),
);
const Songwriters = lazy(() => import(/* webpackChunkName: "Songwriters" */ './Songwriters'));
const TermsAndConditions = lazy(
  () => import(/* webpackChunkName: "TermsAndConditions" */ 'components/TermsAndConditions'),
);
const WelcomeGuide = lazy(() => import(/* webpackChunkName: "WelcomeGuide" */ './WelcomeGuide'));
const Work = lazy(() => import(/* webpackChunkName: "Work" */ './Work/WorkContainer'));
const Writer = lazy(() => import(/* webpackChunkName: "Writer" */ './Catalog/WriterContainer'));
const WriterCuration = lazy(
  () => import(/* webpackChunkName: "WriterCuration" */ './Catalog/WriterCuration'),
);

// TopNav should extend across the screen fully, so this removes horizontal padding from the main element and applies it to InnerContent below
const StyledAppLayout = styled(AppLayout)`
  main {
    padding: 0;
    max-width: none;
  }
`;

const InnerContent = styled.div`
  @media (max-width: ${screenXsMax}) {
    padding: 0 ${spacer16} ${spacer24} ${spacer16};
  }

  @media (min-width: ${screenXsMax}) and (max-width: ${screenSmMax}) {
    padding: 0 ${spacer24} ${spacer24} ${spacer24};
  }

  padding: 0 ${spacer48} ${spacer24} ${spacer48};
`;

const CenterAlign = styled.div`
  min-height: calc(100vh - 65px);
  display: grid;
  place-content: center;
`;

function LoggedIn(props: RouteComponentProps) {
  const announcements = useAnnouncements();
  const organizations = useCurrentTeams();

  // when the user first logs in and there is no team header stored, we select the first organization they have access to alphabetically
  if (localStorage.getItem('SPA-Current-Team') === null && organizations.length > 0) {
    const firstTeam = organizations.sort((a, b) =>
      a.organizationName.localeCompare(b.organizationName),
    )[0];

    localStorage.setItem('SPA-Current-Team', firstTeam.organizationUri);
  }

  const user = useCurrentUser();
  const creatorId = user.team.resources
    .find((resource) => resource.startsWith('spotify:creator'))
    ?.split(':')[2];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location.pathname]);

  useEffect(() => {
    const gaPartnerUserId = user.partnerUserIds.find(
      (partnerUserId) => partnerUserId.partner === 'googleanalytics',
    );

    gTagManager({
      event: 'logIn',
      userId: gaPartnerUserId ? gaPartnerUserId.id : 'unknown',
      publisherName: user.team.organizationName,
      isEmployee: user.employee,
    });

    Raven.setExtraContext({
      publisher: user.team.organizationName,
    });
  }, [user]);

  if (!announcements.accepted.includes(currentTermsAndConditions)) {
    return (
      <TermsAndConditions
        acceptedAnnouncements={announcements.accepted}
        onAccepted={announcements.acceptAnnouncement}
        user={user}
      />
    );
  }

  // Main application content
  let content = (
    <Switch>
      <Route exact path="/match-data" component={ReviewMatches} />
      <Route
        path="/"
        render={(props) => (
          <Banner>
            {(banner) => (
              <>
                <SkipLink href="#innerContent" />
                <StyledAppLayout
                  sidebarWidth="0px"
                  content={
                    <ErrorBoundary
                      resetKey={props.location.pathname}
                      onError={(err, errInfo) => {
                        if (err instanceof NotFoundError || err instanceof ForbiddenError) return;
                        Raven.captureException(err, { extra: errInfo, level: 'critical' });
                      }}
                      fallback={renderPageError}
                    >
                      <NavigationHeader user={user} {...props} />
                      <SidePanel />
                      {banner}
                      <InnerContent id="innerContent">
                        <Suspense
                          fallback={
                            <CenterAlign>
                              <LoadingIndicator indicatorSize="md" />
                            </CenterAlign>
                          }
                        >
                          <Route
                            exact
                            path="/"
                            render={() => {
                              if (isSongwriterTeamUser(user.team.organizationUri)) {
                                return <Redirect to={`/creator/${creatorId}/curation`} />;
                              } else {
                                return <Redirect to="/works" />;
                              }
                            }}
                          />
                          <Route exact path="/search" component={SearchAll} />
                          <Route exact path="/search/:entityType/:query" component={SearchEntity} />
                          <Route exact path="/works" component={Catalog} />
                          <Route exact path="/writers" component={Songwriters} />
                          <Route
                            exact
                            path="/work/:workGid/recording/:recordingGid"
                            component={Recording}
                          />
                          <Route exact path="/work/:workGid" component={Work} />
                          <Route path="/writer/:ipi" component={Writer} />
                          <Route
                            path="/creator/:creatorId/curation"
                            render={(routeProps) => (
                              <WriterCuration userType="songwriter" {...routeProps} />
                            )}
                          />
                          <Route path="/manage-team" component={ManageTeam} />
                          <Route exact path="/welcome-guide" component={WelcomeGuide} />
                          <Route exact path="/faq" component={FAQ} />
                        </Suspense>
                        <SnackbarContainer />
                      </InnerContent>
                    </ErrorBoundary>
                  }
                  footer={<Footer user={user} />}
                />
              </>
            )}
          </Banner>
        )}
      />
    </Switch>
  );

  // Application context providers.
  content = <RemoteConfig userName={user.username}>{content}</RemoteConfig>;
  content = <MediaPlaybackProvider>{content}</MediaPlaybackProvider>;
  content = <StickyTriggerProvider>{content}</StickyTriggerProvider>;
  content = <SnackbarProvider>{content}</SnackbarProvider>;
  content = <SidePanelState>{content}</SidePanelState>;

  return content;
}

const LoggedInWithRouter = withRouter(LoggedIn);

export default function App() {
  return (
    <ErrorBoundary
      onError={(err, errInfo) => {
        if (err instanceof NotFoundError || err instanceof ForbiddenError) return;
        Raven.captureException(err, { extra: errInfo, level: 'critical' });
      }}
      fallback={renderAppError}
    >
      <Suspense
        fallback={
          <CenterAlign>
            <LoadingIndicator indicatorSize="md" />
          </CenterAlign>
        }
      >
        <Switch>
          <Route
            exact
            path={AUTH_CALLBACK_PATH}
            render={(props) => {
              handleAuthCodeResponse(props.location.search);
              return <PageLoadingIndicator />;
            }}
          />
          <Route
            exact
            path="/logout"
            render={() => {
              logoutUser();
              window.location.assign(
                `https://accounts.spotify.com/logout?continue=${encodeURIComponent(SITE_ROOT_URL)}`,
              );
              return <PageLoadingIndicator />;
            }}
          />
          <Route exact path="/accept-invite/:token" component={AcceptInvite} />
          <Route component={LoggedInWithRouter} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}

function renderAppError(err: Error) {
  if (err instanceof ForbiddenError) {
    return (
      <EmptyState
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        variant="fullscreen"
        icon={IconBanActive}
        iconColorSet="announcement"
      >
        <EmptyStateTitle>You don't have access to this page</EmptyStateTitle>
        <EmptyStateText>
          Make sure you are signed into the correct organization or reach out to the administrator
          for the account.
        </EmptyStateText>
        <EmptyStateButton
          target="_blank"
          rel="noopener noreferrer"
          href="https://noteable.spotify.com/pages/publishing-analytics"
        >
          Learn more
        </EmptyStateButton>
      </EmptyState>
    );
  }

  return (
    <EmptyState
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      variant="fullscreen"
    >
      <IconExclamationAltActive semanticColor="textNegative" iconSize={48} />
      <EmptyStateTitle>Couldn't load results</EmptyStateTitle>
      <EmptyStateText>Wait a few minutes, then try again.</EmptyStateText>
    </EmptyState>
  );
}

function renderPageError(err: Error) {
  if (err instanceof ForbiddenError) {
    return (
      <EmptyState
        variant="fullscreen"
        style={{ marginTop: '275px' }}
        icon={IconBanActive}
        iconColorSet="announcement"
      >
        <EmptyStateTitle>No permission</EmptyStateTitle>
        <EmptyStateText>
          Make sure you are signed into the correct organization or reach out to the administrator
          for the account.
        </EmptyStateText>
        <EmptyStateButton
          target="_blank"
          rel="noopener noreferrer"
          href="https://noteable.spotify.com/pages/publishing-analytics"
        >
          Learn more
        </EmptyStateButton>
      </EmptyState>
    );
  }

  return (
    <EmptyState variant="fullscreen" style={{ marginTop: '275px' }}>
      <IconExclamationAltActive semanticColor="textNegative" iconSize={48} />
      <EmptyStateTitle>Couldn't load results</EmptyStateTitle>
      <EmptyStateText>Wait a few minutes, then try again.</EmptyStateText>
    </EmptyState>
  );
}
