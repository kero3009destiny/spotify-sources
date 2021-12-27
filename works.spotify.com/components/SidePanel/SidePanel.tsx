import React from 'react';
import { Body, Footer, Header } from './Layout';

type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
  footer: React.ReactNode;
};

export function SidePanel(props: Props) {
  const { header, body, footer } = props;

  return (
    <>
      <Header>{header}</Header>
      <Body>{body}</Body>
      <Footer>{footer}</Footer>
    </>
  );
}
