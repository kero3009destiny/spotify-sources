import React, {useEffect} from "react";
import { Router, Route, Switch } from "react-router-dom";
// init components
import Login from './components/client/05_environments/login';
import Dashboard from "./components/admin/05_environments/dashboard";
import Companies from "./components/admin/05_environments/companies";
import SubCompanies from "./components/admin/05_environments/subCompanies";

import { NormalTextStyles, SmallTextStyles} from './components/common/01_atoms/text'
import CookieNotice from "./components/common/01_atoms/cookieNotice"
import NoMatch from "./components/common/noMatch";
import Register from "./components/client/05_environments/register";
import Lessons from "./components/client/05_environments/lessons";
import Lesson from "./components/client/05_environments/lesson";
import Gallery from "./components/client/05_environments/gallery";
import UserAccount from "./components/admin/05_environments/userAccount";
import Member from "./components/admin/05_environments/member";
import withAuth from "./components/common/withAuth";
import AdminLayout from './components/common/04_ecosystems/adminLayout';
import Members from "./components/admin/05_environments/members";
import Company from "./components/admin/05_environments/company";
import NewUser from './components/client/05_environments/newUser';
import PrivacyPolicy from './components/client/05_environments/privacyPolicy';
import ToastGroup from './components/common/03_organisms/toastGroup';
import Leaderboard from "./components/admin/05_environments/leaderboard";
import Auth from './components/common/04_ecosystems/auth';
import fluidScale from './styled-lib/fluidScale';
import ScrollToTop from 'react-router-scroll-top';
import './styled-lib/fonts.css';
// styling init
import {createGlobalStyle} from 'styled-components';
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

// create global reset styling
const GlobalStyle = createGlobalStyle`
  :root{
    --color-PRIMARY: #1DB954;
    --color-SECONDARY: #f2f2f2;
    --color-BRAND-GREEN: #1DB954;
    --color-GRAY-DARK: #9B9B9B;
    --color-GRAY-MEDDARK: #BCBCBC;
    --color-GRAY-MED: #D3D3D3;
    --color-GRAY-LIGHT: #F6F6F6;
    --color-GRIM: #191414;
    --color-SNOW: #fff;
    --color-DIRTY-SNOW: #F6F6F6;
    --color-DARKNESS: #040404;
    --color-DODGER-BLUE: #3984FA;
    --color-DARK-BLUE: #2D46B9;
    --color-RED-ORANGE: #FF4537;
    --color-DRAGON: #FF1F1F;
    --color-TUNDORA: #4E4E4E;
    --color-MINE-SHAFT: #212121;
    --font-PRIMARY: 'circular', helvetica, ariel, sans-serif;
  }
  *{
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html{
    font-size: 62.5%;
    background: white;
  }
  body{
    font-size: 1.6rem;
    font-family: var(--font-PRIMARY);
    font-weight: 700;
    background: var(--color-SNOW);
  }
  h1, h2, h3 {
    margin-bottom: 0.30em;
  }
  h4, h5, h6 {
    margin-bottom: 0.35em;
  }
  p {
    font-weight: 400;
    margin-bottom: 1em;

    ${NormalTextStyles};
  }
  small {
    ${SmallTextStyles};
  }

  /* kill margin bottom if it's not followed */
  h1, h2, h3, h4, h5, h6, p {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;


const App = () => {
  return (
    <>
      <GlobalStyle />
      <CookieNotice />
      <ToastGroup />
      <Router history={history}>
        <ScrollToTop>
        <Switch>
          <Route
            exact
            path="/"
            component={
              Login
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            component={() => (
              <Auth allowed={[1,2,3,4]}>
                <Dashboard />
              </Auth>
            )}
          />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/register" component={Register} />
          <Route path="/newuser" component={NewUser} />
          <Route
            exact
            path="/admin/account"
            component={() => (
              <Auth allowed={[1,2,3,4]}>
                <AdminLayout displayOnMobile>
                  <UserAccount/>
                </AdminLayout>
              </Auth>
            )}
          />
          <Route
            exact
            path="/admin/holding-companies"
            component={() => (
              <Auth allowed={[1]}>
                <AdminLayout>
                  <Companies/>
                </AdminLayout>
              </Auth>
            )}
          />
          <Route
            exact
            path="/admin/agencies"
            component={() => (
              <Auth allowed={[1,2,3]}>
                <AdminLayout>
                  <SubCompanies/>
                </AdminLayout>
              </Auth>
            )}
          />
          <Route
            exact
            path="/admin/members"
            component={() => (
              <Auth allowed={[1,2,3]}>
                <AdminLayout>
                  <Members/>
                </AdminLayout>
              </Auth>
            )}
          />
          <Route
            exact
            path="/admin/member"
            component={() => (
              <Auth allowed={[1,2,3]}>
                <AdminLayout>
                  <Member/>
                </AdminLayout>
              </Auth>
            )}
          />
          <Route
            exact
            path="/admin/company"
            component={() => (
              <Auth allowed={[1,2,3]}>
                <AdminLayout>
                  <Company/>
                </AdminLayout>
              </Auth>
            )}
          />
          <Route
            path="/admin/leaderboard"
            exact
            component={() => (
              <Auth allowed={[1,2,3]}>
                <AdminLayout>
                  <Leaderboard/>
                </AdminLayout>
              </Auth>
            )}
          />
          <Route
            exact
            path="/lessons"
            component={(props: any) => (
              <Auth allowed={[1,2,3,4]}>
                <Lessons {...props} />
              </Auth>
            )}
          />
          <Route
            path="/lesson/:lessonID"
            exact
            component={(props:any) => (
              <Auth allowed={[1,2,3,4]}>
                <Lesson {...props} />
              </Auth>
            )}
          />
          <Route
            path="/lesson/:lessonID/:moduleID"
            exact
            component={(props:any) => (
              <Auth allowed={[1,2,3,4]}>
                <Lesson {...props} />
              </Auth>
            )}
          />
          <Route
            path="/gallery/:galleryID"
            exact
            component={(props:any) => (
              <Auth allowed={[1,2,3,4]}>
                <Gallery {...props}/>
              </Auth>
            )}
          />

          <Route component={NoMatch} />
        </Switch>
        </ScrollToTop>
      </Router>
    </>
  )
}

export default App;
