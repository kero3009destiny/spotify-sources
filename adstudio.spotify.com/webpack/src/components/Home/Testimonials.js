import React, { Component } from 'react';
import Slider from 'react-animated-slider';
import i18n from 'i18next';

import { Type } from '@spotify-internal/encore-web';

import PropTypes from 'prop-types';

class Testimonials extends Component {
  static propTypes = {
    // Required for lazyloading with CustomWaypoint component
    innerRef: PropTypes.func,
    carouselContent: PropTypes.array.isRequired,
    header: PropTypes.string,
  };

  static defaultProps = {
    header: i18n.t(
      'I18N_JOIN_THE_AD_STUDIO_COMMUN',
      'Join the Ad Studio community.',
    ),
  };

  render() {
    const { carouselContent, header } = this.props;
    return (
      <section
        ref={this.props.innerRef}
        className="container-info testimonials"
        data-aos="fade-up"
      >
        <div className="carousel-wrapper">
          <header className="header text-center">
            <Type.h1 variant={Type.heading1}>{header}</Type.h1>
          </header>
          <Slider touchDisabled>
            {carouselContent.map((testimonials, index) => (
              <div key={index}>
                <blockquote className="blockquote text-center">
                  <p className="blockquote-paragraph">
                    {testimonials.paragraph}
                  </p>
                  <footer className="blockquote-footer">
                    <cite className="blockquote-cite">
                      {testimonials.author}
                      <br />
                      {testimonials.cite}
                    </cite>
                    <img
                      src={testimonials.logo}
                      alt={i18n.t(
                        'I18N_THE_HONEY_POT_COMPANY_LOG',
                        'The Honey Pot Company Logo',
                      )}
                      className="center-block testimonial-svgs"
                    />
                  </footer>
                </blockquote>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }
}

export default Testimonials;
