import React, { useState } from "react";
import Cookie from "js-cookie";
import styled from "styled-components";
import { ExtraSmallTextStyles } from "./text";
const xIcon = require("~/static/images/icons/xWhite.svg");

const StyledCookieNoticeWrap = styled.div`
  width: 100%;
  background-color: var(--color-DODGER-BLUE);
  padding: 15px;
  z-index: 1;
  position: relative;
`;

const StyledCookieNoticeText = styled.div`
  margin: 0 auto;
  max-width: 1170px;
  display: flex;
  color: var(--color-SNOW);
  width: 100%;
  p {
    flex: 1;
    margin: 0;
    ${ExtraSmallTextStyles}
  }

  a {
    color: var(--color-SNOW);
  }
`;

const StyledCloseButton = styled.a`
  cursor: pointer;
  margin-left: 15px;
  align-self: center;
`;

interface OutsideLinkProps {
  href: string;
  children: string;
}

const OutsideLink = ({ href, children }: OutsideLinkProps) => (
  <a href={href} target="_blank" rel="noopener">
    {children}
  </a>
);

const CookieNotice = () => {
  const [accepted, setAccepted] = useState(Cookie.get("CookiesAccepted"))

  if (accepted) {
    return null;
  }

  const onClickClose = () => {
    Cookie.set("CookiesAccepted", true, { expires: 365 });
    setAccepted(true);
  };

  return (
    <StyledCookieNoticeWrap>
      <StyledCookieNoticeText>
        <p>
          We and{" "}
          <OutsideLink href="https://www.spotify.com/uk/legal/cookies-vendor-list/">
            our partners
          </OutsideLink>{" "}
          use cookies to personalize your experience, to show you ads based on
          your interests, and for measurement and analytics purposes. By using
          our website and our services, you agree to our use of cookies as
          described in our{" "}
          <OutsideLink href="https://www.spotify.com/uk/legal/cookies-policy/">
            Cookie Policy
          </OutsideLink>
          .
        </p>
        <StyledCloseButton onClick={onClickClose}>
          <img src={xIcon} alt="Accept Cookies" />
        </StyledCloseButton>
      </StyledCookieNoticeText>
    </StyledCookieNoticeWrap>
  );
};

export default CookieNotice;
