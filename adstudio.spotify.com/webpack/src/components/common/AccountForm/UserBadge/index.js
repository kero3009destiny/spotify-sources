import React from 'react';
import i18n from 'i18next';
import styled, { css } from 'styled-components';

import { Icons } from '@spotify-internal/adstudio-tape';
import { gray50, gray80, spacer16 } from '@spotify-internal/encore-foundation';
import { ButtonTertiary, Type } from '@spotify-internal/encore-web';

import PropTypes from 'prop-types';

const { IconUser } = Icons;

const ellipsisSharableStyles = css`
  color: ${gray50};
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconUserElement = styled(IconUser)`
  margin-bottom: 2px;
  position: relative;
  stroke: ${gray80};
`;

const TruncateContainer = styled.div`
  display: flex;
  min-width: 200px;
`;

const Ellipses = styled.div`
  ${ellipsisSharableStyles}
`;

const Image = styled.img`
  border-radius: 50%;
  height: 36px;
  width: 36px;
`;

const Avatar = styled.div`
  align-items: center;
  align-self: center;
  background-color: #404040;
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  height: 36px;
  justify-content: center;
  margin-right: ${spacer16};
  width: 36px;
  margin-bottom: auto;
`;

const UserBadgeContent = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-flow: row wrap;
  justify-content: flex-start;
  min-width: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
`;

const CTAWrapper = styled.div`
  flex-shrink: 0;
`;

const UserInfoText = styled(Type.p)`
  ${ellipsisSharableStyles}
`;

const SubcopyText = styled(UserInfoText)`
  color: black;
  max-width: 350px;
  white-space: normal;
  width: 350px;
`;

const CTAButton = styled(ButtonTertiary)`
  padding: 0;
`;

const truncate = (email, delim) => {
  const parts = email.split(delim);
  const delimIndex = email.indexOf(delim);

  if (email.indexOf(delim) === -1) {
    return email;
  }

  return (
    <TruncateContainer>
      <Ellipses>{`${parts[0].slice(0, delimIndex)}`}</Ellipses>
      <div> {`${delim}${parts[1]}`} </div>
    </TruncateContainer>
  );
};

export default function UserBadge({
  className,
  ctaName,
  showCTA,
  email = '',
  imgSrc,
  onChange,
  truncateEmail,
  userName,
  subcopy,
}) {
  const displayImage = imgSrc ? (
    <Image alt={i18n.t('I18N_USER_AVATAR', 'User avatar')} src={imgSrc} />
  ) : (
    <IconUserElement color="gray70" iconSize={32} />
  );

  return (
    <UserBadgeContent className={className}>
      <Avatar>{displayImage}</Avatar>
      <UserInfo>
        <Type.p variant={Type.body1} weight={Type.bold} condensed>
          {userName}
        </Type.p>
        <UserInfoText variant={Type.body3} weight={Type.book} condensed>
          {truncateEmail ? truncate(email, '@') : email}
        </UserInfoText>
        {subcopy && (
          <SubcopyText variant={Type.body3} weight={Type.book} condensed>
            {subcopy}
          </SubcopyText>
        )}
      </UserInfo>
      {showCTA && (
        <CTAWrapper>
          <CTAButton
            buttonSize={ButtonTertiary.sm}
            color="green"
            onClick={onChange}
            buttonLegacy
          >
            {ctaName}
          </CTAButton>
        </CTAWrapper>
      )}
    </UserBadgeContent>
  );
}

UserBadge.defaultProps = {
  ctaName: i18n.t('I18N_ACCOUNT_MANAGEMENT_BUTTON_CHANGE_USER', 'Change'),
};

UserBadge.propTypes = {
  className: PropTypes.string,
  ctaName: PropTypes.string,
  email: PropTypes.string,
  imgSrc: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  showCTA: PropTypes.bool,
  subcopy: PropTypes.string,
  truncateEmail: PropTypes.bool,
  userName: PropTypes.string,
};
