import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import GlobalAlerts, {
  globalAlertsMapStateToProps,
  GlobalAlertsStateProps,
} from 'components/GlobalAlerts';

const Spacer = styled.div<{ height: number }>`
  height: ${props => props.height}px;
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  z-index: 5;
`;

interface StateProps extends GlobalAlertsStateProps {}

interface OwnProps {
  onChangeHeight: (height: number) => void;
}

type TopBannersContainerProps = OwnProps & StateProps;

export class TopBannersContainer extends React.Component<
  TopBannersContainerProps,
  any
> {
  private height: number;
  private container: HTMLElement | null;

  constructor(props: TopBannersContainerProps) {
    super(props);
    this.container = null;
    this.height = 0;
  }

  componentDidMount() {
    this.getHeight();
  }

  // will run whenever a notification is turned on or off, because of connect()
  componentDidUpdate() {
    this.getHeight();
  }

  getHeight = () => {
    const height = this.container ? this.container.offsetHeight : 0;
    this.height = height;
    if (this.props.onChangeHeight) this.props.onChangeHeight(height);
  };

  render() {
    return (
      <>
        <Container ref={elem => (this.container = elem)}>
          <GlobalAlerts />
        </Container>
        <Spacer height={this.height} />
      </>
    );
  }
}

const mapStateToProps = (state: TSFixMe): StateProps => {
  /*
    by taking all the props from the global alert, the height will update whenever
    one of those is turned on or off
  */
  return {
    ...globalAlertsMapStateToProps(state),
  };
};

export default connect<StateProps>(mapStateToProps)(TopBannersContainer);
