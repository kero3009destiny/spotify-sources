import React, { PureComponent } from 'react';

import FullScreenModal from './FullScreenModal';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SplashScreenModal extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.handleWindowResize = this.handleWindowResize.bind(this);

    this.state = {
      modalHeight: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize() {
    this.setState({
      modalHeight: window.innerHeight,
    });
  }

  render() {
    const {
      children,
      open,
      className,
      footer,
      ...transferredProps
    } = this.props;

    const style = {
      height: `${this.state.modalHeight}px`,
    };

    const splashClassNames = classNames('splash-screen', className);

    return (
      <FullScreenModal rendered={open}>
        {() =>
          (<div className={splashClassNames} style={style} {...transferredProps}>
            <section className="content">
              {children}
            </section>
            {footer && <footer>{footer}</footer>}
          </div>)}
      </FullScreenModal>
    );
  }
}

SplashScreenModal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  className: PropTypes.string,
  footer: PropTypes.node,
};



// WEBPACK FOOTER //
// ./src/components/SplashScreenModal.js