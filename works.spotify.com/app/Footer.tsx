import { AppFooter, AppFooterLink, spacer24 } from '@spotify-internal/encore-web';
import { UserEntity } from 'libs/services/s4pTypes';
import { cookiesUrl, privacyPolicyUrl, termsAndConditionsUrl } from 'libs/utils/externalUrls';
import styled from 'styled-components';

const StyleWrapper = styled.div`
  padding: ${spacer24};
`;

type FooterProps = {
  user: UserEntity;
};

const Footer = ({ user }: FooterProps) => {
  const footerLinks = [
    {
      label: 'Legal',
      href: termsAndConditionsUrl(user),
    },
    {
      label: 'Privacy',
      href: privacyPolicyUrl(user),
    },
    {
      label: 'Cookies',
      href: cookiesUrl(user),
    },
  ];

  return (
    <StyleWrapper>
      <AppFooter
        copyrightYear={2021}
        list={footerLinks.map((link) => (
          <AppFooterLink key={link.label} href={link.href} target="_blank">
            {link.label}
          </AppFooterLink>
        ))}
      />
    </StyleWrapper>
  );
};

export default Footer;
