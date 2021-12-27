import { createContext, Component } from 'react';
import throttle from 'lodash/throttle';

export const StickyTriggerContext = createContext();

export default class StickyTrigger extends Component {
  static Consumer = StickyTriggerContext.Consumer;

  static defaultProps = {
    children: () => null,
  };

  state = {
    value: false,
  };

  handleScroll = throttle(() => {
    if (!this.state.value && window.scrollY > 120) {
      this.setState({
        value: true,
      });
    }
    if (this.state.value && window.scrollY < 120) {
      this.setState({
        value: false,
      });
    }
  }, 100);

  componentDidMount() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  render() {
    return (
      <StickyTriggerContext.Provider value={this.state.value}>
        {this.props.children}
      </StickyTriggerContext.Provider>
    );
  }
}
