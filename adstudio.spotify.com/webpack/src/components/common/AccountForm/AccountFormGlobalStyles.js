import { createGlobalStyle } from 'styled-components';

import { gray50, spacer4 } from '@spotify-internal/encore-foundation';

export default createGlobalStyle`
  .account-form {
    .spotify-account {
      .username {
        display: inline-block;
        font-weight: 400;
      }

      /* overriding sp-bootstrap */
      .navbar-user-img {
        box-shadow: none;
      }
    }

    .account-checkbox,
    .use-spotify-email {
      input[type="checkbox"] {
        opacity: 0;
      }

      input[type="checkbox"]:checked ~ .control-indicator {
        background-color: ${props => props.theme.colors.primaryColor};
        border-color: ${props => props.theme.colors.primaryColor};
      }

      input[type="checkbox"]:focus ~ .control-indicator {
        border-color: ${props => props.theme.colors.primaryColor};
      }
    }

    .use-spotify-email-input-label {
      user-select: none;
    }

    .email-option-checkbox {
      float: left;
    }

    .email-option-label {
      color: ${gray50};
      margin-top: ${spacer4};
      margin-left: 30px;

      a {
        color: ${props => props.theme.colors.primaryColor};
      }
    }

    .legal-panel {
      color: ${gray50};
    }
  }
`;
