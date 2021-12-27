import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Params } from 'react-router/lib/Router';
import { WithRouterProps } from 'react-router/lib/withRouter';
import { matchPath } from 'react-router-dom';

export type NavBarProps = {
  params: Params;
  tabIsActive: (route: string) => boolean;
  search?: string;
};

export function ConnectedNavBarHOC(
  RenderNavBar: React.ComponentType<NavBarProps>,
) {
  class NavBarWrapper extends PureComponent<WithRouterProps> {
    tabIsActive = (route: string): boolean => {
      const { pathname } = this.props.location;
      const match = matchPath(pathname, {
        path: route,
        exact: true,
      });
      return !!match;
    };

    render() {
      return (
        <RenderNavBar
          tabIsActive={this.tabIsActive}
          params={this.props.params}
          search={this.props.location.search}
        />
      );
    }
  }

  return withRouter<{}>(NavBarWrapper);
}

export default ConnectedNavBarHOC;
